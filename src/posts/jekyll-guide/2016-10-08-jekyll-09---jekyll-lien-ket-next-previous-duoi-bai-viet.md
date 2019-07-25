---
title: '[Jekyll] Tạo phân trang bài viết cũ hơn, mới hơn trong trang bài viết'
date: "2016-10-08T05:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn tạo liên kết bài viết cũ hơn, mới hơn ở cuối mỗi bài viết.
tag: ["Jekyll guide"]
postthumb: "https://lh5.ggpht.com/-Rd5km8mRdRM/XQs0gODd3zI/AAAAAAAAV-I/53IFGGvvml0nNEVCBmGPb_caJ8g_KbiewCKgBGAs/w150-e30/jekyll-09-chiase.web.app-0.png"
---

Việc thêm nút điều hướng **bài viết mới hơn** và **bài viết cũ hơn** ở cuối bài viết sẽ giúp độc giả dễ dàng tiếp cận với các bài viết khác trong blog.

![Tạo phân trang bài viết cũ hơn, mới hơn trong trang bài viết Jekyll](https://lh5.ggpht.com/-6Vd0-Pr4dXQ/XQs0gEmeHhI/AAAAAAAAV-I/9Gdyrg6kfuU-vVBn8x9qWR-vlr54iT4cgCKgBGAs/s1600-e30/jekyll-09-chiase.web.app.png)



Để thêm nút này, mở file `post.html` trog thư mục `_layout`, tìm đoạn code tương tự như:

```html
<div class="post-content" itemprop="articleBody">
    {{ content }}
</div>
```

Sau đó thêm bên dưới nó đoạn code:

```html
	 <ul class="pager blog-pager">
        {% if page.previous.url %}
        <li class="previous">
          <a href="{{ page.previous.url | prepend: site.baseurl | replace: '//', '/' }}" data-toggle="tooltip" data-placement="top" title="{{page.previous.title}}">&larr; Previous Post</a>
        </li>
        {% endif %}
        {% if page.next.url %}
        <li class="next">
          <a href="{{ page.next.url | prepend: site.baseurl | replace: '//', '/' }}" data-toggle="tooltip" data-placement="top" title="{{page.next.title}}">Next Post &rarr;</a>
        </li>
        {% endif %}
      </ul>
```

Lưu file này lại, mở một bài viết bất kỳ để xem kết quả.

Để trang trí cho các nút điều hướng này, sử dụng CSS:

```css
ul.blog-pager {margin-left: 0;}.blog-pager li {list-style: none;}li.previous {float: left;}li.next {float: right;}.pager li a{text-transform:uppercase;font-size:14px;font-weight:bold;letter-spacing:1px;padding:10px 5px;background:#FFF;border: 1px solid #ddd;border-radius:0;color:#404040;}.pager li a:hover,.pager li a:focus{color:#FFF;text-decoration:none;background:#0085a1;border:1px solid #0085a1;}
```