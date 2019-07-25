---
title: '[Gatsby] Cài đặt các plugin cần thiết cho SEO'
date: "2019-05-19T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide", "gatsby plugin"]
description: Hướng dẫn cài đặt các plugin cần thiết cho GatsbyJs site như google-analytics, robots-txt, feed, plugin-sitemap và Google search console.
textthumb: SEO
---

Thêm vào file `gatsby-config.js`

```tl
// gatsby-config.js
```
```hl
const siteUrl = process.env.URL || process.env.DEPLOY_URL || "https://chiase.web.app"
```
```
module.exports = {
  siteMetadata: {
    title: `Chia sẻ Blog`,
    description: `Blog chia sẻ về thủ thuật.`,
    author: `Maxbong`,
```
```hl    
    siteUrl,
    siteVerification: {
      google: ``, // Add property from https://search.google.com/search-console, get code then paste here.
      bing: ``,
    },
    social: {
      //usernames for SEO
      twitter: "",
      linkedin: "",
    },
    socialLinks: {
      // profile URLS for social links, include https://
      twitter: "",
      linkedin: "",
      facebook: "",
      stackOverflow: "",
      github: "",
      instagram: "",
      youtube: "",
      email: "xxxx@gmail.com", //include mailto:
      phone: "09323", //include tel:
    },
    keywords: [],
    organization: {
      //update with relevant personal data
      name: "Maxbong",
      url: siteUrl,
    },
```
```    
  },
  plugins: [
```
```hl  
    {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: `UA-110478507-5`,    },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: siteUrl + '/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
	{
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {              return allMarkdownRemark.edges.map(edge => {                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description ? edge.node.frontmatter.description : edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
```
```
    .........
```    

### Gatsby-plugin-sitemap

Chạy lệnh `yarn add gatsby-plugin-sitemap`, file`/sitemap.xml` được tạo ra, để xem trước file này ta phải dùng lệnh `yarn build` và `yarn serve`, sau đó truy cập vào địa chỉ `http://localhost:9000/sitemap.xml`.

Xem thêm [gatsby-plugin-sitemap](https://www.gatsbyjs.org/docs/creating-a-sitemap/)

### Gatsby-plugin-feed

Chạy lệnh `yarn add gatsby-plugin-feed`, file `/rss.xml` được tạo ra.

Xem thêm [gatsby-plugin-feed](https://www.gatsbyjs.org/docs/adding-an-rss-feed/)

### Gatsby-plugin-robots-txt
Chạy lệnh `yarn add gatsby-plugin-robots-txt`, file `/robot.txt` được tạo ra.
Xem thêm [gatsby-plugin-robots-txt](https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt)

gatsby-plugin-google-analytics

### Google search console

Truy cập vào [Google search console](https://search.google.com/search-console), đăng ký thêm site mới, lấy mã rồi dán vào file `gatsby-config.js`.