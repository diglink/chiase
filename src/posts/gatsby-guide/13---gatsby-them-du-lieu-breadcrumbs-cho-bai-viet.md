---
title: "[Gatsby] Thêm Breadcrumbs cho bài viết"
date: "2019-05-21T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn thêm Breadcrumbs chuẩn SEO cho bài viết.
seoimage: ""
textthumb: Breadcrumbs
---

Mở file `.src/templates/blog-post.js` sửa và thêm:

```tl
// src/templates/blog-post.js
```
```
import React from "react"
import Layout from "../components/layout"
```
```hl
import slug from "slug"
import { graphql, Link } from "gatsby"
```
```
import NavBar from "./navbar"
import SEO from "../components/seo/Seo"

..............

```
```hl
               {post.frontmatter.category ? (
                     <ul id="breadcrumbs" typeof="BreadcrumbList" vocab="http://schema.org/">
                        <li property="itemListElement" typeof="ListItem"> <Link to="/" property="item" typeof="WebPage"><span property="name">Home</span></Link><meta content="1" property="position" /></li> ›
                         {post.frontmatter.category.map(cat => (
                        <li class="breadcrumb-item" property="itemListElement" typeof="ListItem">
                          <Link to={`/${slug(cat).toLowerCase()}/`}  property="item" typeof="WebPage"><span property="name">{cat}</span></Link><meta content="2" property="position" />
                         </li>
                          ))}
                    </ul>
                    ) : null}
```
```                    
                <h1>{post.frontmatter.title}</h1>

                ...................

```                