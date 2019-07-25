const siteUrl = process.env.URL || process.env.DEPLOY_URL || "https://chiase.web.app"
module.exports = {
  siteMetadata: {
    title: `Chia sẻ Blog`,
    description: `Blog chia sẻ về thủ thuật.`,
    author: `Maxbong`,
    siteUrl,
    siteVerification: {
      google: `lbwbkaJOtfDNgKPddq2p-BpNlVNcEQQpO4HBnOXr408`, // Add property from https://search.google.com/search-console, get code then paste here.
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
      email: "ducrat@gmail.com", //include mailto:
      phone: "09323", //include tel:
    },
    keywords: [],
    organization: {
      //update with relevant personal data
      name: "Maxbong",
      url: siteUrl,
    },
  },
  plugins: [
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts/`,
        name: "pages",
      },
    },
      {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
      {
        resolve: `gatsby-remark-images`,
        options: {
        maxWidth: 800,
        linkImagesToOriginal: true,
        },
      },
      ],
      plugins: [
      {
        resolve: "gatsby-remark-external-links",
      }
      ],
    },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-maxbong`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
