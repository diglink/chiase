---
title: '[Jekyll] Hướng dẫn thêm cột sidebar cho blog'
date: "2016-10-13T08:46:37.121Z"
category: ["Jekyll"]
description: Chỉnh sửa layout của Blog để hiển thị thêm cột sidebar.
tag: ["Jekyll guide"]
textthumb: Jekyll Sidebar
---

Theme Jekyll mặc định chỉ có một cột, bài viết này sẽ hướng dẫn cách tạo thêm cột sidebar cho Blog  jekyll.

###  1. Thêm file **_sidebar.html_**

Trong thư mục `_include` tạo file có tên `sidebar.html` với nội dung:

```html
<div class="sidebar-right">
 <div class="sidebar-wrapper">
	           <div class="sidebar-widget cats-list">
                <h2>Category</h2>
                <div class="widget-content">
<div class='tags-list'>
  {% assign tags_list = site.categories %}

  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %}
      <a href="/cats/{{ tag | slugify }}" class="post-tag" title="{{ tag }}">
        {{ tag }} <sup>{{ site.categories[tag].size }}</sup>
      </a>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %}
      <a href="/cats/{{ tag[0] | slugify }}" class="post-tag" title="{{ tag[0] }}">
        {{ tag[0] }} <sup>{{ tag[1].size }}</sup>
      </a>
    {% endfor %}
  {% endif %}

  {% assign tags_list = nil %}
</div>
                </div>
            </div>
            <div class="sidebar-widget recent-posts">
                <h2>Bài viết mới</h2>
                <ul class="widget-content">
                    {% for post in site.posts offset: 0 limit: 10  %}
                        <li><a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></li>
                    {% endfor %}
                </ul>
            </div>

          
            <div class="sidebar-widget tags-list">
                <h2>Tags</h2>
                <div class="widget-content">
                    {% assign first = site.tags.first %}
                    {% assign max = first[1].size %}
                    {% assign min = max %}
                    {% for tag in site.tags offset:1 %}
                      {% if tag[1].size > max %}
                        {% assign max = tag[1].size %}
                      {% elsif tag[1].size < min %}
                        {% assign min = tag[1].size %}
                      {% endif %}
                    {% endfor %}

                    {% if max == min %}
                        {% assign diff = 1 %}
                    {% else %}    
                        {% assign diff = max | minus: min %}
                    {% endif %}

                    {% for tag in site.tags %}
                      {% assign temp = tag[1].size | minus: min | times: 36 | divided_by: diff %}
                      {% assign base = temp | divided_by: 4 %}
                      {% assign remain = temp | modulo: 4 %}
                      {% if remain == 0 %}
                        {% assign size = base | plus: 12 %}
                      {% elsif remain == 1 or remain == 2 %}
                        {% assign size = base | plus: 11 | append: '.5' %}
                      {% else %}
                        {% assign size = base | plus: 11 %}
                      {% endif %}
                      {% if remain == 0 or remain == 1 %}
                        {% assign color = 9 | minus: base %}
                      {% else %}
                        {% assign color = 8 | minus: base %}
                      {% endif %}
                      <a class="tag-name" href="/tags/#{{ tag[0] | slugify | downcase }}" title="{{ tag[0] }}" style="font-size: {{ size }}pt; color: #{{ color }}{{ color }}{{ color }};">{{ tag[0] }}</a>
                    {% endfor %}
                </div>
            </div>
        </div>
    </div>
```

Với nội dung trên, sidebar đã có sẵn widget bài viết mới nhất, chuyên mục, thẻ tag. Bạn có thể sẽ phải chỉnh sửa sao cho phù hợp với blog của mình.

### 2. Chỉnh sửa file **_index.html_**

Mở file `index.html` trong thư mục gốc, thêm dòng code bên dưới vào vị trí phù hợp, thường là cuối cùng:

```html
{% include sidebar.html %}
```
### 3. Thêm CSS

Thêm CSS để bố trí layout hợp lý:

```css
.main-wrapper{width:75%;float:left}
.sidebar-right{width:25%;float:right;margin-top:10px}
.sidebar-widget{margin-right: 5px;background:#fff;}
@media screen and (max-width:768px){.main-wrapper{width:100%;} .sidebar-right{width:100%}}
```

### 4. Kết luận

Sau khi chỉnh sửa là bạn đã có thêm một cột sidebar cho trang Blog, hy vọng bài hướng dẫn này sẽ giúp ích cho bạn.
