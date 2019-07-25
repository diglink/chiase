---
title: "[Gatsby] Hiển thị ảnh thumbnail cho bài viết"
date: "2019-05-25T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: "Hướng dẫn hiển thị ảnh đại diện của bài viết ở các trang index"
seoimage: ""
postthumb: 
textthumb: Thumbnail
---

Mục đích bài viết này dành cho các bạn lấy ảnh từ link ngoài làm ảnh thumbnail. Nếu bạn muốn dùng ảnh nội bộ để làm thumbnail thì vẫn có thể dùng cách này. Trước hết bài viết của bạn có phần front matter có phần khai báo `postthumb`:

```
---
title: "[Gatsby] Hiển thị ảnh thumbnail cho bài viết"
date: "2019-05-13T23:12:03.284Z"
postthumb: image-URL
...
---
```

### Chỉnh sửa template hiển thị danh sách bài viết blog-list.js:

```tl
// src/components/templates/blog-list.js
```
```
     <div className="post-list">
        {posts.map(post => (
          
          .......
          
            <div className="post-list__content">
              <div className="post_inner">
```
```hl              
              {post.node.frontmatter.postthumb ? (            <div className="post-list__thumbnail">
                <Link to={post.node.fields.slug}><img src ={post.node.frontmatter.postthumb} title={post.node.frontmatter.title} alt={post.node.frontmatter.title} />
                </Link>
                             
            </div>
                 ) : <div />}
```
```                 
                <div className="post_main">
              <h2 className="post_title"><Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link></h2>
              
              ...........

          frontmatter {
```
```hl          	
          	postthumb
```
```          	
            date(formatString: "DD MMM, YYYY")
            title
            ........

```            

### Chỉnh sửa các template hiển thị danh sách bài viết categories-index.js, tags-index.js:

Tương tự như trên, tuy nhiên ta sử dụng code:

```
              {node.frontmatter.postthumb ? (            <div className="post-list__thumbnail">
                  <Link to={node.fields.slug}><img src ={node.frontmatter.postthumb} title={node.frontmatter.title} alt={node.frontmatter.title} />
                  </Link>
                               
              </div>
                 ) : <div />}
```                 