---
title: '[Jekyll] Tìm hiểu cấu trúc cơ bản của Blog'
date: "2016-09-30T23:46:37.121Z"
category: ["Jekyll"]
description: Tìm hiểu cấu trúc cơ bản của 1 site sử dụng Jekyll.
tag: ["Jekyll guide"]
postthumb: "https://lh5.ggpht.com/-Ud8dF4J-qRM/XQsynOJf4FI/AAAAAAAAV9M/DfO3G6eBpmQ7CBeLu95MEYJ51MnQg773gCKgBGAs/w150-e30/jekyll-02a-chiase.web.app.png"
---

Sau khi cài đặt Jekyll blog lên trên Github page hoặc Local host, bạn sẽ thấy trong Jekyll có một số thư mục và file, bài viết dưới đây sẽ giải thích ý nghĩa của chúng

## Cấu trúc cơ bản của Jekyll Blog

Blog Jekyll sau khi được tạo có cấu trúc như cây thư mục bên dưới:


```
.
.
├── _includes
|   ├── head.html
|   ├── header.html
|   └── footer.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2016-10-29-tim-hieu-jekyll-blog.md
|   └── 2016-10-30-cai-dat-jekyll-blog-tren-local-host-windows.md
├── _sass
|   ├── base.scss
|   └── page.scss
├── _site
├── assets
|   ├── main.js
|   └── image.png
├── _config.yml
├── favicon.ico
├── Gemfile
└── index.html
```

Tất nhiên trong quá trình sử dụng Jekyll, bạn sẽ cần cài đặt thêm một số tiện ích bổ sung, và khi đó có thể sẽ có thêm một vài file hoặc thư mục mới.

## Nhiệm vụ của các thư mục bên trong Jekyll site

### 1. \_includes
 Thư mục này giống như là một thư viện, trong đó chứa các file dạng `tên-file.html` mà khi cần sử dụng ta có thể gọi chúng ra. Ta có thể sử dụng chúng để đưa vào bất kỳ một bài viết hay một trang nào bằng cách thêm dòng mã  `{% include tên-file.html %}`. Chúng ta có thể tạo thêm bất kỳ một file mới có đuôi `.html`, bổ sung vào thư mục **_include** để gọi ra khi cần.

Thường thì các file `head.html`, `header.html` và `footer.html` trong thư mục **_include** được sử dụng trong bố cục mặc định của template, và việc có tiếp tục sử dụng chúng nữa hay không phụ thuộc vào bạn. 

### 2. \_layouts
 Thư mục này chứa các file bố cục của Jekyll blog. Mặc định sẽ có các file bố cục: 
- `default.html` : bố cục mặc định của jekyll blog
- `page.html` : bố cục một trang ví dụ như trang sitemap, trang about,...
- `post.html`: bố cục của bài viết

Chúng ta cũng có thể bổ sung thêm các file có đuôi `*.html` để tạo ra các bố cục bất kỳ phù hợp, chẳng hạn như bố cục 2 cột, 3 cột, bố cục dạng lưới,...

Khi tạo một nội dung mới cho Blog (một bài viết hoặc một trang mới...), bạn có thể tùy chọn bố cục bằng cách đặt đoạn mã sau lên trên cùng của file `bài-viết.md`:

```
---
layout: post         # Thay post bằng bố cục bất kỳ
---
```


### 3. \_posts
 Tất cả các bài viết của bạn sẽ được đặt trong thư mục này. thường thì các file được đặt tên có dạng : **năm-tháng-ngày-tiêu-đề-bài-viết.md** 

