import React from "react"
import PropTypes from "prop-types"

// Utilities
import slug from "slug"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from '../components/layout';
import SEO from '../components/seo';

const TagsPage = ({
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
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tag/${slug(tag.fieldValue).toLowerCase()}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </Layout>
)

TagsPage.propTypes = {
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

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
    }
  }
`

{/* other option:

  function TagsPage(props) {

    const data = props.data.allMarkdownRemark.group

    return (
        <Layout>
            <div className="tags">
                <h1>All tags</h1>
                {
                    data.map(tag => (
                        <Link to={`/${tag.fieldValue}`} >
                            {tag.fieldValue} {`(${tag.totalCount})`}
                        </Link>
                    ))
                }
            </div>
        </Layout>
    )

}

export default TagsPage;


export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }

`
*/}