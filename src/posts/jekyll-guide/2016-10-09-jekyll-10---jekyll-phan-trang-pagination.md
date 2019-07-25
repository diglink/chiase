---
title: '[Jekyll] Hướng dẫn thêm plugin phân trang'
date: "2016-10-08T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn phân trang cho blog sử dụng nền tảng Jekyll.
tag: ["Jekyll guide"]
postthumb: "https://lh5.ggpht.com/-mPOLiDVme8U/XQs0gCTMpBI/AAAAAAAAV-I/ZSC8ivySi145xENfyeZdstXzw8H_IemLgCKgBGAs/w150-e30/jekyll-10-chiase.web.app-0.png"
---

Đối với những Blog có số lượng bài viết lớn thì việc sử dụng plugin phân trang là cần thiết, để người đọc có thể nhanh chóng truy cập vào bài viết cần tìm.

![Hướng dẫn thêm plugin phân trang cho blog Jekyll](https://lh5.ggpht.com/-Q_msmHeljgM/XQs0gPaDV4I/AAAAAAAAV-I/Q0SX98euR8k3MWlny2P7zxN4QS1lbJTqQCKgBGAs/s1600-e30/jekyll-10-chiase.web.app-1.png)

Trong bài này, mình sẽ hướng dẫn sử dụng plugin **jekyll-paginate** để tạo phân trang cho Blog


## #1. Cài đặt plugin *jekyll-paginate*

  
Bạn có thể xem thêm plugin này [tại đây](https://github.com/jekyll/jekyll-paginate).  
Xem thêm [Hướng dẫn cài đặt Gem trên Windows](/jekyll-cai-dat-gem-tren-windows/), [Cài đặt Jekyll trên Windows](/jekyll-cai-dat-tren-windows/)

- Mở file `gemfile` trog thư mục gốc của Blog, thêm dòng:

```
gem 'jekyll-paginate'
```

- Mở file `_config.yml` trong thư mục gốc của Blog, thêm dòng `- jekyll-paginate` vào vị trí như dưới:

```
gems:
  - jekyll-archives
  - jekyll-paginate
```
  
- Đối với Blog Jekyll trên localhost thì làm bước này, còn nếu Blog của bạn trực tiếp trên **Github** thì không cần làm bước này.
 Mở **command promp** (CMD), dùng lệnh để truy cập vào thư mục gốc của Blog. Sau đó chạy lệnh sau:

```
gem install jekyll-paginate
```

- Mở file `index.html` trong thư mục gốc của Blog, thêm code giống bên dưới:

```html
{% for post in paginator.posts %}  
# code hiển thị bài viết trên trang index...
{% endfor %}
{% include paginator.html %}
```

## #2. Thêm file *paginator.html*

Trong thư mục `_include`, tạo một file có tên `paginator.html`. Nội dung của file này tùy thuộc vào các mẫu bên dưới:

### - Style 1: mẫu giống như hình

![Hướng dẫn thêm plugin phân trang cho blog Jekyll](https://lh5.ggpht.com/-PVn6Q9pEOSo/XQs0gEgyBEI/AAAAAAAAV-I/dia6x5OnRGMZP6AqrlLNS_O_S3AzK6RfACKgBGAs/s1600-e30/jekyll-10-chiase.web.app-2.pn)

Nội dung file `paginator.html`:

```html
{% if paginator.total_pages > 1 %}
<nav class="pagination">
    {% comment %} Link for previous page {% endcomment %}
    {% if paginator.previous_page %}
      {% if paginator.previous_page == 1 %}
        <a href="{{ base_path }}/">{{ site.data.ui-text[site.locale].pagination_previous | default: "&laquo; Prev" }}</a>
      {% else %}
        <a href="{{ base_path }}/page{{ paginator.previous_page }}/">{{ site.data.ui-text[site.locale].pagination_previous | default: "&laquo; Prev" }}</a>
      {% endif %}
    {% else %}
      <a href="#" class="disabled"><span aria-hidden="true">{{ site.data.ui-text[site.locale].pagination_previous | default: "&laquo; Prev" }}</span></a>
    {% endif %}

    {% comment %} First page {% endcomment %}
    {% if paginator.page == 1 %}
      <a href="#" class="current">1</a>
    {% else %}
      <a href="{{ base_path }}/">1</a>
    {% endif %}

    {% assign page_start = 2 %}
    {% if paginator.page > 4 %}
      {% assign page_start = paginator.page | minus: 2 %}
      {% comment %} Ellipsis for truncated links {% endcomment %}
      <a href="#" class="disabled">&hellip;</a>
    {% endif %}

    {% assign page_end = paginator.total_pages | minus: 1 %}
    {% assign pages_to_end = paginator.total_pages | minus: paginator.page %}
    {% if pages_to_end > 4 %}
      {% assign page_end = paginator.page | plus: 2 %}
    {% endif %}

    {% for index in (page_start..page_end) %}
      {% if index == paginator.page %}
        <a href="{{ base_path }}/page{{ index }}/" class="current">{{ index }}</a>
      {% else %}
        {% comment %} Distance from current page and this link {% endcomment %}
        {% assign dist = paginator.page | minus: index %}
        {% if dist < 0 %}
          {% comment %} Distance must be a positive value {% endcomment %}
          {% assign dist = 0 | minus: dist %}
        {% endif %}
        <a href="{{ base_path }}/page{{ index }}/">{{ index }}</a>
      {% endif %}
    {% endfor %}

    {% comment %} Ellipsis for truncated links {% endcomment %}
    {% if pages_to_end > 3 %}
      <a href="#" class="disabled">&hellip;</a>
    {% endif %}

    {% if paginator.page == paginator.total_pages %}
      <a href="#" class="current">{{ paginator.page }}</a>
    {% else %}
      <a href="{{ base_path }}/page{{ paginator.total_pages }}/">{{ paginator.total_pages }}</a>
    {% endif %}

    {% comment %} Link next page {% endcomment %}
    {% if paginator.next_page %}
      <a href="{{ base_path }}/page{{ paginator.next_page }}/">{{ site.data.ui-text[site.locale].pagination_next | default: "Next &raquo;" }}</a>
    {% else %}
      <a href="#" class="disabled"><span aria-hidden="true">{{ site.data.ui-text[site.locale].pagination_next | default: "Next &raquo;" }}</span></a>
    {% endif %}
</nav>
{% endif %}
```

Thêm CSS:

```css
.pagination{text-align:center;}.pagination a.current{color:red;border:solid red 1px;pointer-events:none;cursor:not-allowed;}.pagination a.disabled{color:#dee0e1;pointer-events:none;cursor:not-allowed;border: none;padding: 3px 0;}.pagination a {border: solid #ddd 1px;padding: 3px 5px;line-height: 1.8em;}
```

### - Style 2: mẫu giống như hình

![Hướng dẫn thêm plugin phân trang cho blog Jekyll](https://lh5.ggpht.com/-KsPSXI-xVAE/XQs0gJu-MNI/AAAAAAAAV-I/KPGEz_JtS_0ljioDdXz_CPQ_ioz-5ynAgCKgBGAs/s1600-e30/jekyll-10-chiase.web.app-3.png)

Nội dung file `paginator.html`:

```html
<nav class="pagination" role="navigation">
{% if paginator.previous_page %}
  <a class="newer-posts" href="{{ site.baseurl }}{{ paginator.previous_page_path }}" title="Newer posts">&laquo; Previous</a>
{% endif %}
  <span class="page-number">Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
{% if paginator.next_page %}
  <a class="older-posts" href="{{ site.baseurl }}{{ paginator.next_page_path }}" title="Older posts">Next &raquo;</a>
{% endif %}
</nav>
```

Thêm CSS:

```css
nav.pagination{padding-top:5.625rem;padding-bottom:5.625rem;text-align:center}nav.pagination .newer-posts,nav.pagination .older-posts,nav.pagination .page-number{font-size:0.875rem;display:inline-block;padding:0.625rem 1.25rem;border-radius:0.1875rem;color:black;border:0.125rem solid black}nav.pagination .newer-posts:hover,nav.pagination .older-posts:hover{border:0.125rem solid #e51843;color:#e51843}nav.pagination .newer-posts.faded,nav.pagination .older-posts.faded{color:gray;border:0.125rem solid gray}nav.pagination .newer-posts.faded a,nav.pagination .older-posts.faded a{color:gray}nav.pagination .newer-posts .fa{margin-right:0.625rem}nav.pagination .older-posts .fa{margin-left:0.625rem}
```