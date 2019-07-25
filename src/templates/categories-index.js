import React from "react"
import slug from "slug";
import { graphql, Link } from "gatsby"
import Layout from '../components/layout';
import SEO from "../components/seo/Seo";


const BlogCategory = ({ data, pageContext }) => {
  
  const { allMarkdownRemark } = data

 const category = slug(pageContext.category)

  const { currentPage, numPages, totalpostcat } = pageContext;
     const tagHeader = `${totalpostcat} post${
    totalpostcat === 1 ? "" : "s"
  } in "${pageContext.category}"`
  const pathPrefix = `${category.toLowerCase()}`;
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

      <SEO title={pageContext.category.charAt(0).toUpperCase()+pageContext.category.slice(1)} keywords={["blog", "chia sẻ", "thủ thuật"]} />

<h2>{tagHeader}</h2>
{/*
  <h1>Categories:</h1>
      {pageContext.allCategories.map(cat => (
        <Link to={`/${slug(cat).toLowerCase()}`}>{cat}</Link>
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

              {node.frontmatter.tag ? (
                <span className="tags-container">
                  Tag:
                    {node.frontmatter.tag.map(tag => (
                      <span key={tag + `tag`} className={`tagname ` + tag.toLowerCase()}>
                    
                        <Link to={`/tag/${slug(tag).toLowerCase()}/`}>{tag}</Link>
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




export default BlogCategory

export const query = graphql`
  query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
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
            category
            tag
            date(formatString: "DD MMM, YYYY")  
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