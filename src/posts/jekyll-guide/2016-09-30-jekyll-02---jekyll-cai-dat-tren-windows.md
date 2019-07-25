---
title: '[Jekyll] Hướng dẫn cài đặt Jekyll trên Windows'
date: "2016-09-30T22:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn tạo Blog với Jekyll và Github pages
tag: ["Jekyll guide"]
textthumb: Jekyll on Windows
---

Việc cài đặt Jekyll trên PC sẽ giúp bạn dễ dàng viết bài, chỉnh sửa giao diện của Blog, bởi bạn có thể xem trước bài viết được xuất bản sẽ như thế nào một cách nhanh chóng, còn đối với những bạn muốn thay đổi hoặc chỉnh sửa giao diện cũng có thể xem trước kết quả, để hoàn thiện trước khi cập nhật cho trang Blog. Ưu điểm là mọi thao tác, xử lý trên môi trường Windows sẽ nhanh hơn rất nhiều so với môi trường web .


## Bước 1: Cài đặt Ruby và Ruby Dev Kit..

Trước hết ta cần phải cài ngôn ngữ Ruby trên Windows, truy cập vào trang [ruby](http://rubyinstaller.org/downloads/) để tải file cài đặt Ruby. Trong quá trình cài đặt thì chọn như hình bên dưới:

![Hướng dẫn cài đặt Jekyll trên local Windows](https://lh5.ggpht.com/-acKKjrhMKU4/XQLFMPRKHDI/AAAAAAAAV7U/YUVMv5biSKQL4f4wdcybei_U64-fPXQjgCKgBGAs/s1600-e30/jekyll-02-1-chiase.web.app.png)


Bạn cũng cài đặt bộ Ruby Dev kit, quay lại [trang này](http://rubyinstaller.org/downloads/), kéo xuống dưới và tải Ruby Dev kit phù hợp với hệ điều hành 32bit hoặc 64bit.

Tiếp theo, bung nén file vừa tải về vào máy tính, ví dụ như `C:/Kit/Ruby/` 

Mở CMD (Command Prompt) as administrator, sử dụng lệnh cd command để tới thưu mục bên trên, like `cd c:/` → `cd kit` → `cd ruby`

![Cài đặt Ruby Dev Kit](https://lh5.ggpht.com/-QAAfS82FjDY/XQLFMKAoTtI/AAAAAAAAV7U/gFBj9FZdpFEeIL4FqRFL_gDc8szAT7khgCKgBGAs/s1600-e30/jekyll-02-2-chiase.web.app.png)


Sau khi vào tới thư mục cài **Ruby dev kit**, chạy lệnh `ruby dk.rb init`

Như vậy cơ bản đã cài xong, đầu tiên cần phải chỉnh lại file **config** để loại bỏ các lỗi có thể xảy ra trong quá trình cài đặt.

Mở file **config.yml** trong thư mục `c:/kit/ruby` (là thư mục bạn chọn ở bước trước).

```
---
C:\Ruby23-x64
```

Bạn có thể thấy bên trên là đường dẫn `C:\Ruby23-x64`, Bởi đây là thư mục mặc định khi cài đặt Ruby, nếu bạn cài Ruby ở thư mục khác thì thay thế đường dẫn thư mục cho phù hợp.

Sau khi kiểm tra và chỉnh xong file **config.yml**, quay lại cửa sổ CMD, chạy lệnh `ruby dk.rb install`

## Bước 2: Cài đặt Jekyll gem.

Ở bước 1, ta đã cài đặt xong môi trường **ruby** trên Windows, bây giờ ta cần cài đặt **Jekyll gem** bằng cách sử dụng lệnh trên CMD:

```
gem install jekyll
```

Sau khi thực hiện lệnh trên, gems sẽ tự động được tải về và cài đặt (yêu cầu Windows phảo có kết nối Internet), nó sẽ mất khoảng vài chục giây cho tới vài phút, tùy thuộc vào tốc độ mạng.

Lưu ý nếu xảy ra lỗi:

```
ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://api.rubygems.org/specs.4.8.gz)
```

Thì lần lượt chạy lệnh sau: `gem sources -r https://rubygems.org/` → `gem sources -a http://rubygems.org/` rồi chọn `y`

Bây giờ mọi thứ đã sẵn sàng để cài website **Jekyll**.

## Bước 3: Tạo website Jekyll mới.

Bây giờ bạn hãy lựa chọn thư mục trên Windows để chứa website Jekyll, ví dụ như `d:/jekyll/blog`. Ta có thể tạo trước những thư mục này hoặc sử dụng lệnh trong CMD để tạo thư mục. 

Dùng lệnh để tới thư mục đó: `cd c:/` → `cd jekyll` → `cd blog`. Tiếp theo ta dùng lệnh:

```
jekyll new .
```

Ở đây ta sử dụng dấu `.` để kết thúc lệnh, bởi vì ta muốn cài website **Jekyll** vào trực tiếp thư mục đó, nhưng nếu bạn dùng lệnh `jekyll new blog`, khi đó Jekyll sẽ được cài vào thư mục con `c:/jekyll/blog/blog/`.

Bạn sẽ nhận được tin nhắn thành công dạng như `New jekyll site installed in c:/jekyll/Blog`.

![Hướng dẫn cài đặt Jekyll trên local Windows](https://lh5.ggpht.com/-otWPUqSE49I/XQLFMKDdEwI/AAAAAAAAV7U/RdKFEBkmHyQwnuv2MFTOzvv3i1RmjIKMwCKgBGAs/s1600/jekyll-02-3-chiase.web.app.png)

Bây giờ, nếu bạn mở thư mục c:/jekyll/Blog, bạn sẽ thấy có rất nhiều thư mục và file được tự động tạo ra.

## Bước 4: Kiểm tra hoạt động website Jekyll trên localhost

Để kiểm tra hoạt động của website Jekyll, trong CMD ta chạy lệnh:

```
Jekyll serve --watch
```

Bạn có thể nhìn hình minh họa ở bước 3, bây giờ bạn chỉ cần sử dụng trình duyệt để truy cập vào địa chỉ `127.0.0.1:4000`. Kết quả:

![Hướng dẫn cài đặt Jekyll trên local Windows](https://lh5.ggpht.com/-K_hK75J6GNc/XQLFMM43_VI/AAAAAAAAV7U/uwBoiQMTROg1tXAt5iOF3SFtu7fmkdjuQCKgBGAs/s1600/jekyll-02-4-chiase.web.app.png)

Khi ta chạy lệnh `jekyll serve --watch`, thư mục **_site** sẽ được tạo ra trong thư mục chứa website **Jekyll**, và thư mục đó chính là website của bạn.

-Nếu khi chạy lệnh này gặp lỗi: 

```
Error reading file C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/minima-1.2.0/_layouts/default...
```

Thì hãy copy thu mục `_includes` và `_layouts` theo đường dẫn `C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/minima-1.2.0/` >> rồi chạy lại lệnh `jekyll serve --watch`

Sau khi thực hiện các bước trên ta đã có một website Jekyll để chạy trên localhost. Nếu bạn muốn tạo thêm một website mới thì không cần phải thực hiện tất cả các bước trên mà chỉ cần thực hiện từ bước 3, Còn nếu bạn muốn đưa website lên internet, bạn phải deploy nó lên server. Bạn có thể sử dụng Github page hoặc Google Firebase để làm nơi lưu trữ website (miễn phí).

Việc đầu tiên cần làm sau khi cài **Jekyll** là chỉnh sửa file `_config.yml` trong thư mục cài **Jekyll** cho phù hợp với bạn

```
title: Your awesome title
email: your-email@domain.com
description: > # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml. It will appear in your document head meta (for
  Google search results) and in your feed.xml site description.
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://example.com" # the base hostname & protocol for your site
twitter_username: jekyllrb
github_username:  jekyll

# Build settings
markdown: kramdown
theme: minima
```

Lưu ý là sau khi chỉnh xong file `_config.yml` thì phải restart lại server Jekyll thì mới thấy được sự thay đổi (Quay lại cửa sổ CMD, sử dụng phím Ctrl+C để dừng local server, sau đó chạy lại lệnh `jekyll serve --watch`)
