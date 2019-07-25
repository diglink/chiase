---
title: "[Gatsby] Thêm thông tin cuối bài viết"
date: "2019-05-22T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn thêm thời gian post bài, các thẻ liên quan tới bài viết.
seoimage: ""
textthumb: Post info
---

Mở file `.src/templates/blog-post.js` sửa và thêm:

 ```tl
 // src/templates/blog-post.js
 ```
 ```
 ...........
 export default function Template({ data, pageContext }) {
    const { markdownRemark: post } = data
```
```hl    
    const time = new Date(post.frontmatter.date)
```
```    
    return (
        <>
            <Layout>

            ...........

                <h1>{post.frontmatter.title}</h1>               
                <div class="post_content">               
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
```
```hl                
                <div className="blogpostinfo">
                    <div className="postdate">Published on {time.toDateString()}</div>
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
```
```                
                <hr />
                <NavBar newer={pageContext.newer} older={pageContext.older} />
                .........
```                