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
