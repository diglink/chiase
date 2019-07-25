import React from "react"
import PropTypes from "prop-types"

// Utilities
import slug from "slug"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from '../components/layout';
import SEO from '../components/seo';

const CategoriesPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
   <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  <div>
    <Helmet title={title} />
    <div>
      <h1>Categories</h1>
      <ul>
        {group.map(cat => (
          <li key={cat.fieldValue}>
            <Link to={`/${slug(cat.fieldValue).toLowerCase()}/`}>
              {cat.fieldValue} ({cat.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </Layout>
)

CategoriesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default CategoriesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`