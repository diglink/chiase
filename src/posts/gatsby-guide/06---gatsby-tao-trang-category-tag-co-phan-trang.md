---
title: '[Gatsby] Tạo template hiển thị danh sách bài viết theo Category, Tag (Có phân trang)'
date: "2019-05-14T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn tạo template hiển thị danh sách bài viết theo Category (chuyên mục), Tag (thẻ). Bao gồm cả phân trang cho các trang này.
textthumb: Category + Tag List
---

Bài viết này áp dụng cho các bài viết có cấu trúc front matter như sau:

```
category: ["gatsby"]
tag: ["guide", "basic"]
```

Đường dẫn tới Category được tạo ra là `yourdomain/category-name`, `yourdomain/category-name/2` (nếu có trang 2)...

Đường dẫn tới Tag được tạo ra là `yourdomain/tag/tag-name`, `yourdomain/tag/tag-name/2` (nếu có trang 2)...

## Tạo template

### Tạo template hiển thị danh sách bài viết theo Category

Tạo mới file `./src/templates/categories-index.js` có nội dung:

```
import React from "react"
import slug from "slug";
import { graphql, Link } from "gatsby"
import Layout from '../components/layout';
import SEO from '../components/seo';

  const BlogCategory = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const category = slug(pageContext.category)

  const { currentPage, numPages, totalpostcat } = pageContext;
     const tagHeader = `${totalpostcat} post${
    totalpostcat === 1 ? "" : "s"
  } in "${pageContext.category}"`
  const pathPrefix = `${category.toLowerCase()}`;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `${pathPrefix}/`
      : `${pathPrefix}/${(currentPage - 1).toString()}`;
  const nextPage = `${pathPrefix}/${(currentPage + 1).toString()}`;
  return (
    <>

 <Layout>
      <SEO title={pageContext.category.charAt(0).toUpperCase()+pageContext.category.slice(1)} keywords={[`gatsby`, `application`, `react`]} />

<h2>{tagHeader}</h2>
{/*
  <h1>Categories:</h1>
      {pageContext.allCategories.map(cat => (
        <Link to={`/${slug(cat).toLowerCase()}`}>{cat}</Link>
      ))}
     
      */}
       <br />
            <div className="post-list">      
        
        {allMarkdownRemark.edges.map(({ node }) => {

          return (
          <div key={node.fields.slug} className="post-list__item">
          <div className="post-list__content">
           <div className="post_inner">

                <div className="post_main">
              <h2 className="post_title"><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h2>
              <p className="post_description">{node.frontmatter.description ? node.frontmatter.description : node.excerpt }</p>
              </div>
            </div>

            <div className="postinfo">
              <div className="posttime">{node.frontmatter.date}</div>

              {node.frontmatter.tag ? (
                <div className="tags-container">
                  <div className="taglist">
                  Tag:
                    {node.frontmatter.tag.map(tag => (
                      <span key={tag + `tag`} className={`tagname ` + tag.toLowerCase()}>
                    
                        <Link to={`/tag/${slug(tag).toLowerCase()}/`}>{tag}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

            </div>
           </div>
          </div>
          )
        })}
        
    </div>      
       <div className="page-navigation">
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous
          </Link>
        )}

<span> Page {currentPage} of {numPages} </span>

        {!isLast && (
          <Link to={nextPage} rel="next">
            Next →
          </Link>
        )}
      </div>

    </Layout>
    </>
  )
}

export default BlogCategory
export const query = graphql`
  query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            title
            description
            category
            tag
            date(formatString: "DD MMM, YYYY")   

          }
        }
      }
    }
  }
`
```

### Tạo template hiển thị danh sách bài viết theo Tag

Tạo mới file `./src/templates/tags-index.js` có nội dung:

