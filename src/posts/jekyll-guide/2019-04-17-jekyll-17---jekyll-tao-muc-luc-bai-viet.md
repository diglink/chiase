---
title: '[Jekyll] Tạo mục lục cho bài viết'
date: "2019-04-17T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn tạo mục lục cho bài viết ( Table of content).
tag: ["Jekyll guide"]
textthumb: Jekyll TOC
---
## Tạo file

Tạo file mới trong thư mục `_includes` với nội dung:

    <nav class="toc">
    <input id="ac-toc" name="accordion-toc" type="checkbox" />
    <label for="ac-toc">Nội dung bài viết</label>
    <div class="toc__menu" markdown="1">
    *  Auto generated table of contents
    {:toc}
    </div>
    </nav>

## Thêm CSS

    /* TOC */
    .toc { margin: 2em 0 1.5em;} .toc input[type=checkbox] { display: none; } .toc label { position: relative; display: inline-block; padding: 1em 2.5em 1em 1em; font-weight: 600; line-height: 1; border: 1px solid #ccc; border-radius: 3px; z-index: 20; -webkit-transition: .2s ease-out; transition: .2s ease-out; cursor: pointer; } .toc label:after, .toc label:before { content: ''; position: absolute; right: 1em; top: 1.5em; width: .75em; height: .125em; line-height: 1; background-color: #333; -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; } .toc label:after { -webkit-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg); } .toc label:hover { border-color: #333; } .toc input:checked + label { color: #fff; background-color: #555; } .toc input:checked + label:after, .toc input:checked + label:before { background-color: #fff; } .toc label:hover:after { -webkit-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg); } .toc input:checked + label:hover:after { -webkit-transform: rotate(0); -ms-transform: rotate(0); transform: rotate(0); } .toc__menu > ul { padding: 0; list-style-type: none; } .toc__menu > ul li { display: block; font-weight: 400; } .toc__menu > ul li a { color: #000; text-decoration: none; } .toc__menu > ul li a:hover { text-decoration: underline; } .toc__menu > ul > li { font-weight: 600; } .toc__menu > ul > li:not(:last-child) { padding: .5em 0; border-bottom: 1px solid #eee; } .toc__menu > ul > li > ul { padding-left: 1em; } .toc .toc__menu { position: relative; margin: 0; max-height: 0; font-size: 1em; opacity: 0; overflow: hidden; z-index: 10; border: 1px solid #ddd;} .toc input:checked ~ .toc__menu { max-height: 100vh; opacity: 1; margin-top: 1em; }.toc__menu ul{counter-reset: item;}#markdown-toc li{display: block;margin-right: 10px;}#markdown-toc li::before{content: counters(item, ".") " "; counter-increment: item;}
	
## Sử dụng

Khi tạo bài viết mới chèn code sau vào nơi muốn hiển thị:

```
  {% include toc.html %}
```

Done!
