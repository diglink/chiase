---
title: '[Jekyll] Hiển thị Liquid code trong bài viết'
date: "2016-10-02T05:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn trình bày Liquid code khi viết bài
tag: ["Jekyll guide"]
textthumb: Jekyll Liquid
---

![liquid code](https://lh5.ggpht.com/-VMLBQGXwDeU/XQszzn_ShrI/AAAAAAAAV9k/2cVOQ4zsx1UIm8tiJkzdcRkbdqNbKHGdACKgBGAs/s1600-e30/jekyll-04-1-chiase.web.app.png)

Khi bạn muốn trình bày một bài viết mà có mã Liquid code trong đó, thông thường Jekyll có thể hiểu lầm code và đưa nó vào để thi hành lệnh và tạo ra file HTML, thậm chí còn tạo ra một số lỗi dẫn tới không thể tạo ra bài đăng được. Để giải quyết vấn đề này làm như sau:


### #1. Sử dụng thẻ *raw*

Ta chỉ cần đặt đoạn code cần hiển thị vào giữa `{{ "{% raw " }}%}` và `{{ "{% endraw " }}%}`.

Ví dụ như muốn trình bày :

```html
{% for post in site.posts %}
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a>
        </h2>
    {% endfor %}
```

Thì trong **markdown** là:

```html
{% raw %}  {% for post in site.posts %}
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a>
        </h2>
    {% endfor %}  {% endraw %}
```

### #2. Sử dụng `{{ "` và  `" }}`

Nhưng nếu bạn muốn hiển thị code `{% raw %}` và `{% endraw %}` trong bài viết thì sử dụng cách trên không được. Mà ta phải thêm `{{ "` trước `{%`  hoặc  `{{`  , và  `" }}`  trước  `%}`  hoặc   `}}` :

```html
{{ "{% raw " }}%}  
.........  
{{ "{% endraw " }}%}
```

- Ví dụ: Muốn hiển thị  `{{ "{% this " }}%}` thì code markdown là:

```html
{{ "{{ " }}"{{ "{% this" }} " }}{{ "}}%}
```

- Ví dụ: Muốn hiển thị  `{{ "{{ this " }}}}` thì code markdown là:

```html
{{ "{{ " }}"{{ "{{ this" }} " }}{{ "}}}}
```
### #3. Kết luận

Chỉ khi nào cần hiển thị code `{% raw %}` và `{% endraw %}` trong bài viết thì ta sử dụng hướng dẫn **#2**, các trường hợp còn lại sử dụng hướng dẫn **#1**