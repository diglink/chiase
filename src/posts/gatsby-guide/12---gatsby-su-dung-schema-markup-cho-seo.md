---
title: "[Gatsby] Sử dụng Schema Markup để tăng hiệu quả SEO"
date: "2019-05-20T23:12:03.284Z"
update: "2019-05-20T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: 
seoimage: ""
textthumb: Schema Markup
---

## Chuẩn bị

File bài viết của bạn có phần front matter dạng như sau:

```
---
title: Bài viết này của Chia sẻ Blog
date: "2019-05-08T23:12:03.284Z"
update: "2019-05-18T23:12:03.284Z"
category: ["gatsby"]
tag: ["guide", "basic"]
description: 
seoimage: image-URL //Ảnh hiển thị cùng với bài viết khi chia sẻ trên mạng xã hội, có thể để trống ("") nếu không có ảnh
---
```

Thêm mới file `.src/components/seo/Seo.js` với nội dung:

```
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import SchemaOrg from "./SchemaOrg"
import { StaticQuery, graphql } from "gatsby"

function SEO({
  description,
  lang,
  meta,
  keywords,
  image,
  title,
  pathname,
  isBlogPost,
  isBlogList,
  author,
  datePublished = false,
  dateModified = false,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaImage = image ? `${image}` : null
        /*  const metaImage = image && image.src ? `${data.site.siteMetadata.siteUrl}${image.src}` : null */
            
        const metaUrl = `${data.site.siteMetadata.siteUrl}${pathname}`
        const organization = data.site.siteMetadata.organization
        organization.logo = {
          url: `${data.site.siteMetadata.siteUrl}/images/gatsby-icon.png`,
          width: 500,
          height: 500,
        }
        if (isBlogList){return (
          
           <SchemaOrg
              isBlogPost={isBlogPost}
              isBlogList={isBlogList}
              url={metaUrl}
              title={title}
              image={metaImage}
              description={metaDescription}
              datePublished={datePublished}
              dateModified={dateModified}
              canonicalUrl={data.site.siteMetadata.siteUrl}
              author={isBlogPost ? author : data.site.siteMetadata.author}
              organization={organization}
              defaultTitle={title}
            />
            )}
            else {
        return (
          
          <>
           <Helmet
              htmlAttributes={{
                lang,
              }}
              title={title}
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              meta={[
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:url`,
                  content: metaUrl,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: isBlogPost ? `article` : `website`,
                },
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
                {
                  name: `twitter:creator`,
                  content: data.site.siteMetadata.social.twitter,
                },
                {
                  name: `twitter:title`,
                  content: title,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                },
                {
                  name: `google-site-verification`,
                  content: data.site.siteMetadata.siteVerification.google,
                },
                {
                  name: `msvalidate.01`,
                  content: data.site.siteMetadata.siteVerification.bing,
                },
              ]
                .concat(
                  metaImage
                    ? [
                        {
                          property: "image",
                          content: metaImage,
                        },
                        {
                          property: "og:image",
                          content: metaImage,
                        },
                        {
                          property: "og:image:width",
                          content: image.width,
                        },
                        {
                          property: "og:image:height",
                          content: image.height,
                        },
                        {
                          property: "og:image:alt",
                          content: image.alt,
                        },
                        {
                          property: "twitter:image",
                          content: metaImage,
                        },
                        {
                          property: "twitter:image:alt",
                          content: image.alt,
                        },
                        {
                          name: "twitter:card",
                          content: "summary_large_image",
                        },
                      ]
                    : [
                        {
                          name: "twitter:card",
                          content: "summary",
                        },
                      ]
                )
                .concat(
                  metaImage && metaImage.indexOf("https") > -1
                    ? [
                        {
                          propery: "twitter:image:secure_url",
                          content: metaImage,
                        },
                        {
                          propery: "og:image:secure_url",
                          content: metaImage,
                        },
                      ]
                    : []
                )
                .concat(
                  keywords.length > 0
                    ? {
                        name: `keywords`,
                        content: keywords.join(`, `),
                      }
                    : []
                )
                .concat(meta)}
            />
            
            <SchemaOrg
              isBlogPost={isBlogPost}
              isBlogList={isBlogList}
              url={metaUrl}
              title={title}
              image={metaImage}
              description={metaDescription}
              datePublished={datePublished}
              dateModified={dateModified}
              canonicalUrl={data.site.siteMetadata.siteUrl}
              author={isBlogPost ? author : data.site.siteMetadata.author}
              organization={organization}
              defaultTitle={title}
            />
          </>
        )
      }
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  pathname: ``,
  isBlogPost: false,
  isBlogList: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  author: PropTypes.object,
  isBlogPost: PropTypes.bool,
  isBlogList: PropTypes.bool,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        siteUrl
        siteVerification {
          google
          bing
        }
        description
        author
        social {
          twitter
          linkedin
        }
        organization {
          name
          url
        }
      }
    }

  }
