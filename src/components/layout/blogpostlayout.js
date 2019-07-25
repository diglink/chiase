import React from "react"
import * as PropTypes from "prop-types"
import { StaticQuery, Link, graphql } from "gatsby"

import Header from "../header"
import style from "./layout.module.css"
import "./theme.css"
import Sidebar from "./sidebar";
import SimilarArticles from './../../templates/components/relatedposts'

export default (props) => {
  const children = props.children;
  const {currentcategory, currenttag,  currentArticleSlug} = props

 return (

    <StaticQuery
        query={graphql`
            {
                site {
                    siteMetadata {
                        title
                        description
                        siteUrl
                    }
                },
                topics: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date] }, limit: 2000) {
          edges {
            node {
              frontmatter {
                category
                tag
              }
            }
          },
          tag: group(field: frontmatter___tag) {
        fieldValue
        totalCount
      },
      category: group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
        },
        test: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                category
                tag
              }
            }
          }
        }

            }
        `}

        render={data => (

            <>
                <Header
                    siteTitle={data.site.siteMetadata.title}
                    siteDescription={data.site.siteMetadata.description}
                />
                <div className={style.div}>
                    <div className= {style.mainwrapper}>{children}</div>

                  <div className={style.sidebar}>
                  <Sidebar      
                edges={data.topics.edges} tags={data.topics.tag} categories={data.topics.category} siteUrl={data.site.siteMetadata.siteUrl}
              />
              <SimilarArticles category={currentcategory} tag={currenttag}  currentArticleSlug={currentArticleSlug}/>
              </div>

                 <div class="clear" />   
				<footer className={style.footer}>
                © {new Date().getFullYear()} by <Link to="/">
                        {data.site.siteMetadata.title}
                    </Link>, Built with
                {` `}
                <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">Gatsby</a>, Hosted by
                {` `}
                <a href="https://web.app" target="_blank" rel="noopener noreferrer">Firebase</a>
              </footer>
                </div>

            </>
        )}
    />
)


}

