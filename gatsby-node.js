/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`);
const _ = require("lodash")
const slug = require('slug');

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const filePath = createFilePath({ node, getNode, basePath: `posts` })
      const slug_separate = '---'
      const separatorExists = ~filePath.indexOf(slug_separate)
      let slug
      if (separatorExists){
        const separatorPosition = filePath.indexOf(slug_separate)
        const slugBegin = separatorPosition + slug_separate.length  
        slug =
        separatorPosition === 1
          ? null
          : `/${filePath.substring(slugBegin)}`;
      } else {
      slug = `${filePath}`;
    }

/* use this command if you want to slug as folder Constructure: let slug = createFilePath({ node, getNode, basePath: `posts` });  or `/${createFilePath({ node, getNode, basePath: `posts` }).split("---")[1]}` or `${createFilePath({ node, getNode, basePath: `posts` }).replace(/.*---/,"/").toLowerCase()}` */

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}
exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
    const blogListTemplate = path.resolve(`./src/templates/blog-list.js`)
    const blogTagTemplate = path.resolve(`./src/templates/tags-index.js`)
    const blogCategoryLayout = path.resolve(`./src/templates/categories-index.js`) 
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
    const categories = []
    const tags = []
      posts.forEach(post => {
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
         // Create blog post pages
          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,

            },
          })
       })
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
    // Create blog post list page
    const postsPerPage = 7; // number of posts on a page
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

})
}