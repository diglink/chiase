---
title: '[Jekyll] Hướng dẫn thêm breadcrumbs vào Blog'
date: "2016-10-15T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn Thêm thanh điều hướng breadcrumbs để người đọc truy cập nhanh.
tag: ["Jekyll guide"]
postthumb: "https://lh5.ggpht.com/-LWSCKUXgrXk/XQs0gI-sftI/AAAAAAAAV-I/VRe_NjMQf6ATgKF8TCCIZm5O5UGtin7zQCKgBGAs/w150-e30/jekyll-15-chiase.web.app-0.png"
---


Mặc định Jekyll không được cài đặt sẵn breadcrumb, để thêm vào Blog bạn làm theo hướng dẫn bên dưới


### Thêm file `breadcrumbs.html`

Trong thư mục `_includes`, tạo file mới tên `breadcumbs.html` với nội dung:

```html
<div class="breadcrumbs"> 
<div class="breadcrumbs-home"> <a href="{{ "/" | relative_url}}" title="Home">Home</a><span class="arrow"></span></div>{% if page.categories %}<div> <a href="{{ "/" | relative_url}}{{ page.categories  | first | strip }}" title="{{ page.categories  | first | strip }}">{{ page.categories  | first | strip | capitalize }}</a><span class="arrow"></span></div>{% endif %}{% if page.categories[1] %}<div> <a href="{{ "/" | relative_url}}{{ page.categories[1] }}" title="{{ page.categories[1] }}">{{ page.categories[1] | capitalize }}</a><span class="arrow"></span></div>{% endif %}{% if page.categories[2] %}<div> <a href="{{ "/" | relative_url}}{{ page.categories[2] }}" title="{{ page.categories[2] }}">{{ page.categories[2] | capitalize }}</a><span class="arrow"></span></div>{% endif %}
</div>		
```
Chú ý: Breadcrumbs này sẽ lấy các chuyên mục **categories** trong phần khai báo *front matter* của bài viết, ví dụ:

```yml
---
categories: [jekyll, cat1, cat2, cat3]
...
---
```
Khi đó Breadcrumbs có dạng `Home/ Jekyll/ Cat1/ Cat2/ Cat3`, bạn cũng có thể sắp xếp lại theo thứ tự bằng cách thay đổi trật tự các chuyên mục trong `categories`
### Chỉnh sửa layout bài viết

Trong thư mục `_layouts`, chỉnh sửa file `post.html` (là file hiển thị bố cục bài viết), tìm dòng code tương tự: 
```html
<article class="post" itemscope itemtype="https://schema.org/BlogPosting">
```
Chèn đoạn code sau bên ngay bên dưới:
```yml
{% include breadcrumbs.html %}
```
Lưu lại file, lưu ý là bạn có thể thay đổi vị trí đặt breadcrumbs (là vị trí đặt dòng code bên trên) cho phù hợp

### Thêm CSS

Để trang trí cho đẹp thì bạn thêm CSS sau vào file `.css` của Jekyll blog
```css
.breadcrumbs{margin-bottom:15px}
.breadcrumbs>div{padding:6px 20px;background:#FFF;position:relative;display:inline-block;border:1px solid #EBEBEB;font-size:15px;color:#3E3E3E}
.breadcrumbs-home{background:#f1f1f1}
.breadcrumbs .arrow:before{content:"";right:-10px;position:absolute;top:-1px;right:-13px;width:0;height:0;border-style:solid;border-width:18px 0 17px 13px;border-color:transparent transparent transparent #fff;z-index:100}
.breadcrumbs .arrow:after{content:"";position:absolute;top:-1px;right:-14px;width:0;height:0;border-style:solid;border-width:18px 0 17px 13px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #eee;z-index:10}
.breadcrumbs> div:nth-child(1){background:#f1f1f1}
.breadcrumbs> div:nth-child(1) .arrow:before{border-left-color:#f1f1f1}
@media screen and (max-width:600px){.breadcrumbs{display:none}}
```

Cuối cùng là xem kết quả
