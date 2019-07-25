---
title: '[Jekyll] Tạo trang Lưu trữ (Archive), Danh mục (Category), Thẻ (Tag)'
date: "2016-10-06T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn tạo thêm các trang lưu trữ archive, category, tag cho blog Jekyll.
tag: ["Jekyll guide"]
textthumb: Category + Tag Page
---

Sau khi đã viết được một số bài cho Blog thì bạn nên có các trang **Archive (Lưu trữ)****, Danh mục (Categories)** hay **Thẻ (Tags)** để các bài viết được tổng hợp, phân loại theo từng đối tượng.<!-- excerpt -->


## #1. Khai báo trong bài viết

Để bài viết được tổng hợp, phân loại theo danh mục hay theo thẻ, hãy sử dụng đoạn mã như bên dưới đầu mỗi bài viết:

```
---
categories: [danh mục 1, danh mục 2]
tags: [tag 1, tag 2, tag 3]
---
```

## #2. Tạo trang Lưu trữ thống kê bài viết

Tạo file `posts.html` tại thư mục gốc của mã nguồn, và copy nội dung sau đây vào:

```html
---
layout: archive
title: "All Posts"
permalink: /posts/
description: "An archive of posts."
author_profile: false
comments: false
---

{% for post in site.posts %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}

    {% if forloop.first %}
    <article>
      <h2 id="{{ this_year }}-ref">{{ this_year }}</h2>
      <ul>
    {% endif %}
        <li><span class="post-date">{{ post.date | date_to_string }}</span><a class="tag-post-title"href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a></li>
    {% if forloop.last %}
      </ul>
    </article>
    {% else %}
        {% if this_year != next_year %}
          </ul>
        </article>
        <article>
          <h2 id="{{ next_year }}-ref">{{next_year}}</h2>
          <ul>
        {% endif %}
    {% endif %}
{% endfor %}
```

## #3. Tạo trang thống kê bài viết theo danh mục (Categories)

Tạo file `Categories.html` tại thư mục gốc của mã nguồn, và copy nội dung sau đây vào:

```html
---
layout: archive
title: Categories
permalink: /cats/
description: "Posts listed by Catgories"
author_profile: false
comments: false
---

<div class="cats-wrapper">

<div class='tags-list'>
  {% assign tags_list = site.categories %}

  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %}
      <a href="#{{ tag | slugify }}" class="post-tag">
        {{ tag }} <span class='badge'>({{ site.categories[tag].size }})</span>
      </a>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %}
      <a href="#{{ tag[0] | slugify }}" class="post-tag">
        {{ tag[0] }} <span class='badge'>({{ tag[1].size }})</span>
      </a>
    {% endfor %}
  {% endif %}

  {% assign tags_list = nil %}
</div>

  <hr/>
  <div class="tags-expo-section">
    {% for tag in site.categories %}
    <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
    <ul class="tag-posts">
      {% for post in tag[1] %}
        
      <li>
        <span class="post-date">{{ post.date | date_to_string }}</span><a class="tag-post-title" href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a>
            </li>
      
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</div>
```

## #4. Tạo trang thống kê bài viết theo thẻ (Tags)

Tạo file `tags.html` tại thư mục gốc của mã nguồn, và copy nội dung sau đây vào:

```html
---
layout: archive
title: Tags
permalink: /tags/
description: "Posts listed by Tags"
author_profile: false
comments: false
---

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tags_list = site_tags | split:',' | sort %}

<!-- Start tag array header -->
<div class="tags-list">
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tags_list[item] | strip_newlines }}{% endcapture %}
  	<a href="#{{ this_word | slugify | downcase }}" class="post-tag"><span class="term">{{ this_word }}</span> <span class="count">({{ site.tags[this_word].size }})</span></a>
  {% endunless %}{% endfor %}
</div>
<!-- End tag array header -->
  <hr/>
<!-- Start tag list -->
{% for item in (0..site.tags.size) %}{% unless forloop.last %}
  {% capture this_word %}{{ tags_list[item] | strip_newlines }}{% endcapture %}
	<article>
	<h2 id="{{ this_word | slugify | downcase }}">{{ this_word }}</h2>
		<ul>
    {% for post in site.tags[this_word] %}{% if post.title != null %}
      <li><span class="post-date">{{ post.date | date_to_string }}</span><a class="tag-post-title" href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a> </li>
    {% endif %}{% endfor %}
		</ul>
	</article><!-- /.hentry -->
{% endunless %}{% endfor %}
<!-- End tag list -->
```

## #5. Kết luận

Sau khi làm các bước trên là Blog của bạn đã có thêm các trang thống kê, phân loại bài viết theo thời gian, danh mục, thẻ.
Để cho các trang này bắt mắt hơn, bạn có thể thêm CSS cho phù hợp.
