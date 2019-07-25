---
title: '[Jekyll] Tự động nén HTML cho Blog'
date: "2016-10-11T08:46:37.121Z"
category: ["Jekyll"]
description: Một plugin cho phép tự động nén tập tin HTML của Blog Jekyll.
tag: ["Jekyll guide"]
textthumb: Compress HTML for Jekyll
---
Nén file HTML là một cách tinh chỉnh để cải thiện tốc độ của Blog, bằng cách xóa bỏ những khoảng trống, những thẻ không cần thiết trong file HTML.

## 1. Bước 1

Download file `compress.html.zip` bản mới nhất của **penibelst** [tại đây](https://github.com/penibelst/jekyll-compress-html/releases/latest). Bung nén được file `compress.html`, copy file này vào thư mục `_layout` của Blog.

## 2. Bước 2

Mở file `default.html` trong thư mục `_layout`, thêm lên trên cùng đoạn code như dưới:

```html
---
layout: compress
---
```

## 3. Bước 3

Mở file `_config.yml` trong thư mục gốc và thêm vào đoạn sau:

```html
# html minify
compress_html:
  clippings: all
  comments: ["<!-- ", " -->"]
  endings: all
  ignore:
    envs: [local]
  blanklines: false
  profile: false
  startings: [html, head, body]
```
Các giá trị bạn có thể tham khảo [tại đây](http://jch.penibelst.de/)