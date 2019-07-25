---
title: '[Jekyll] Thêm ảnh thumbnail cho bài viết'
date: "2016-10-03T05:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn thêm ảnh thumbnail cho bài viết ngoài trang chủ
tag: ["Jekyll guide"]
textthumb: Thumbnail
---

Với theme Minima mặc định, trên trang chủ chỉ cho hiển thị danh sách và ngày xuất bản bài viết, nếu bạn muốn thêm ảnh thumbnail cho mỗi bài viết để Blog ấn tượng hơn thì làm theo hướng dẫn bên dưới:


### #1. Đưa ảnh thumbnail vào bài viết

Trong phần khai báo của bài viết, cần thêm ảnh thumbnail

```html
---
layout: post
title:  "Thêm ảnh thumbnail cho bài viết Jekyll"
date:   2016-10-03 4:00:00 +0700
permalink: /Jekyll/Layout/them-anh-thumbnail-bai-viet-jekyll/
thumbnail: image-name.jpg
---
```

### #2. Chỉnh sửa file index

Trong thư mục chinh của webite, cần chỉnh sửa file **_index.html_**, thêm đoạn code bên dưới vào vị trí phù hợp :

```html
{% if post.thumbnail %}
	<img  alt="{{ post.title | escape }}" title="{{ post.title | escape }}" src="{{ site.baseurl }}/image-folder/{{ post.thumbnail }}" width="200">
{% endif %}
```

Ví dụ như:

```html
<ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a>
        </h2>
	{% if post.thumbnail %}
	<img  alt="{{ post.title | escape }}" title="{{ post.title | escape }}" src="{{ site.baseurl }}/image-folder/{{ post.thumbnail }}" width="200">
	{% endif %}
	  </li>
    {% endfor %}
</ul>
```

#### Lưu ý: 
* Nếu ở phần khai báo `thumbnail` là tên ảnh, thì thay `image-folder` bằng tên thư mục chứa ảnh. Nếu khai báo `thumbnail` là địa chỉ ảnh (ví dụ *https:.../image.png*) thì xóa bỏ `/image-folder/` ở đoạn code trên

* Thay đổi chiều rộng ảnh: thay thế giá trị `200` ở `width="200"`

### #3. Hiển thị ảnh thumbnail mặc định khi bài viết không có ảnh

Nếu muốn hiển thị ảnh mặc định khi bài viết không có ảnh, ở bước **#2** sử dụng code:

```html
{% if post.thumbnail %}
	<img  alt="{{ post.title | escape }}" title="{{ post.title | escape }}" src="{{ site.baseurl }}{{ post.thumbnail }}" width="200">
	{% else %}
	<img  alt="{{ post.title | escape }}" title="{{ post.title | escape }}" src="/image/nothumbnail.png" width="200">
{% endif %} 
```

Thay `/image/nothumbnail.png` bằng địa chỉ của ảnh