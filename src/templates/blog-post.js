import React from "react"
import Layout from "../components/layout/blogpostlayout"
import slug from "slug";
import { graphql, Link } from "gatsby"
import NavBar from "./navbar"
import SEO from "../components/seo/Seo"
import SimilarArticles from './components/relatedposts'
import PropTypes from 'prop-types'
import timeago from './components/timeago';


export default function Template({ data, pageContext }) {
    const { markdownRemark: post } = data
    const siteUrl=data.site.siteMetadata.siteUrl
    const time = new Date(post.frontmatter.date)
    const currentDate = new Date();

    return (
        <>
            <Layout 
            currentcategory={post.frontmatter.category} 
            currenttag={post.frontmatter.tag} 
            currentArticleSlug = {post.fields.slug}
            >
         <SEO
            title={post.frontmatter.title}
            keywords={["gatsby", "blog", "chiase"]}
            isBlogPost={true}
            pathname={post.fields.slug}
            description={post.frontmatter.description ? post.frontmatter.description : (post.excerpt ? post.excerpt : null)}
            datePublished={post.frontmatter.datePublished}
            dateModified={post.frontmatter.dateModified ? post.frontmatter.dateModified : post.frontmatter.datePublished}
            image={post.frontmatter.seoimage ? post.frontmatter.seoimage : "https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A"}
          />
               {post.frontmatter.category ? (
                     <ul id="breadcrumbs" typeof="BreadcrumbList" vocab="http://schema.org/">
                        <li property="itemListElement" typeof="ListItem"> <Link to="/" property="item" typeof="WebPage"><span property="name">Home</span></Link><meta content="1" property="position" /></li> ›
                         {post.frontmatter.category.map(cat => (
                        <li class="breadcrumb-item" property="itemListElement" typeof="ListItem">
                          <Link to={`/${slug(cat).toLowerCase()}/`}  property="item" typeof="WebPage"><span property="name">{cat}</span></Link><meta content="2" property="position" />
                         </li>
                          ))}
                    </ul>
                    ) : null}
                <h1>{post.frontmatter.title}</h1>
                 <span className="posttime">{post.frontmatter.dateModified ? "Updated" : "Published"} { timeago(currentDate, time) } {" - "}{post.timeToRead} {"min"}{post.timeToRead === 1 ? "" : "s"}{" read"}</span>
                <div class="post_content">
                
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
                <div className="blogpostinfo">
                
                  {/*  <div className="postdate">Published on {time.toDateString()}</div> */}
                     {post.frontmatter.tag ? (
                        <div className="tags-container">
                      <div className="taglist">
                      Tags:  
                        {post.frontmatter.tag.map(tag => (
                          <span key={tag + `tag`} className={`tagname ` + tag}>
                        
                            <Link to={`/tag/${slug(tag).toLowerCase()}/`}>{tag}</Link>
                          </span>
                        ))}
                      </div>
                     </div>
                     ) : null}
                </div>
                <div className="sharebox">Share this: 
                  <a class="facebook" href={`//www.facebook.com/sharer.php?u=`+siteUrl+post.fields.slug} target="_blank" rel="noopener noreferrer">Facebook</a>
                  <a class="twitter" href={`//twitter.com/share?url=`+siteUrl+post.fields.slug} target="_blank" rel="noopener noreferrer">Twitter</a>   
                  <a class="linkedin" href={`//www.linkedin.com/shareArticle?mini=true&url=` + siteUrl+post.fields.slug + `&title=` + post.frontmatter.title + `&summary=` + post.frontmatter.description} target="_blank" rel="noopener noreferrer">Linkedin</a> 
                  <a class="whatsapp" data-action="share/whatsapp/share" href={`whatsapp://send?text=` + post.frontmatter.title + ` - ` + siteUrl+post.fields.slug} target="_blank" rel="noopener noreferrer">Whatsapp</a>   
                </div>                  
                <hr />

                <NavBar newer={pageContext.newer} older={pageContext.older} />
              {/*  <SimilarArticles category={post.frontmatter.category} tag={post.frontmatter.tag} currentArticleSlug={post.fields.slug}/>
            */}
            </Layout>
        </>
    )
}
export const query = graphql`
    query($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            timeToRead
            frontmatter {
                date
                title
                description
                tag 
                category
                datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
                dateModified: update(formatString: "YYYY-MM-DDTHH:mm:ssZ")
                seoimage

            }
            fields {
                slug
            }
            excerpt(pruneLength: 100)
        }
        site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }

    }
`
Template.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  date: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  tag: PropTypes.arrayOf(PropTypes.string).isRequired,
  html: PropTypes.string
}