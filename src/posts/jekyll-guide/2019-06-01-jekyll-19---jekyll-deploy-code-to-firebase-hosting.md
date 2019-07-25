---
title: '[Jekyll] Sử dụng Firebase hosting để lưu trữ code'
date: "2019-06-01T05:46:37.121Z"
update: "2019-06-02T05:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn trình bày Liquid code khi viết bài
tag: ["Jekyll guide", "deploy"]
postthumb: https://lh5.ggpht.com/-AORDn9OxxUg/XQw_qsNRLgI/AAAAAAAAV_w/U2aTatvQNOk7SDoK1Qm-4LHXBcv5ODdNgCKgBGAs/w120-e30/jekyll-19-0-chiase.web.app.jpg
seoimage: https://lh5.ggpht.com/-AORDn9OxxUg/XQw_qsNRLgI/AAAAAAAAV_w/U2aTatvQNOk7SDoK1Qm-4LHXBcv5ODdNgCKgBGAs/w300-e30/jekyll-19-0-chiase.web.app.jpg

---

## #1. Tạo tài khoản miễn phí trên `Google Firebase`

Để sử dụng **Firebase Hosting** để lưu trữ code, thực hiện theo các bước: 
- Truy cập [https://firebase.google.com](https://firebase.google.com) và sử dụng tài khoản **Google** để đăng nhập.
- Click vào **Go To Console** ở góc trên bên phải của trang, hoặc truy cập console qau [https://console.firebase.google.com](https://console.firebase.google.com).
- Click **Add project** (hoặc **New project** nếu đây là **project** đầu tiên của bạn).

![Create Firebase project][1]

- Đặt tên project → click **Create project**.

![Create Firebase project][2]

## #2. Cài Node.js

Để cài Node.js, bạn cần vào trang download của Node.js. Có 2 tuỳ chọn là:

- **LTS (Recommended For Most Users)**: đây là bản Long Term Support, nó ổn định và được khuyên dùng
- **Current (Lastest Features)**: bản mới nhất hiện tại (thường sẽ có nhiều issues, chưa ổn định)

Bạn có thể chọn bản tuỳ thích, còn theo mình thì bạn nên chọn bản LTS.

Tiếp theo, chọn tải bản 32-bit hoặc 64-bit phù hợp với hệ điều hành đang sử dụng.

Ngoài ra có 2 lựa chọn là tải bản Windows Installer (.msi) hoặc Windows Binary (.zip). Trong đó:

- **Windows Installer (.msi)**: bạn chỉ việc chọn và Next, chọn và Next,…
- **Windows Binary (.zip)**: bạn phải cài đặt biến môi trường để dùng Node.js một cách thủ công

Sau khi tải về, tiến hành cài đặt **Node.js**

## #3. Cài đặt Firebase

- Mở **Node.js command promt**, sử dụng lệnh `cd` để chuyển tới thư mục chứa **Jekyll site**, ví dụ `cd c:\blog`.
Sau  đó chạy lệnh:
```
npm install -g firebase-tools
```
```
npm install -D firebase-tools
```

- Đăng nhập Firebase để kết nối CLI tới tài khoản Firebase online:
```
firebase login
```
```
firebase init
```

- Lựa chọn **Hosting**:

![Firebase hosting][3]

Nếu quá trình này xảy ra lỗi thì chạy lệnh `firebase init hosting`.

- Chọn các mục tiếp theo như hình:

![Firebase hosting][4]

- Sau khi cài đặt xong, **Firebase CLI** tạo thành 2 file: `.firebaserc` và `firebase.json`.

- Trường hợp Firebase CLI không load project, ta có thể thêm thủ công project ID  trong file `.firebaserc`:
```
{
  "projects": {
    "default": "chiase-project-id"
  }
}
```

- Mở file `firebase.json`, thay đổi nội dung:
```
{
  "hosting": {
    "public": "_site",
    "ignore": [
      "firebase.json",
      "Gemfile",
      "Gemfile.lock",
      "Rakefile",
      "CNAME",
      "README.md",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [{
      "source" : "**",
      "headers" : [{
        "key" : "Cache-Control",
        "value" : "max-age=31536000"
      }]
    }]
  }
}
```
Như vậy toàn bộ các file và folder được **Jekyll** tạo ra trong folder `_site` sẽ được deploy lên Firebase hosting.

- Chúng ta có thể xem trước website được tạo ra sẽ như thế nào bằng lệnh:
```
jekyll serve --w
```
```
firebase serve
```

Website được tạo có địa chỉ [http://localhost:5000](http://localhost:5000).

## 4. Deploy Jekyll site lên Firebase hosting

### 4.1 Deploy thủ công
- Chạy lệnh bên dưới để Jekyll generate các file tĩnh trong thư mục `_site`:
```
jekyll serve --w
```

- Đẩy lên Firebase hosting:
```
Firebase deploy
```
Nếu không có lỗi, Firebase đưa ra địa chỉ site đã được depoly.

![Firebase deploy][5]

Lưu ý là folder `.firebase` sẽ được Firebase tạo ra để lưu trữ cache của nó. Nếu bạn không muốn folder này được upload lên Github repository, hãy thêm tên folder vào nội dung của file `.gitignore` để Git bỏ qua folder này:

```
_site
.sass-cache
.firebase
```

### 4.2 Deploy tự động với `CircleCI`

#### 4.2.1 Tạo file config cho CircleCI

Sau khi upload project của bạn lên Github, hãy tạo một file `.circleci/config.yml` có nội dung:

```
# Javascript Node CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-javascript/ for more details
#
version: 2
jobs:
  build:
    docker:
      # specify the version you desire here
      - image: starefossen/ruby-node:2-8
      
      # Specify service dependencies here if necessary
      # CircleCI maintains a library of pre-built images
      # documented at https://circleci.com/docs/2.0/circleci-images/
      # - image: circleci/mongo:3.4.4

    working_directory: ~/hotlink

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
          - v2-dependencies-{{ checksum "Gemfile.lock" }}
          # fallback to using the latest cache if no exact match is found
          - v2-dependencies-

      - run:
          name: Ruby dependencies
          command: bundle install

      - run:
          name: Node dependencies
          command: npm install -g firebase-tools@4.1.0 --unsafe-perm

      - save_cache:
          paths:
            - /usr/local/bundle
            - /usr/local/lib/node_modules
          key: v2-dependencies-{{ checksum "Gemfile.lock" }}

      - run:
          name: Build
          command: bundle exec jekyll build --verbose
      
      # - run:
      #    name: Test
      #   command: bundle exec htmlproofer ./_site --check-html --disable-external
      
      - run:
          name: Deploy
          command: firebase deploy --token=$FIREBASE_TOKEN --non-interactive
```

#### 4.2.2 Tích hợp CircleCI và GitHub

- Tạo account trên [CircleCI](https://circleci.com/).

- Sau khi đăng nhập, đảm bảo account của bạn được chọn trên góc trên bên trái.

![CircleCI][6]

- Click `Add Projects` ở sidebar trái.

- Ở trang tiếp theo, chọn GitHub repository và click `Set Up Project`.

![CircleCI][7]

- Một danh sách các bước cần thiết để build một project hiện ra, chắc chắn rằng CircleCI config file (`_config.yml`) đã được thêm vào repo, sau đó click `Start Building`.

![CircleCI][8]

- **CircleCI** bắt đầu chạy, nhưng khi chạy đến bước **Firebase deploy** thì sẽ báo lỗi:

![CircleCI][9]

Nguôn nhân là do mình chưa cung cấp `Firebase deploy token` cho CircleCI

#### 4.2.3 Lấy Firebase login token 

Bước này ta cần lấy Firebase token để cho phép CircleCI truy cập vào tài khoản, và deploy lên Firebase hosting.
Ở cửa sổ **Node.js command promt** chạy lệnh:
```
firebase login:ci
```

Trình duyệt web sẽ xuất hiện một trang yêu cầu bạn cấp phép để truy cập vào tài khoản Firebase. Sau khi được cấp phép, một token được tạo ra, hãy copy token này:

![CircleCI][10]

#### 4.2.4 Nhập Firebase Token vào CircleCI

- Quay trở lại trang [CircleCI](https://circleci.com/), vào phần cài đặt project (biểu tượng hình bánh răng).
Click chọn **Environment Variables** → **Add Variable**
Ở hộp thoại hiện lên, nhập *FIREBASE_TOKEN* vào ô **name**, và nhập Firebase token vừa lấy được ở bước trước vào ô **value**, cuối cùng click **Add Variable**.

![CircleCI][11]

- Click **Rerun Workflow** ở góc trên bên trái để bắt đầu build

![CircleCI][12]

- Kết thúc quá trình deploy site lên Firebase:

![CircleCI][13]

[1]: https://lh5.ggpht.com/-BxpXOe-ZLOg/XQwV9WXd0VI/AAAAAAAAV_Q/enXHHUZgTNoVSDZj7NjVd3LOLjhTbmbFQCKgBGAs/s1600-e30/jekyll-19-1-chiase.web.app.png
[2]: https://lh5.ggpht.com/-lqYY3ATSnPA/XQwV9bB1qbI/AAAAAAAAV_Q/Ja5UroOjVvANewLUSWM3Z8nC5M0d7UoLACKgBGAs/s1600-e30/jekyll-19-2-chiase.web.app.png
[3]: https://lh5.ggpht.com/-AwSpRLZ1s9s/XQwV9f-j8CI/AAAAAAAAV_Q/Zvt7VcTXuZo1EpNXpDuFAMR2RwMBem0JwCKgBGAs/s1600-e30/jekyll-19-3-chiase.web.app.png
[4]: https://lh5.ggpht.com/-tQMJUD0VVzg/XQwV9bAZ3rI/AAAAAAAAV_Q/MM0XwWi6tck7GtqMi5nbQOA6D2cb3GD-gCKgBGAs/s1600-e30/jekyll-19-4-chiase.web.app.png
[5]: https://lh5.ggpht.com/-Y2SHd5KhC8I/XQwV9cQtYmI/AAAAAAAAV_Q/LpoJpGpZ8SMNsn5T-G-0LmHLFnAv3hfzQCKgBGAs/s1600-e30/jekyll-19-5-chiase.web.app.png
[6]: https://lh5.ggpht.com/-oY6KfKFeoGw/XQwV9bONlRI/AAAAAAAAV_Q/plfCi9XyJycoma43EP6xNcdqJYuPM0NuACKgBGAs/s1600-e30/jekyll-19-6-chiase.web.app.png
[7]: https://lh5.ggpht.com/-yIET8PrNhXU/XQwV9asF9DI/AAAAAAAAV_Q/c7WpoF6oaT8-1VkfkNA9fay81I5iOEjiwCKgBGAs/s1600-e30/jekyll-19-7-chiase.web.app.png
[8]: https://lh5.ggpht.com/-NHzzMANtwTE/XQwV9SPbtRI/AAAAAAAAV_Q/_PVAC-EtJ2kG-LUU38GWZQXgMr8NWW5OwCKgBGAs/s1600-e30/jekyll-19-8-chiase.web.app.png
[9]: https://lh5.ggpht.com/-JhVQlmtqTCw/XQwV9eg9mtI/AAAAAAAAV_Q/p5CFr2ZQeesuaGR7q8gzAW--NX7GAii8gCKgBGAs/s1600-e30/jekyll-19-9-chiase.web.app.png
[10]: https://lh5.ggpht.com/-t6J_i-qMpMo/XQwV9R9D5TI/AAAAAAAAV_Q/egzYrHH5qjYqAzAbuLKgdOe55vH2WN8RACKgBGAs/s1600-e30/jekyll-19-10-chiase.web.app.png
[11]: https://lh5.ggpht.com/-SER-gBL7LZg/XQwV9SBDx6I/AAAAAAAAV_Q/I-iRmXkgAfw_oU2pQSxOgoNy0MHz2KYgwCKgBGAs/s1600-e30/jekyll-19-11-chiase.web.app.png
[12]: https://lh5.ggpht.com/-eZF1oiH5YHk/XQwV9c8VX4I/AAAAAAAAV_Q/CTA1Z1j-clwZ4W9Cuu3Ort6cZFNFhuu7wCKgBGAs/s1600-e30/jekyll-19-12-chiase.web.app.png
[13]: https://lh5.ggpht.com/-cY4PcUhbmRI/XQwV9W2ZzPI/AAAAAAAAV_Q/t3ilGyWRkb4rQ1-hWtKGN4rEklFEoAVVQCKgBGAs/s1600-e30/jekyll-19-13-chiase.web.app.png
