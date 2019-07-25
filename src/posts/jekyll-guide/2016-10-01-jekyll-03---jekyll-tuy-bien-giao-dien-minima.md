---
title: '[Jekyll] Tùy biến giao diện Minima mặc định'
date: "2016-10-01T05:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn xây dựng Jekyll blog sử dụng theme Minima mặc định
tag: ["Jekyll guide"]
textthumb: Minima Template
---
Sau khi cài đặt Jekyll, mặc định ta sẽ được sử dụng giao diện Minima - một theme cơ bản và đơn giản nhất. Để tùy biến giao diện này ta làm như sau:

## #1. Đưa Layout của theme vào Website Jekyll

Vào folder của theme minima theo đường dẫn `C:\Ruby23\lib\ruby\gems\2.3.0\gems\minima-1.2.0` (Phụ thuộc vào phiên bản và cách cài Ruby) → Copy các thư mục:

```
_includes
_layouts
_sass
```
và paste chúng vào thư mục của Website Jekyll

## #2. Nhúng CSS trực tiếp vào HTML

Mặc định khi ta mở trang `http://127.0.0.1:4000/` thì nhìn nó rất lộn xộn, do đường dẫn tới file CSS chưa đúng, khắc phục bằng cách nhúng trực tiếp CSS vào file HTML:

![Nhúng CSS trực tiếp vào HTML](https://lh5.ggpht.com/-JJOpUpkelS8/XQszZtsQLaI/AAAAAAAAV9Y/Cg0YPBt1q3Y2OqQzbSHcSt8J2wMIqhTBACKgBGAs/s1600-e30/jekyll-03-1-chiase.web.app.png)

- Mở file `thư mục cài website/_site/css/main.css` → Copy toàn bộ nội dung trong file
- Dùng phần mềm chỉnh sửa văn bản để mở file `head.html` trong thư mục `thư mục cài website/_include`, tìm và xóa:

```html
<link rel="stylesheet" href="{{ "/css/main.css" | prepend: full_base_url }}">
```

 và chèn đoạn code bên dưới lên trên thẻ `/head`:
 
```css
<style type="text/css">
Nội dung được copy từ file main.css
</style>
```

Bây giờ tải lại trang `http://127.0.0.1:4000/` ta được kết quả

![Tùy biến giao diện Minima](https://lh5.ggpht.com/-UvuRg_VE_vw/XQszZqF2tyI/AAAAAAAAV9Y/bYC7h7olrn4_RXibQPk8HNlZ-vQymEy9gCKgBGAs/s1600-e30/jekyll-03-2-chiase.web.app.png)

## #3. Cho hiển thị snippet của bài viết ra trang chủ

- Cách 1

 Chỉnh sửa file `thư mục website/index.html` tìm đoạn code:

```html
<h2>
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
</h2>
```
và chèn dưới nó:
```html
{{ post.excerpt }}
```
Mặc định đoạn văn bản đầu tiên của bài viết (post) sẽ được hiển thị ra ngoài trang chính

Nếu muốn tùy chỉnh đoạn snippet này thì chỉnh sửa file bài viết theo cấu trúc:
	
```html
---
layout: post
title:  "Tiêu đề bài viết"
date:   2016-09-30 4:20:51 +0700
permalink: /Cat1/Cat2/tieu-de-bai-viet/
excerpt_separator: <!-- excerpt -->
---
Đoạn văn bản muốn hiển thị ra ngoài trang chính <!-- excerpt --> nội dung khác của bài viết:
```

- Cách 2

 Điwn giản hơn, chỉ cần sửa file `thư mục website/index.html` tìm đoạn code:

```html
<h2>
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
</h2>
```
và chèn dưới nó:
```html
<div class="summary">{{ post.content | strip_html | truncatewords:40}}</div>
```