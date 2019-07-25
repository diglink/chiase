---
title: '[Gatsby] Tìm hiểu cơ bản về Gatsby.js'
date: "2019-05-11T21:46:37.121Z"
category: ["gatsby"]
description: Những kiến thức cơ bản khi xây dựng một Website trên nền Gatsby.js
tag: ["gatsby guide"]
postthumb: https://lh5.ggpht.com/-ftLwV7kUZlE/XQH-0wMd6-I/AAAAAAAAV6k/5mARhto805UkD6CP2Q7pDfO0DvswDTowgCKgBGAs/w90-e30/gatsby.chiase.web.app.png
seoimage: 
textthumb: GatsbyJs
---

## 1. Gatsby.js là gì?
Gatsby là một "static site generator" (trình sinh web tĩnh) tương tự [Jekyll](/tao-blog-voi-jekyll-github-pages/). Về cơ bản nó cũng không khác gì `create-react-app`, bạn sẽ viết code bằng JS rồi khi build nó sẽ bundle thành các file HTML, CSS và JS mà bạn có thể vứt lên bất kỳ web host tĩnh nào.

Cách viết một blog bằng Gatsby có thể làm như sau: viết bài blog bằng định dạng md, cho nó vào thư mục posts, bundles lại rồi đẩy lên hosting. 

## 2. Đánh giá ưu nhược điểm của Gatsby

### 2.1 Ưu điểm

- TỐC ĐỘ: Là một framework để tạo web tĩnh (tương tự như Jekyll), tối ưu tốc độ và bảo mật cho website. Việc chuyển qua lại giữa các trang trong website cũng rất nhanh do tất cả các style, html và javascript sẽ được load trong lần tải đầu tiên, khi người dùng ấn vào một bài viết trong trang web của bạn, nội dung mới sẽ được tải về dưới dạng JSON và hiển thị lên, không cần load lại toàn bộ trang. Việc cấu hình các plugin cho phép tối ưu việc tải ảnh và preload (tải trước nội dung của các link người dùng có thể ghé qua) sẽ cho trang web của bạn một tốc độ cực cao.

- SEO FRIENDLY (Thân thiện với các công cụ tìm kiếm): Nhiều bạn có thể lo ngại về việc website của bạn sẽ bị ảnh hưởng chất lượng SEO khi sử dụng GatsbyJS. Tuy nhiên bạn không cần lo lắng về điều đó vì Gatsby.js cung cấp khả năng server rendering, lần đầu crawler của các máy tìm kiếm tải trang web, chúng sẽ nhận được toàn bộ nội dung trang.

- Sử dụng một loạt các công nghệ hiện đại hiện nay như React, Webpack, GraphQL, có thể load dữ liệu từ nhiều nơi như: các file dạng Markdown, các CMS (Contentful, WordPress), REST hay GraphQL API…

- HỖ TRỢ Progressive Web Apps: Thêm website của bạn vào màn hình home của di động và người dùng có thể dùng nó như một app di động luôn.

### 2.2 Nhược điểm

 - Vì Gatsby.js chuyên để tạo static website, nên việc triển khai hệ thống bình luận và tìm kiếm đều phải dựa vào service bên thứ 3 như: Disqus, Facebook…
 - Hơi khó khăn để sử dụng đối với những người chưa quen code.

## 3. Cài đặt môi trường để chạy Gatsby.js

* Trước hết bạn phảo cài đặt [Nodejs](https://nodejs.org/en/download/)

- Mình dùng **yarn** để xây dựng Gatsby blog trên Windows, truy cập trang [yarnpkg](https://yarnpkg.com/en/docs/install#windows-stable) để tải về **Yarn**. Về cơ bản nó không khác lắm npm, bạn có thể lên mạng xem xem nó khác nhau ở đâu để sửa lại cho chạy được.

- Mở **nodejs** command prompt

Tải cli của nó về.  

`yarn global add gatsby-cli`


## 4. Cấu trúc của Gatsby.js 

Trong cửa sổ **Nodejs**, dùng lệnh để truy cập vào thư mục Workspace, chẳng hạn `cd c:\gatsby`, tạo blog:

`gatsby new blog`

Sau khi lệnh chạy xong, đây là kết quả nhận được trong thư mục `c:\gatsby\blog` vừa tạo:

```
	/
	|-- /node_modules
	|-- /.cache
	|-- /plugins
	|-- /public
	|-- /src
	    |-- /pages
	    |-- /templates
	    |-- html.js
	|-- /static
	|-- gatsby-config.js
	|-- gatsby-node.js
	|-- gatsby-ssr.js
	|-- gatsby-browser.js
```

Thư mục `src` chứa các file được chúng ta code để xây dựng Gatsby blog: 
- Components: Chứa các file thành phần của một trang web, ví dụ như header, side bar, nav bar, layout... Các thành phần này sẽ hoạt động như các template, và sẽ áp data vào để thành page hoàn chỉnh.
- Pages: Chứa code để tạo các trang của web như: Homepage, About (Các bài viết sẽ được sinh tự động từ file Markdown, nên sẽ không đặt ở đây).
- Images: Thư mục này là thư mục chứa ảnh, được load lên bằng cách config Gatsby. Các ảnh này là ảnh cố định trên trang web, ví dụ ảnh nền, ảnh trang chủ, ảnh trang profile... Ảnh trong trang blog sẽ không đặt ở đây.

Các file `gatsby-*.js` dùng để tinh chỉnh một số setting của Gatsby. 