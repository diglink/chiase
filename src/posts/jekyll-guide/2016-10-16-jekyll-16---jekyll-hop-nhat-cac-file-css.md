---
title: '[Jekyll] Hợp nhất các file CSS khi thiết kế'
date: "2016-10-16T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn kết hợp nhiều file CSS thành một trong Jekyll để giảm số phần tử cần request.
tag: ["Jekyll guide"]
textthumb: CSS Combination
---


Trong thiết kế, chỉnh sửa giao diện cho Blog, để cho các trang hiển thị khác nhau ta thường thay đổi một chút CSS, ví dụ như ở trang chủ ta dùng:
```html
<style type='text/css'>
CSS dùng chung
</style>
<style type='text/css'>
CSS chỉ dùng cho trang chủ
</style> 
```
còn trang bài viết;
```html
<style type='text/css'>
CSS dùng chung
</style>
<style type='text/css'>
CSS chỉ dùng cho trang bài viết
</style> 
```

Như vậy trong giao diện sẽ có nhiều thẻ `<style type='text/css'>...</style>`, và có nhiều đoạn css lặp lại trong template rất rối mắt, đặc biệt là không đáp ứng được yêu cầu khi thiết kết template tương thích AMP

Để giải quyết vấn đề này, thực hiện theo các bước sau:

### 1. Tạo các file css riêng biệt

Trong thư mục `_includes` tạo các file:
- `_main.scss`: chứa css dùng chung
- `_home.scss`: chứa css dùng cho trang chủ
- `_page.scss`: chúa css dùng cho trang bài viết
Có thể tạo thêm nhiều file `*.scss` nếu bạn có nhiều trang hiển thị khác nhau.
### 2. Thêm vào template

Thêm đoạn code bên dưới vào phía trên thẻ `</head>` của file `_includes/head.html`:
```yml
{% if page.layout != 'home' %}
	 <style type="text/css">
		  /*<![CDATA[*/
		  {% capture custom_css %}
		    {% include _main.scss %}
			{% include _page.scss %}
		  {% endcapture %}
		  {{ custom_css | scssify }}
		  /*]]>*/
	  </style>
{% else %}
	  <style type="text/css">
		 /*<![CDATA[*/
		  {% capture custom_css %}
		    {% include _main.scss %}
			{% include _home.scss %}
		  {% endcapture %}
		  {{ custom_css | scssify }}
		/*]]>*/
   	</style>
{% endif %} 
```
