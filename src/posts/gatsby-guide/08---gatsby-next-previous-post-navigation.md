---
title: '[Gatsby] Tạo liên kết Next post và Previous post'
date: "2019-05-16T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn tạo liên kết tới bài viết mới và cũ hơn ở cuối bài viết.
textthumb: ← →
---

### Tạo Navbar component

Tạo mới file `./src/templates/navbar/index.js` có nội dung:

```
import React from "react"
import { Link } from "gatsby"
import style from "./navbar.module.css"
const LinkTo = ({ node, className, children }) => {
    if (node)
        return (
            <div className={className}>
            {children}<br />
                <Link to={node.fields["slug"]} className={style.post_nav}>
                                  
                    {node.frontmatter.title}
                </Link>
            </div>
        )
    return null
}
const NavBar = ({ older, newer }) => {
    return (
        <div className={style.navbar}>
            <LinkTo node={older} className={style.older}>
                Older Post →
            </LinkTo>
            <LinkTo node={newer} className={style.newer}>
                ← Newer Post
            </LinkTo>
        </div>
    )
}
export default NavBar
```

Tạo mới file `./src/templates/navbar/navbar.module.css` có nội dung:

```
.older {
    float: right;
    font-size: 0.9rem;
    text-align: right;
}
.newer {
    float: left;
    font-size: 15px;
}
.navbar {
    padding:  0 0 10px;
    position: relative;
	overflow: hidden;
}
.post_nav {
    color: hsl(161, 100%, 27%);
}
```

### Thêm vào Blogpost template

Mở file `./src/templates/blog-post.js`, thêm nội dung được đánh dấu phía dưới:

```tl
// .src/templates/blog-post.js
```
```
import React from "react"
import Layout from "../components/layout"
import { graphql} from "gatsby"
```
```hl
import NavBar from "./navbar"
```
```

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
```
```hl                
                <NavBar newer={pageContext.newer} older={pageContext.older} />
```
```                
            </Layout>
        </>
```      

### Config

```tl
// gatsby-node.js
```
```
    `).then(result => {
        if (result["errors"]) {
            return Promise.reject(result["errors"])
        }
 ...............   
          // Create blog post pages
          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,

            },
          })
       })
```
```hl       
    /* create next previous */
    const postList = result.data["allMarkdownRemark"]["edges"];
    postList.forEach(({ node }, index) => {
    const older = index === postList.length - 1 ? null : postList[index + 1].node
    const newer = index === 0 ? null : postList[index - 1].node
    createPage({
      path: node.fields["slug"],
      component: blogPostTemplate,
      context: {
        older,
        newer
          },
        })
        })
```
```        
    // Create blog post list page
    const postsPerPage = 8; // number of posts on a page
    const numPages = Math.ceil(posts.length / postsPerPage);
```    