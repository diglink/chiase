---
title: '[Gatsby] Tạo template hiển thị bài viết'
date: "2019-05-12T05:46:37.121Z"
category: ["gatsby"]
description: Hướng dẫn tạo mới một bài viết và tạo template để hiển thị bài viết blogpost.
tag: ["gatsby guide"]
textthumb: Blogpost Template
---

## Tạo file bài viết

- Để dễ quản lý thì tất cả bải viết sẽ được để trong thư mục `src\posts\`.

- Tên file bài viết có dạng `2019-06-10---ten-file.md`. Thực ra bạn đặt tên nào cũng được, nhưng ở đây mình đặt như vậy để sắp xếp các bài viết theo thứ tự thời gian, và đường dẫn tới bài viết sẽ là `domain/ten-file`, vì vậy nên chọn tên file cho phù hợp với nội dung bài viết.

- Nội dung của file bài viết có dạng:
```
// .src\posts\ten-file.md
---
title: This is first post of chiase blog
date: "2019-05-01T22:12:03.284Z"
category: ["cat1"]
tag: ["greeting", "egg"]
description: your post's description here.
---

This is my first post on my new fake blog! How exciting!

I'm sure I'll write a lot more interesting things in the future.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](https://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarke
```

## Tạo template cho trang bài viết

Tạo mới thư mục con `templates` trong thư mục `src`, đây sẽ là nới chứa các template. Trong thư mục này tạo file mới `blogpost.js` có nội dung:

```title
// .src/templates/blogpost.js
```
```
import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function Template({ data, pageContext }) {
    const { markdownRemark: post } = data
    return (
        <>
            <Layout>

                <h1>{post.frontmatter.title}</h1>
                
                <div class="post_content">
                
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>

                <hr />

            </Layout>
        </>
    )
}
export const query = graphql`
    query($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                date
                title
                description
                tag 
                category

            }
            fields {
                slug
            }
        }
        site {
      siteMetadata {
        title
        author
      }
    }

    }
`
```

## Tạo đường dẫn tới bài viết

Thêm nội dung bên dưới vào file `gatsby-node.js`:

```
// gatsby-node.js

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        let slug = `/${createFilePath({ node, getNode, basePath: `posts` }).split("---")[1]}`;
/* use this command if you want to slug as folde Constructure: let slug = `/${createFilePath({ node, getNode, basePath: `posts` }).split("---")[1]}/`;    */
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}
exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
    return graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 250)
                        html
                        id
                        frontmatter {
                            date
                            title
                            tag
                            category

                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result["errors"]) {
            return Promise.reject(result["errors"])
        }
    const posts = result.data.allMarkdownRemark.edges;
	posts.forEach(post => {
      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,

        },
      })
	})
})
}
```

## Config 

Chỉnh sửa nội dung file `gatsby-config.js`

- Thay thế:
```
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
```
bằng:
```
    {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/posts/`,
      name: "pages",
    },
  },
```

- Thêm ngay dưới đoạn code trên:
```
`gatsby-transformer-remark`,
```
Plugin này giúp gatsby quét và nhận diện các file Markdown.

Xóa file: `/src/components/image.js` và `\src\pages\index.js`

## Cài đặt plugin

### gatsby-transformer-remark

Plugin này giúp gatsby quét và nhận diện các file Markdown. để cài đặt vào file `gatsby-config.js`, thêm đoạn code sau vào bên dưới `plugins: [`:
```
`gatsby-transformer-remark`,
```

Chạy lệnh `yarn add gatsby-transformer-remark`.

### Slug

Plugin này có chức năng chuyển đổi các ký tự đặc biệt về các ký tự cơ bản, chẳng hạn như nó sẽ giúp chuyển đổi từ "chào mừng đến với blog chia sẻ" thành "chao-mung-den-voi-blog-chia-se".

Để cài đặt, chạy lệnh `yarn add slug`
