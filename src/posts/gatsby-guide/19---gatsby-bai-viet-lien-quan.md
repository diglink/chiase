---
title: "[Gatsby] Bài viết liên quan"
date: "2019-07-02T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn thêm bài viết liên quan cho GatsbyJs
seoimage: ""
postthumb: 
textthumb: Related Posts
---

Tạ file mới `src/templates/components/relatedposts/index.js` có nội dung:

```
import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { includes, orderBy } from 'lodash'
import ArticleCard from './ArticleCard'

const SimilarArticlesComponent = ({ articles }) => (
  <section className="similar-articles">
  <h3>Related Posts</h3>
    {articles.map((article, i) => (
      <ArticleCard {...article.article} key={i}/>
    ))}
  </section>
)

class SimilarArticlesFactory {
  constructor (articles, currentArticleSlug) {
    this.articles = articles.filter((aArticle) => aArticle.slug !== currentArticleSlug);
    this.currentArticleSlug = currentArticleSlug;
    this.maxArticles = 3;
    this.category = null;
    this.tag = []
  }

  setMaxArticles (m) {
    this.maxArticles = m;
    return this;
  }

  setCategory (aCategory) {
    this.category = aCategory;
    return this;
  }

  setTags (tagsArray) {
    this.tag = tagsArray;
    return this;
  }

  getArticles () {
    const { category, tag, articles, maxArticles } = this;
    const identityMap = {};

    function getSlug (article) {
      return article.slug;
    }

    function addToMap (article) {
      const slug = getSlug(article);

      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          article: article,
          points: 0
        }
      }
    }

    function addCategoryPoints (article, category) {
      const categoryPoints = 2;
      const slug = getSlug(article);

      if (article.category === category) {
        identityMap[slug].points += categoryPoints;
      }
    }

    function addTagsPoints (article, tag) {
      const tagPoint = 1;
      const slug = getSlug(article);
      
      article.tag.forEach((aTag) => {
        if (includes(tag, aTag)) {
          identityMap[slug].points += tagPoint;
        }
      })
    }

    function getIdentityMapAsArray () {
      return Object.keys(identityMap).map((slug) => identityMap[slug]);
    }
    
  
    for (let article of articles) {
      addToMap(article);
      addCategoryPoints(article, category);
      addTagsPoints(article, tag)
    }
    
    const arrayIdentityMap = getIdentityMapAsArray();
    const similarArticles = orderBy(arrayIdentityMap, ['points'], ['desc'])
    return similarArticles.splice(0, maxArticles);
  }
}

function getPostsFromQuery (posts) {
  if (posts) {
    return posts.edges
      .map(edge => edge.node)
      .map(node => Object.assign({}, node.frontmatter, node.fields))
  }

  return []
}


export default (props) => (
  <StaticQuery
    query={graphql`
      query SimilarArticles {    
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }

          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug

              }
              frontmatter {
                title
                date
                description
                tag
                category

              }
            }
          }
        }
      }
    `}
    render={data => {
      const { category, tag, currentArticleSlug } = props;

      const articles = getPostsFromQuery(data.posts);
      const similarArticles = new SimilarArticlesFactory(articles, currentArticleSlug)
        .setMaxArticles(4)
        .setCategory(category)
        .setTags(tag)
        .getArticles()

      return (
        <SimilarArticlesComponent
          articles={similarArticles}
        />
      )
    }}
  />
)
```

Tạo mới file `src/templates/components/relatedposts/ArticleCard.js` có nội dung:

```
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby";
// import slug from "slug";

export const GhostArticleCard = () => (
  <div style={{ height: '0px', minHeight: '0px'}} className="article-card"></div>
)

const ArticleCard = (props) => {
  const {
    title,
    image,
    slug: postslug,
    date,
    category,
    description,
    tag
  } = props;
  return (
    <div className="article-card">

      <div className="article-card--content">
        <Link to={postslug} className="article-card--title">{title}</Link>

{/*
      <Link to={postslug} className="article-card--image-container">
        <img src={image}/>
      </Link>

  <div className="tags-container">
    {tag && tag
      .filter(t => !!t)
      .map((tag, i) => (
        <Link
          to={`/tag/${slug(tag).toLowerCase()}/`}
          className="tag"
          key={i}
        >
          {tag.toLowerCase()}
        </Link>
      ))}
  </div>

  <Link className="article-category" to={`/${slug(category).toLowerCase()}/`}>{category}</Link>
          
 */}      
      </div>
    </div>
  )
}

export default ArticleCard;

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  postslug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  tag: PropTypes.arrayOf(PropTypes.string).isRequired,

}
```

### Chèn vào `blog-post.js` temlate

```tl
// src/templates/blog-post.js
```
```
......
import SEO from "../components/seo/Seo"
```
```hl
import SimilarArticles from './components/relatedposts'
import PropTypes from 'prop-types'
```
```
..........
```
```hl
                <SimilarArticles category={post.frontmatter.category} tag={post.frontmatter.tag} currentArticleSlug={post.fields.slug}/>
```
```                
            </Layout>
			..........
```			