`
```

Thêm mới file `.src/components/seo/SchemaOrg.js` với nội dung:

```
/**
 *
 * Borrowed and Adapted from https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/e6d25ca927afdc75c759e611d4ba6ba086452bb8/src/components/SEO/SchemaOrg.js
 */
import React from "react"
import Helmet from "react-helmet"

export default React.memo(
  ({
    author,
    canonicalUrl,
    datePublished,
    dateModified,
    defaultTitle,
    description,
    image,
    isBlogPost,
    isBlogList,
    organization,
    title,
    url,
  }) => {
    /* const baseSchema = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url,
        name: title,
        alternateName: defaultTitle,
      },
    ] */
    const baseSchema = [
    {
        "@context": "http://schema.org",
        "@type": "WebSite",
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: {
          "@type": "Organization",
          url: organization.url,
          name: organization.name,
          }
      },
      ]

      const BlogpostSchema = [
      /*  {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": url,
                  name: title,
                  image,
                },
              },
            ],
          }, */
         /* {
            "@context": "http://schema.org",
            "@type": "WebPage",
            mainContentOfPage: [
            {
              "@type": "WebPageElement",
              copyrightYear: new Date().getFullYear(),
              copyrightHolder: {
                "@type": "Organization",
              url: organization.url,
              name: organization.name,
              }
            }
            ]
          },
          */

          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url,
            name: title,
            alternateName: defaultTitle,
            headline: title,
            image: {
              "@type": "ImageObject",
              url: image,
            },
            description,
            author: {
              "@type": "Person",
              name: "Maxbong", /*author.name,*/
              email: "ducrat@gmail.com" /*author.email,*/
            },
            publisher: {
              "@type": "Organization",
              url: organization.url,
              logo: {
                "@type": "ImageObject",
                url: organization.logo.url,
                width: organization.logo.width,
                height: organization.logo.height,
              },
              name: organization.name,
            },
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": canonicalUrl,
            },
            datePublished,
            dateModified,
          },
          ]
    const schema = isBlogPost
      ? [
          ...baseSchema,
          ...BlogpostSchema
        
        ]
      : ( isBlogList ? [
          ...BlogpostSchema
        
        ]
      :
      baseSchema )

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    )
  }
)
```

Thêm mới file `.src/components/seo/seolist.js` với nội dung:

```
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import SchemaOrg from "./SchemaOrg"
import { StaticQuery, graphql } from "gatsby"

function SEOLIST({
  description,
  lang,
  meta,
  keywords,
  image,
  title,
  pathname,
  isBlogPost,
  author,
  datePublished = false,
  dateModified = false,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaImage = image ? `${image}` : null
        /*  const metaImage = image && image.src ? `${data.site.siteMetadata.siteUrl}${image.src}` : null */
            
        const metaUrl = `${data.site.siteMetadata.siteUrl}${pathname}`
        const organization = data.site.siteMetadata.organization
        organization.logo = {
          url: `${data.site.siteMetadata.siteUrl}/images/gatsby-icon.png`,
          width: 500,
          height: 500,
        }
        return (
          <>

            <SchemaOrg
              isBlogPost={isBlogPost}
              url={metaUrl}
              title={title}
              image={metaImage}
              description={metaDescription}
              datePublished={datePublished}
              dateModified={dateModified}
              canonicalUrl={data.site.siteMetadata.siteUrl}
              author={isBlogPost ? author : data.site.siteMetadata.author}
              organization={organization}
              defaultTitle={title}
            />
          </>
        )
      }}
    />
  )
}

SEOLIST.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  pathname: ``,
  isBlogPost: false,
}

SEOLIST.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  author: PropTypes.object,
  isBlogPost: PropTypes.bool,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
}

export default SEOLIST

const detailsQuery = graphql`
  query DefaultSEOLISTQuery {
    site {
      siteMetadata {
        title
        siteUrl
        siteVerification {
          google
          bing
        }
        description
        author
        social {
          twitter
          linkedin
        }
        organization {
          name
          url
        }
      }
    }

  }
`
```

