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
        <Link to={postslug} className="article-card--title">{"⌑ "}{title}</Link>

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