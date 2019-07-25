---
title: '[Gatsby] Tạo trang hiển thị danh sách bài viết (Bloglist template)'
date: "2019-05-12T15:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn tạo trang hiển thị danh sách các bài viết có trong GatsbyJs site.
textthumb: Bloglist Template
---

Thêm file `src/templates/blog-list.js`:

```tl
src/templates/blog-list.js
```
```
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from "../components/seo";
import slug from "slug";


const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const _ = require("lodash")

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="post-list">
        {posts.map(post => (
          <div key={post.node.id} className="post-list__item">

            <div className="post-list__content">
              <div className="post_inner">
                <div className="post_main">
              <h2 className="post_title"><Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link></h2>
              <p className="post_description">{post.node.frontmatter.description ? post.node.frontmatter.description : post.node.excerpt }</p>
              </div>
              </div>

              <div className="postinfo">
              <div className="posttime">{post.node.frontmatter.date}</div>
              {post.node.frontmatter.category ? (
                <div className="cats-container">
                  <div className="catlist">
                    {post.node.frontmatter.category.map(cat => (
                      <div key={cat + `cat`} className={`catname ` + cat.toLowerCase()}>
                        <Link to={`/${slug(cat).toLowerCase()}/`}>{cat}</Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
             
              </div>

            </div>
          </div>
        ))}
      </div>

    </Layout>
  );
};

export default BlogPage;

// Get all markdown files, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM, YYYY")
            title
            description
            tag
            category
          }
        }
      }
    }
  }
`;
```

## Config Gatsbyjs

Mở file `Gasby-node.js`.

- Phía dưới `exports.createPages = ({ actions, graphql }) => {` thêm:

```
const blogListTemplate = path.resolve(`./src/templates/blog-list.js`)
```

- Tìm code:
```
if (result["errors"]) {
            return Promise.reject(result["errors"])
        }
```
Thêm bên dưới:
```
    // Create blog post list page
    const postsPerPage = 8; // number of posts on a page

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: Math.ceil(posts.length / postsPerPage);,
          currentPage: i + 1
        },
      });
    });
```