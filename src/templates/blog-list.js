import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from "../components/seo/Seo";
import slug from "slug";
import timeago from './components/timeago';

const BlogPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { currentPage, numPages } = pageContext;
  const pathPrefix = '';
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `${pathPrefix}/`
      : `${pathPrefix}/${(currentPage - 1).toString()}`;
  const nextPage = `${pathPrefix}/${(currentPage + 1).toString()}`;

  return (
    <Layout>
      <SEO title="Home" keywords={["blog", "chia sẻ", "thủ thuật"]} />
      <div className="post-list">
        {posts.map(post => (

          <div key={post.node.id} className="post-list__item">
        <SEO

            title={post.node.frontmatter.title}
            isBlogList={true}
            pathname={post.node.fields.slug}
            description={post.node.frontmatter.description ? post.node.frontmatter.description : (post.node.excerpt ? post.node.excerpt : null)}
            datePublished={post.node.frontmatter.datePublished}
            dateModified={post.node.frontmatter.dateModified ? post.node.frontmatter.dateModified : post.node.frontmatter.datePublished}
            image={post.node.frontmatter.seoimage ? post.node.frontmatter.seoimage : "https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A"}
          />
            <div className="post-list__content">
              <div className="post_inner">
              {post.node.frontmatter.postthumb ? (            <div className="post-list__thumbnail">
                <Link to={post.node.fields.slug}><img src ={post.node.frontmatter.postthumb} title={post.node.frontmatter.title} alt={post.node.frontmatter.title} />
                </Link>
                             
            </div>
                 ) : <div className="post-list__thumbnail" style={{background: 'hsl('+Math.floor(Math.random() * 360)+','+Math.floor(Math.random() * 100) + '%,'+Math.floor(Math.random() * 60) + '%)', color: 'white'}}><span>{post.node.frontmatter.textthumb}</span></div>}
                <div className="post_main">
              <h2 className="post_title"><Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link></h2>
               <div className="postinfo">

                <span className="date">{ timeago(new Date, new Date(post.node.frontmatter.date)) }</span>
              {post.node.frontmatter.category ? (
                <span className="cats-container">
                    {post.node.frontmatter.category.map(cat => (
                      <span key={cat + `cat`} className={`catname ` + cat.toLowerCase()}>
                        <Link to={`/${slug(cat).toLowerCase()}/`}>{cat}</Link>
                      </span>
                    ))}
                </span>
              ) : null}
             
              </div>

              <p className="post_description">{post.node.frontmatter.description ? post.node.frontmatter.description : post.node.excerpt }</p>
              </div>
              </div>



            </div>
          </div>
        ))}
      </div>

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
  );
};

export default BlogPage;

// Get all markdown files, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            postthumb
            date(formatString: "DD MMM, YYYY")
            title
            description
            tag
            category
            datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            dateModified: update(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            seoimage
            textthumb
          }
        }
      }
    }
  }
`;