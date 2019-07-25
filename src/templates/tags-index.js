import React from "react"
import slug from "slug";
import { graphql, Link } from "gatsby"
import Layout from '../components/layout';
import SEO from "../components/seo/Seo";

const BlogTag = ({ data, pageContext }) => {
  
  const { allMarkdownRemark } = data

 const tag = slug(pageContext.tag)

  const { currentPage, numPages, totalposttag } = pageContext;
     const tagHeader = `${totalposttag} post${
    totalposttag === 1 ? "" : "s"
  } tagged with "${pageContext.tag}"`
  const pathPrefix = `tag/${tag.toLowerCase()}`;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `${pathPrefix}/`
      : `${pathPrefix}/${(currentPage - 1).toString()}`;
  const nextPage = `${pathPrefix}/${(currentPage + 1).toString()}`;
  return (
    <>

 <Layout>

      <SEO title={pageContext.tag.charAt(0).toUpperCase()+pageContext.tag.slice(1)} keywords={["blog", "chia sẻ", "thủ thuật"]} />


<h2>{tagHeader}</h2>
     {/*
    <h1>Tags:</h1>
      {pageContext.allTags.map(tag => (
        <Link to={`tag/${slug(tag).toLowerCase()}`}>{tag}</Link>
      ))}
    */}
      <br />
            <div className="post-list">      
        
        {allMarkdownRemark.edges.map(({ node }) => {

          return (
          <div key={node.fields.slug} className="post-list__item">
          <SEO
            title={node.frontmatter.title}
            isBlogList={true}
            pathname={node.fields.slug}
            description={node.frontmatter.description ? node.frontmatter.description : (node.excerpt ? node.excerpt : null)}
            datePublished={node.frontmatter.datePublished}
            dateModified={node.frontmatter.dateModified ? node.frontmatter.dateModified : node.frontmatter.datePublished}
            image={node.frontmatter.seoimage ? node.frontmatter.seoimage : "https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A"}
          />
          <div className="post-list__content">
           <div className="post_inner">
              {node.frontmatter.postthumb ? (            <div className="post-list__thumbnail">
                  <Link to={node.fields.slug}><img src ={node.frontmatter.postthumb} title={node.frontmatter.title} alt={node.frontmatter.title} />
                  </Link>
                               
              </div>
                 ) : <div className="post-list__thumbnail" style={{background: 'hsl('+Math.floor(Math.random() * 360)+','+Math.floor(Math.random() * 100) + '%,'+Math.floor(Math.random() * 60) + '%)', color: 'white'}}><span>{node.frontmatter.textthumb}</span></div>}
                <div className="post_main">
              <h2 className="post_title"><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h2>
              <div className="postinfo">
              <span className="date">{node.frontmatter.date}</span>

              {node.frontmatter.category ? (
                <span className="cats-container">
                    {node.frontmatter.category.map(cat => (
                      <span key={cat + `cat`} className={`catname ` + cat.toLowerCase()}>
                    
                        <Link to={`/${slug(cat).toLowerCase()}/`}>{cat}</Link>
                      </span>
                    ))}
                </span>
              ) : null}

            </div>
              <p className="post_description">{node.frontmatter.description ? node.frontmatter.description : node.excerpt }</p>
              </div>
            </div>


           </div>
          </div>
          )
        })}
        
    </div>     
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
       <div className="page-navigation">
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous
          </Link>
        )}

<span> Page {currentPage} of {numPages} </span>

        {!isLast && (
          <Link to={nextPage} rel="next">
            Next →
          </Link>
        )}
      </div>

    </Layout>
    </>
  )
}




export default BlogTag

export const query = graphql`
  query blogPostsListByTag($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tag: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            title
            description
            tag
            date(formatString: "DD MMM, YYYY") 
            category  
            datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            dateModified: update(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            seoimage 
            postthumb
            textthumb
          }
        }
      }
    }
  }
`