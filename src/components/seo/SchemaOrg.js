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
