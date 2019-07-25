---
title: "[Gatsby] Chia sẻ bài viết lên mạng xã hội"
date: "2019-05-23T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn tạo các nút chia sẻ bài viết lên mạng xã hội.
seoimage: ""
textthumb: Share Post
---

Mở file `.src/templates/blog-post.js` sửa và thêm:

```tl
src/templates/blog-post.js
```
```
export default function Template({ data, pageContext }) {
    const { markdownRemark: post } = data
    const time = new Date(post.frontmatter.date)
```
```hl    
    const siteUrl=data.site.siteMetadata.siteUrl
```
```    
    return (
        .............

```
```hl
                <div className="sharebox">Share this: 
                  <a class="facebook" href={`//www.facebook.com/sharer.php?u=`+siteUrl+post.fields.slug} target="_blank" rel="noopener noreferrer">Facebook</a>
                  <a class="twitter" href={`//twitter.com/share?url=`+siteUrl+post.fields.slug} target="_blank" rel="noopener noreferrer">Twitter</a>   
                  <a class="linkedin" href={`//www.linkedin.com/shareArticle?mini=true&url=` + siteUrl+post.fields.slug + `&title=` + post.frontmatter.title + `&summary=` + post.frontmatter.description} target="_blank" rel="noopener noreferrer">Linkedin</a> 
                  <a class="whatsapp" data-action="share/whatsapp/share" href={`whatsapp://send?text=` + post.frontmatter.title + ` - ` + siteUrl+post.fields.slug} target="_blank" rel="noopener noreferrer">Whatsapp</a>   
                </div>  
```
```
                <hr />
                <NavBar newer={pageContext.newer} older={pageContext.older} />
            </Layout>
        </>
    )
}
export const query = graphql`

      .........

      siteMetadata {
        title
        author            
```            
```hl
        siteUrl
```
```        
      }
    }
    }
`
```