```
import React from "react"
import slug from "slug";
import { graphql, Link } from "gatsby"
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogTag = ({ data, pageContext }) => {
const { allMarkdownRemark } = data
const tag = slug(pageContext.tag)

  const { currentPage, numPages, totalposttag } = pageContext;
     const tagHeader = `${totalposttag} post${
    totalposttag === 1 ? "" : "s"
  } tagged with "${pageContext.tag}"`
  const pathPrefix = `tag/${tag.toLowerCase()}`;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `${pathPrefix}/`
      : `${pathPrefix}/${(currentPage - 1).toString()}`;
  const nextPage = `${pathPrefix}/${(currentPage + 1).toString()}`;
  return (
    <>

 <Layout>

      <SEO title={pageContext.tag.charAt(0).toUpperCase()+pageContext.tag.slice(1)} keywords={[`gatsby`, `application`, `react`]} />

<h2>{tagHeader}</h2>
     {/*
    <h1>Tags:</h1>
      {pageContext.allTags.map(tag => (
        <Link to={`tag/${slug(tag).toLowerCase()}`}>{tag}</Link>
      ))}
    */}
      <br />
            <div className="post-list">      
        
        {allMarkdownRemark.edges.map(({ node }) => {

          return (
          <div key={node.fields.slug} className="post-list__item">
          <div className="post-list__content">
           <div className="post_inner">

                <div className="post_main">
              <h2 className="post_title"><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h2>
              <p className="post_description">{node.frontmatter.description ? node.frontmatter.description : node.excerpt }</p>
              </div>
            </div>

            <div className="postinfo">
              <div className="posttime">{node.frontmatter.date}</div>

              {node.frontmatter.category ? (
                <div className="cats-container">
                  <div className="catlist">
                    {node.frontmatter.category.map(cat => (
                      <span key={cat + `cat`} className={`catname ` + cat.toLowerCase()}>
                    
                        <Link to={`/${slug(cat).toLowerCase()}/`}>{cat}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

            </div>
           </div>
          </div>
          )
        })}
        
    </div>     
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
       <div className="page-navigation">
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous
          </Link>
        )}

<span> Page {currentPage} of {numPages} </span>

        {!isLast && (
          <Link to={nextPage} rel="next">
            Next →
          </Link>
        )}
      </div>

    </Layout>
    </>
  )
}

export default BlogTag
export const query = graphql`
  query blogPostsListByTag($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tag: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            title
            description
            tag
            date(formatString: "DD MMM, YYYY") 
            category  

          }
        }
      }
    }
  }
`
```

## Config

Chỉnh sửa file `gatsby-node` giống bên dưới:

```tl
// gatsby-node.js
```
```
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`);
const _ = require("lodash")
```
```hl
const slug = require('slug');
```
```
exports.onCreateNode = ({ node, getNode, actions }) => {
 {..........}
}
exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
    const blogListTemplate = path.resolve(`./src/templates/blog-list.js`)
```
```hl
	  const blogTagTemplate = path.resolve(`./src/templates/tags-index.js`)
    const blogCategoryLayout = path.resolve(`./src/templates/categories-index.js`)
```    
```     
    return graphql(`
        {
 .............
        }
    `).then(result => {
        if (result["errors"]) {
            return Promise.reject(result["errors"])
        }  
    const posts = result.data.allMarkdownRemark.edges;
```
```hl
	const categories = []
    const tags = []
```
```    
      posts.forEach(post => {
```
```hl
		// Get Categories and Tags from blogpost
        if (post.node.frontmatter.category) {
          post.node.frontmatter.category.forEach(cat => {
            categories.push(cat);
          });
        }
        if (post.node.frontmatter.tag) {
          post.node.frontmatter.tag.forEach(tag => {
            tags.push(tag);
          });
        }
```
```        
         // Create blog post pages
          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,

            },
          })
       })

    // Create blog post list page
    const postsPerPage = 8; // number of posts on a page
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
```
```hl
    //Create Category page and Pagination for category page
    const countCategories = categories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
        }, {})    
    const allCategories = Object.keys(countCategories)
    allCategories.forEach((cat, i) => {
      const link = `/${slug(cat).toLowerCase()}`
            Array.from({
            length: Math.ceil(countCategories[cat] / postsPerPage),
          }).forEach((_, i) => {
            createPage({
              path: i === 0 ? link : `${link}/${i + 1}`,
              component: blogCategoryLayout,
              context: {
                allCategories: allCategories,
                category: cat,
                limit: postsPerPage,
                skip: i * postsPerPage,
                currentPage: i + 1,
                numPages: Math.ceil(countCategories[cat] / postsPerPage),
                totalpostcat: countCategories[cat],
              },
            })
          })
        })
    //Create Category page and Pagination for category page
    const countTags = tags.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
        }, {})
    const allTags = Object.keys(countTags)
    allTags.forEach((tag, i) => {
          const link = `tag/${slug(tag).toLowerCase()}`
          Array.from({
            length: Math.ceil(countTags[tag] / postsPerPage),
          }).forEach((_, i) => {
            createPage({
              path: i === 0 ? link : `${link}/${i + 1}`,
              component: blogTagTemplate,
              context: {
                allTags: allTags,
                tag: tag,
                limit: postsPerPage,
                skip: i * postsPerPage,
                currentPage: i + 1,
                numPages: Math.ceil(countTags[tag] / postsPerPage),
                totalposttag: countTags[tag],
              },
            })
          })
        })
```
```
})
}
```

Done!