---
title: '[Gatsby] Tạo trang thống kê Category, Tag'
date: "2019-05-15T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn tạo trang hiển thị danh sách các Category (chuyên mục), Tag (thẻ).
textthumb: Category Tag
---

## Trang Category

Tạo mới file `./src/pages/cats.js` có nội dung:

```
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
```

## Trang Tag

Tạo mới file `./src/pages/tags.js` có nội dung:

```
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
```
