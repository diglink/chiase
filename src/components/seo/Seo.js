/**
 * SEO component that queries for data with
 *  Gatsby's StaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 * This Component has been adapted and modified from https://github.com/gatsbyjs/gatsby/blob/master/starters/blog/src/components/seo.js
 */

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