### 4. \_sass
 Jekyll hỗ trợ [Sass preprocessor](http://sass-lang.com/documentation/file.SASS_REFERENCE.html){:rel='nofollow'}. SASS là một CSS Prepocessor giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn. Với SASS, bạn có thể viết CSS theo thứ tự rõ ràng, quản lý các biến đã được định nghĩa sẵn, có thể tự động nén tập tin CSS lại để bạn tiết kiệm dung lượng. Các bạn có thể tìm hiểu thêm trên Google.

Các file `*.scss` trong thư mục này có thể được chèn vào stylesheet chính. 

### 5. \_site
 Thư mục này được Jekyll tạo ra để bạn đưa lên hosting của website. Trong này sẽ có các thư mục và file HTML, CSS, JS, XML ..., Thư mục **_site** được tạo ra tự động, bạn không cần tạo hay chỉnh sửa bất kỳ nội dung nào trong này.

Lưu ý là bạn chỉ thấy thư mục này khi bạn cài đặt và sử dụng Jekyll trên localhost (máy chủ được vận hành trên máy tính của bạn). Nếu bạn đang sử dụng Jekyll blog trên máy chủ của Github Pages thì bạn sẽ không nhìn thất thư mục này.

### 6. assets
 Trong thư mục này bạn có thể đặt các file Javascript, CSS, hình ảnh... để sử dụng cho Jekyll blog

### 7. Các thư mục khác
 Trong Jekyll website có thể có các folder khác như `_plugins` - chứa các plugin tiện ích cho Jekyll, `project`,...  

## Nhiệm vụ của các file bên trong Jekyll site

### 1. \_config.yml
 Đây là file cực kỳ quan trọng của Jekyll blog. Các thiết lập cấu hình nằm trong file này ví dụ như: tiêu đề website, URL, tác giả, ...

Một ví dụ về nội dung của file `_config.yml`:

```yml
title: Tiêu đề trang web
description: "Miêu tả trang web"

url: "https://huongdanthuthuat.com" # địa chỉ trang web

# Build settings
markdown: kramdown   # Kiểu Markdown sử dụng
theme: minima   # giao diện đang sử dụng
language: 'vi'

# khai báo về phân trang cho blog (nếu sử dụng)
paginate: 9 # amount of posts to show
paginate_path: /page/:num

author: 'Duc Nguyen'     # Tên tác giả
# Các khai báo về disqus, google ( nếu có sử dụng)
disqusid: huongdanthuthuat
short_url: 'huongdanthuthuat.com'
google_analytics: UA-90202612-1
google_searchid: 009601964932240328227:7p-6_d-fye0
google-site-verification: S3mlkkTL25DUpI-_bSzpqjb47dB_lAXjNmHCNKmVy24

baseurl: "" # đường dẫn phụ của blog, ví dụ ./blog
permalink: /:title   # địa chỉ cố định mặc định của trang/bài viết( nếu không được khai báo trong trang/ bài viết đó)

gems: [jekyll-paginate]  # khai báo các gem được sử dụng
exclude:    # Các file/thư mục được liệt kê sẽ không được tạo ra trong thư mục _site
  - Gemfile
  - Gemfile.lock
include: [_pages] # Các file/thư mục được liệt kê sẽ được tạo ra trong thư mục _site
```

Bạn có thể gọi các tham số đã thiết lập trong file `_config.yml` bằng cách sử dụng biến `site` . Ví dụ: dùng `{{ site.url }}` bất kì chỗ nào trong trang/bài viết, giao diện để gọi *url* - đã được thiết lập trong `-config.yml` ra.  [Tìm hiểu thêm](http://jekyllrb.com/docs/configuration/).

### 2. index.html
 Đây chính là trang chủ jekyll blog, file này cũng có thể được định dạng là `index.md`. Nó thường dùng vòng lặp *for* để tải tất cả bài viết. Bạn có thể chỉnh sửa file này và thiết kế theo ý bạn. 

### 3. gemfile

Đây là file khai báo các gem được sử dụng, xem thêm [gem và hướng dẫn cài đặt gem](/jekyll-cai-dat-gem-tren-windows/)
Nội dung cơ bản của file `gemfile`:
```yml
source "https://rubygems.org"
ruby RUBY_VERSION

# Phiên bản Jekyll đang sử dụng
gem "jekyll", "3.3.1"

# Giao diện Jekyll đang sử dụng
gem "minima", "~> 2.0"

# khai báo các plugin jekyll đang sử dụng
group :jekyll_plugins do
   gem "jekyll-paginate"
end
```

### 4. atom.xml/sitemap.xml
 Những file này có nếu blog của bạn cài **feeds** hoặc **sitemap**

### 5. readme.md
 Bạn có thể miêu tả blog của bạn trong file này, nó có ý nghĩa nếu bạn đặt jekyll blog của bạn trên Github pages. Mặc định nó sẽ hiển thị khi có ai đó truy cập vào **repo** của bạn trên Github pages.

Trên đây là hướng dẫn cơ bản về cấu trúc của một Jekyll blog, bài viết được tham khảo từ Blog Webjeda