## Thêm dữ liệu có cấu trúc Schema Markup vào bài viết

Mở file `.src/templates/blog-post.js` sửa và thêm:

```tl
// src/templates/blog-post.js
```
```
import React from "react"
import Layout from "../components/layout"
import { graphql} from "gatsby"
import NavBar from "./navbar"
```
```hl
import SEO from "../components/seo/Seo"
```
```
export default function Template({ data, pageContext }) {
    const { markdownRemark: post } = data
    return (
        <>
            <Layout>
```
```hl           
         <SEO
            title={post.frontmatter.title}
            keywords={["gatsby", "blog", "chiase"]}
            isBlogPost={true}
            pathname={post.fields.slug}
            description={post.frontmatter.description ? post.frontmatter.description : (post.excerpt ? post.excerpt : null)}
            datePublished={post.frontmatter.datePublished}
            dateModified={post.frontmatter.dateModified ? post.frontmatter.dateModified : post.frontmatter.datePublished}
            image={post.frontmatter.seoimage ? post.frontmatter.seoimage : "https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A"} //default image, change it by your image.
          />
```
```          
            <h1>{post.frontmatter.title}</h1>

			..............

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
```
```hl			                
			                datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
			                dateModified: update(formatString: "YYYY-MM-DDTHH:mm:ssZ")
			                seoimage
```
```
			            }
			            fields {
			                slug
			            }
```
```hl			            
 			           excerpt(pruneLength: 100)    
```
```
			        }
			        site {
			            ...........      
``` 

## Thêm dữ liệu có cấu trúc Schema Markup vào các trang index

Các trang index ở đây là trang hiển thị danh sách các bài viết của Site, trang Category, trang Tag.

- Mở file `.src/templates/blog-list.js` sửa và thêm:

```tl
// src/templates/blog-list.js
```
```
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
```
```hl
import SEO from "../components/seo/Seo";
```
```
import slug from "slug";

........


    <Layout>
```
```hl    
		<SEO title="Home" keywords={["blog", "chia sẻ", "thủ thuật"]} />
```
```		
      <div className="post-list">
        {posts.map(post => (
          <div key={post.node.id} className="post-list__item">
```
```hl          
        <SEO
            title={post.node.frontmatter.title}
            isBlogList={true}
            pathname={post.node.fields.slug}
            description={post.node.frontmatter.description ? post.node.frontmatter.description : (post.node.excerpt ? post.node.excerpt : null)}
            datePublished={post.node.frontmatter.datePublished}
            dateModified={post.node.frontmatter.dateModified ? post.node.frontmatter.dateModified : post.node.frontmatter.datePublished}
            image={post.node.frontmatter.seoimage ? post.node.frontmatter.seoimage : "https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A"} //default image, change it by your image.
          />
```
```          
            <div className="post-list__content">

            ...................

        frontmatter {
            date(formatString: "DD MMM, YYYY")
            title
            description
            tag
            category
```
```hl            
            datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            dateModified: update(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            seoimage
```
```            
          }
        }
      }
    }
  }
`;
```            

- Mở file `.src/templates/categories-index.js` sửa và thêm:

```tl
// src/templates/categories-index.js
```
```
import React from "react"
import slug from "slug";
import { graphql, Link } from "gatsby"
import Layout from '../components/layout';
import SEO from "../components/seo/Seo";

..........

 <Layout>
      <SEO title={pageContext.category.charAt(0).toUpperCase()+pageContext.category.slice(1)} keywords={["blog", "chia sẻ", "thủ thuật"]} />

		............

          <div key={node.fields.slug} className="post-list__item">
```
```hl          
          <SEO
            title={node.frontmatter.title}
            isBlogList={true}
            pathname={node.fields.slug}
            description={node.frontmatter.description ? node.frontmatter.description : (node.excerpt ? node.excerpt : null)}
            datePublished={node.frontmatter.datePublished}
            dateModified={node.frontmatter.dateModified ? node.frontmatter.dateModified : node.frontmatter.datePublished}
            image={node.frontmatter.seoimage ? node.frontmatter.seoimage : "https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A"}
          />
```
```          
          <div className="post-list__content">
 
 			..........

          frontmatter {
            title
            description
            category
            tag
            date(formatString: "DD MMM, YYYY")  
```
```hl            
            datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            dateModified: update(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            seoimage 
```
```
          }
        }
      }
    }
  }
`
```

- Mở file `.src/templates/categories-index.js` sửa và thêm giống như file  `.src/templates/categories-index.js`.
Done!