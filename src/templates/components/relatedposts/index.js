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