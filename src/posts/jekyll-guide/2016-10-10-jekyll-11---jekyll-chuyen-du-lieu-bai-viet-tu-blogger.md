---
title: '[Jekyll] Chuyển dữ liệu bài viết từ Blgoger sang Jekyll'
date: "2016-10-10T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn chuyển dữ liệu bài viết từ Blgoger sang Jekyll.
tag: ["Jekyll guide"]
postthumb: "https://lh5.ggpht.com/-viH-nqwEcjY/XQs0gAGqyNI/AAAAAAAAV-I/RDi1S_UAIE8qHG6gP9um1kfW0oFgig-ZgCKgBGAs/w150-e30/jekyll-11-chiase.web.app-0.png"
---

Sau khi tìm hiểu và thử dùng **Jekyll** mình thấy nó khá hay và phù hợp với mình, vì vậy mình quyết định chuyển dữ liệu từ Blog cũ của mình (**Blogger**) sang Blog mới, sử dụng **Jekyll**. Dưới đây là phương pháp mình áp dụng.



### Các mục cần chuẩn bị:

- Jekyll trên Windows (Mình chưa làm trực tiếp trên Github nên không rõ làm như thế nào), xem hướng dẫn cài đặt [tại đây](/jekyll-cai-dat-tren-windows/)

- Máy tính phải có kết nối Internet  


## #1. Xuất dữ liệu từ Blogger

Đăng nhập vào [Blogger](https://blogger.com) &#x276F; Chọn Blog muốn xuất dữ liệu &#x276F; **Setting** &#x276F; **other**. Sau đó chọn **Back up content**


![Chuyển dữ liệu bài viết từ Blgoger sang Jekyll](https://lh5.ggpht.com/-N557opU-pGs/XQs0gFs3_uI/AAAAAAAAV-I/dGsJ6-uchs4VvH7XPXJzj-gNltQKB7PuwCKgBGAs/s1600/jekyll-11-chiase.web.app-1.png)

File nhận được sẽ có tên giống như `blog-10-09-2016.xml`. Copy file này vào thư mục gốc của Jekyll

## #2. Cài đặt Plugin *jekyll-import*

1. Bạn nên xem thêm cách cài đặt **Plugin** [tại đây](/jekyll-cai-dat-gem-tren-windows/)

2. Cài đặt

- Mở file `gemfile` trog thư mục gốc của Blog, thêm dòng:

```
gem 'jekyll-import'
```

- Mở file `_config.yml` trong thư mục gốc của Blog, thêm dòng `- jekyll-import` vào vị trí như dưới:

```
gems:
  - jekyll-archives
  - jekyll-import
```
  
- Mở **command promp** (CMD), dùng lệnh để truy cập vào thư mục gốc của Blog. Sau đó chạy lệnh sau:

```
gem install jekyll-import
```

Tiếp tục chạy lệnh:

```
jekyll import blogger --source ./blog-10-09-2016.xml
```

Trong đó `blog-10-09-2016.xml` là tên file nhận được sau khi xuất dữ liệu từ **Blogger** (#1).

Sau khi làm các bước trên, truy cập vào thư mục `_posts` của Blog Jekyll, ta sẽ thấy tất cả các bài viết từ **Blogger** đã được chuyển vào thư mục này, những file này có đuôi mở rộng là `.html`

## 3. Kết luận

Như vậy là ta đã chuyển toàn bộ dữ liệu bài viết từ **Blogger** sang **Jekyll**. Tuy nhiên chúng ta vẫn cần phải chỉnh lại các bài viết cho phù hợp với lại cấu trúc và CSS của **jekyll**.
Bây giờ ta cũng không cần *plugin* **jekyll-import** nữa, nên bạn có thể gỡ bỏ chúng bằng cách xóa các dòng vừa thêm vào trong file `gemfile` và `_config.yml`.
Chúc các bạn thành công.
