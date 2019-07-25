import React from "react";
import "./sidebar.css";
import slug from "slug";
import { graphql, Link } from "gatsby"
import Search from "./sidebarsearch";

const sidebarr = (data) => {

const {tags, categories, siteUrl}= data

  return (
    <div className="sidebar" id="sidebar">
      <div className="widget search">
      <h3>Search</h3>
      <Search siteUrl={siteUrl} />
      </div>

      <div className="widget categorylist">
        <h3>Categories</h3>
        <div className="widget_content">
         { categories.map(cat => (
            <div className="cat_info">
              <Link to={`/${slug(cat.fieldValue).toLowerCase()}`} >
                  {"⌑ "}{cat.fieldValue} {`(${cat.totalCount})`}
              </Link>
            </div>
                    ))
                }
        </div>      

      </div>

 {/*     <div className="widget taglist">
        <h3>Tags</h3>
      { tags.map(tag => (
                        <Link to={`/tag/${slug(tag.fieldValue).toLowerCase()}`} >
                            {tag.fieldValue} {`(${tag.totalCount})`}
                        </Link>
                    ))
                }
      </div>

*/}

      <div className="widget categorylist">
        <h3>Recommended Series</h3>
        <div className="widget_content">
         
            <div>{"⌑ "}
              <a href="/tag/jekyll-guide/">
                  Xây dựng blog với Jekyll
              </a>       
            </div>
            <div>{"⌑ "}
              <a href="/tag/gatsby-guide/">
                  Xây dựng blog với GatsbyJs
              </a>       
            </div>
        </div>      

      </div>

    </div>
  )
}

export default sidebarr

