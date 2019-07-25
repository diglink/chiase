---
title: '[Jekyll] Tạo Blog với Jekyll và Github pages'
date: "2016-09-30T21:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn tạo Blog với Jekyll và Github pages
tag: ["Jekyll guide"]
postthumb: https://lh5.ggpht.com/-_3axj0KqqVk/XQHxWp4TmQI/AAAAAAAAV5k/Wa2xmLzyxRYS5YUi9vvUjZu1-q-MF7mNwCKgBGAs/w90-e30/jekyll.chiase.web.app.png
textthumb: Jekyll
---

Có rất nhiều phương pháp để tạo một Blog hay website, như sử dụng các nền tảng nổi tiếng: [Blogger](https://blogger.com/ "Blogger"), [Wordpress](https://wordpress.org/ "Wordpress")... Mỗi một nền tảng đều có ưu, nhược điểm riêng, và việc lựa chọn phụ thuộc vào mục đích cũng như sở thích của mỗi người. Bài viết này sẽ giới thiệu thêm một phương pháp để tạo Blog - website bằng cách sử dụng **Jekyll** 


## 1. `Jekyll` là gì

Jekyll là công cụ dùng để tạo các trang tĩnh (HTML, Javascript & CSS) từ các file được viết theo ngôn ngữ đánh dấu (`markup`). Có nhiều loại `markup` như HTML, Creole, BBCode, Markdown, Textile... Trong đó `HTML` chính là 1 markup phổ biến nhất. Tùy từng trường hợp mà chúng ta sử dụng cái nào cho phù hợp. Do Github sử dụng `Markdown`, nên chúng ta sẽ sử dụng **Markdown** cho các bài viết trên blog của mình.  
Ngoài ra, Jekyll cũng là 1 công cụ gọi là blog aware, tức là chỉ cần làm theo cấu trúc của 1 trang blog (tuân theo các quy tắc đặt tiêu đề, thời gian & thư mục) là Jekyll sẽ tự động tạo ra các bài blog theo thứ tự thời gian cho chúng ta.

## 2. Tính năng của `jekyll`

### 2.1 Tạo các trang web tĩnh

Với **Jekyll**, tất cả các trang, bài viết của bạn sẽ được xuất ra dưới dạng trang tĩnh HTML, nên không kén chọn web-host để lưu trữ, có thể sử dụng github để lưu trữ trang web, không giống như hệ thống quản trị nội dung (CMS) cần phải có host hỗ trợ thì mới sử dụng được.

### 2.2 Đơn giản và Tốc độ

Blog tạo ra bằng Jekyll là trang web tĩnh, không cần đến CSDL, không cần thi hành các truy vấn (query) trên CSDL trước khi xuất ra trang web, không cần đến engine xử lý ngôn ngữ lập trình như PHP, Java, .NET,... nên trang web nhẹ, tốc độ rất nhanh, dễ dàng chỉnh sửa, cập nhật.


### 2.3 Tùy chỉnh địa chỉ cố định (permalink) cho trang hoặc bài viết

**Jekyll** cho phép bạn sử dụng rất nhiều kiểu permalink khác nhau, và tính tùy biến cực cao, ví dụ như trong bài viết bạn sử dụng:

    Permalink: test1/test2/test3/custom-title-of-post/ 

thì địa chỉ url bài viết sẽ là:

    example.com/test1/test2/test3/custom-title-of-post/

Bạn có thể sử dụng nhiều kiểu permalink cho các bài viết khác nhau, ví dụ:

```
Permalink: test1/test2/test3/tiêu-đề-bài-viết    // bài viết số 1
```

```
Permalink: 2016/09/tiêu-đề-bài-viết           // bài viết số 2
```

```
Permalink: thư-mục-chính/thư-mục-con/tiêu-đề-bài-viết    // bài viết số 3
```

Bạn cũng có thể thay đổi địa chỉ liên kết cho các bài viết đã xuất bản, thật sự là rất linh hoạt.

### 2.4 Tùy chỉnh bố cục (layout) cho các trang khác nhau

Với **Jekyll**, bạn có thể tạo ra rất nhiều kiểu trang như trang chủ, trang bài viết, trang lưu trữ, trang thư mục... Và bạn có thể sắp xếp bố cục (layout) của các trang này khác nhau sao cho phù hợp với mục đích sử dụng của bạn

    Layout: Post              // bố cục (layout) cho bài viết
    Layout: Page              // bố cục (layout) cho trang kiểu như About
    Layout: Archive           // bố cục (layout) cho trang lưu trữ
    Layout: NoAds             // bố cục (layout) cho trang không chèn quảng cáo
    Layout: Blogger           // bố cục (layout) cho bài viết thuộc thư mục Blogger
    ...

### 2.5 Các tính năng khác

Ngoài ra **Jekyll** còn được một đội ngũ lập trình viên có trình độ rất cao phát triển, và sẵn sàng giúp đỡ, ghi nhận các phản hồi từ người sử dụng để nâng cấp tính năng. Máy chủ của nó cũng đồng thời là máy chủ của GitHub Pages, nơi bạn có thể lưu trữ các trang dự án hay blog ngay tại GitHub. Bạn cũng dễ dàng sao lưu trang web **Jekyll** của mình xuống máy tính hoặc để thay đổi hosting

## 3. Github-Pages

**Github pages** là một host miễn phí cho Jekyll. Với **Github pages**, trang web của bạn được sử dụng Github CDN (Content Delivery Network). Với hệ thống các máy chủ được đặt tại nhiều nơi trên thế giới của Github sẽ giúp tối ưu tốc độ website của bạn.

## 4. Tạo Blog với Jekyll và Github pages

### 4.1 Đăng ký tài khoản Github

Nếu chưa có tài khoản **Github** thì truy cập vào [https://github.com](https://github.com "github") để đăng ký tài khoản.

### 4.2 Tạo mới repo

Sau khi đăng nhập vào [https://github.com](https://github.com "github"), tạo mới một **repo** (repository - đại loại là một kho/ thư mục trên Github để bạn chứa dữ liệu), click vào dấu "+" ở góc trên bên phải > **New repository**

<img src="https://lh5.ggpht.com/-JM94lTQ4G_c/XOxVqe4XYNI/AAAAAAAAV0Y/zH4eCLoH5uAvQNbvXJvXZFKu8pSbdQnngCKgBGAs/s1600-e30/00-jekyll-github-01-chiase.web.app.png" data-original-width="615" data-original-height="282" />

Đặt tên cho **repo** theo mẫu `usernam.github.io`, username chính là tên tài khoản **Github** > **Create repository**

<img src="https://lh5.ggpht.com/-z54uq7Lqjks/XOxVqcIxsnI/AAAAAAAAV0Y/TehgZ8kYSNQmyuRkY36tYQdPREf8SYheACKgBGAs/s1600-e30/00-jekyll-github-02-chiase.web.app.png" data-original-width="747" data-original-height="546" />

### 4.3 Lựa chọn giao diện (theme)

Vào các trang **jekyll theme** như [jekyllthemes.io](https://jekyllthemes.io/ "jekyllthemes.io"), [jekyllthemes.org](http://jekyllthemes.org/ "jekyllthemes.org")... Lựa chọn và tải về theme ưng ý

Giải nén file vừa tải về, sau đó upload tất cả các file, folder đó lên **repo** của bạn bằng cách chọn tất cả các file, folder rồi kéo > thả vào **repo** đó 

Bây giờ bạn thử truy cập vào trang `usernam.github.io` xem kết quả.

### 4.4 Tùy chỉnh và viết bài

1\. Việc đầu tiên bạn nên làm sau khi cài **jekyll** là chỉnh sửa lại file `_config.yml` cho phù hợp 

2\. Viết bài mới

Bạn vào thư mục `_posts`, tạo một file mới có đuôi `*.md`, và viết bài theo markup **Markdown**, tham khảo thêm ở [markdown cheatsheet]( https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet "markdown cheatsheet")

Cấu trúc một bài viết thường như sau:

```
---
layout: post
title:  "Tên bài viết"
date:   2016-09-30 3:0:0              # Thời gian tạo bài viết
permalink: /tao-blog-jekyll/    # Liên kết của bài viết, xem phần đầu của bài viết
categories: [jekyll]                  # Chuyên mục của bài viết
tags: [jekyll tuts]                   # Thẻ liên quan tới bài viết
---
Nội dung bài viết...
```

## 5. Kết luận

Đây là bài viết đầu tiên trong serie bài viết về **Jekyll**, Chúc các bạn có một Blog ưng ý