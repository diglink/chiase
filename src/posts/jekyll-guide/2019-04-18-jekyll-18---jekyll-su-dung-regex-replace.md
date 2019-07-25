---
title: '[Jekyll] Sử dụng Regex replace trong xây dựng Blog'
date: "2019-04-18T08:46:37.121Z"
category: ["Jekyll"]
description: Module đơn giản để cho phép sử dụng biểu thức chính quy thay thế thông qua các Liquid filter. 
tag: ["Jekyll guide", "download"]
textthumb: Regex Replace
---
Plugin này cho phép sử dụng biểu thức chính quy thay thế thông qua các Liquid filter.

### Cách 1

Thêm vào phía dưới dòng `group :jekyll_plugins do` trong file `Gemfile` :

    gem 'jekyll-regex-replace'

Sau đó chạy lệnh `bundle install`.

### Cách 2 

Nếu dùng Jekyll trên localhost thì có thể copy file phía dưới để vào trong thư mục `_plugins`
Download [Jekyll regex replace plugin](https://drive.google.com/open?id=1GhimFXHDg1-cm2pd65DSWSuMSCXFQJQd)
