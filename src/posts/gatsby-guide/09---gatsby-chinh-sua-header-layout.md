---
title: '[Gatsby] Chỉnh sửa header và layout mặc định'
date: "2019-05-17T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn chỉnh sửa Header và layout của giao diện Gatsby mặc định.
textthumb: Header
---

## Chỉnh sửa Header

Xóa file `src\components\header.js`, tạo file mới `src\components\header\index.js` có nội dung:

```
import React from "react"
import { Link } from "gatsby"
import * as PropTypes from "prop-types"
import style from "./header.module.css"

const Header = ({ siteTitle, siteDescription }) => {
    return (
        <header className={style.header}>
            <div className={style.div}>
                <h1 className={style.h1}>
                    <Link to="/" className={style.Link}>
                        {siteTitle}
                    </Link>
                </h1>
                <nav class="site-nav">
        <input type="checkbox" id="nav-trigger" class="nav-trigger" />
        <label for="nav-trigger">
          <span class="menu-icon">
            <svg viewBox="0 0 18 15" width="18px" height="15px">
              <path d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z"></path>
            </svg>
          </span>
        </label>

        <div class="trigger">
        	<Link to="/cats/" className="page-link">Category</Link>
        	<Link to="/tags/" className="page-link">Tag</Link>
        	<Link to="/about/" className="page-link">About</Link>
            
        </div>

      </nav>
                <br />
                <i>{siteDescription}</i>
            </div>
        </header>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
    siteDescription: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
    siteDescription: ``,
}

export default Header
```

và file `src\components\header\header.module.css` có nội dung:

```
.header {
    margin-bottom: 1.45rem;
    padding: 5px;
    overflow: hidden;
    background: var(--widgetbg);
    /* position: relative; */
    z-index: 5;
    border-bottom: var(--border-bottom);
}

.div {
    margin: 0 auto;
    max-width: 800px;
    padding: 1.45rem 1.0875rem;
}

.h1 {
    display: inline-block;
    margin: 0;
}

.Link {
    font-weight: 700;
    text-decoration: none;
}
```

## Chỉnh sửa Layout

Xóa file `src\components\layout.js`, tạo file mới `src\components\layout\index.js` có nội dung: 

```
import React from "react"
import * as PropTypes from "prop-types"
import { StaticQuery, Link, graphql } from "gatsby"

import Header from "../header"
import style from "./layout.module.css"
import "./theme.css"
//import Sidebar from "./sidebar";

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            {
                site {
                    siteMetadata {
                        title
                        description
                    }
                },
                topics: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                category
                tag
              }
            }
          }
        }

            }
        `}
        render={data => (
            <>
                <Header
                    siteTitle={data.site.siteMetadata.title}
                    siteDescription={data.site.siteMetadata.description}
                />
                <div className={style.div}>
                    <div className= {style.mainwrapper}>{children}</div>

                 {/* <div className={style.sidebar}>
                   <Sidebar      
                edges={data.topics.edges}
              />
                  </div> */}

                 <div class="clear" />   
				<footer className={style.footer}>
                © {new Date().getFullYear()} by <Link to="/">
                        {data.site.siteMetadata.title}
                    </Link>, Built with
                {` `}
                <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">Gatsby</a>, Hosted by
                {` `}
                <a href="https://web.app" target="_blank" rel="noopener noreferrer">Firebase</a>
              </footer>
                </div>

            </>
        )}
    />
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
```

Tạo file mới `src\components\layout\layout.module.css` có nội dung: 

```
.div {
    margin: 0 auto;
    max-width: 800px;
    padding: 0 0.5rem 1.45rem;
}
.mainwrapper {
    border-radius: 5px;
    position: relative;

}

.footer {
	border-top: var(--border-bottom);
	margin-top: 5px;
	padding-top: 10px;
	text-align: center;
	font-size: 0.9rem;
}
```

Tạo file mới `src\components\layout\theme.css` có nội dung: 

```
p,div{color:var(--textNormal)}
h1{color:var(--textTitle)}
h2,h3,h4,h5,h6{color:var(--header);font-weight:600}
body{background:var(--bg);margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:Segoe ui,Arial,sans-serif;font-size:1em}
a{color:var(--textLink)}
a:hover{color:var(--textLinkHover)}
b,strong{color:var(--textBold)}
hr{border:none;margin:10px 0;height:1px;background-color:var(--hr);color:var(--hr)}
body *{-webkit-transition:color .2 linear,background-color .2s linear;transition:color .2s linear,background-color .2s linear}
html{line-height:1.4;-webkit-text-size-adjust:100%;font-size:18px}
body{margin:0}
h1{font-size:1.8em;margin:0.4em 0;font-weight:600;line-height:1.3}
a{background-color:transparent;text-decoration:none;-webkit-text-decoration-skip:objects}
abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}
b,strong{font-weight:bolder}
pre,code,kbd,samp{font-family:consolas,monospace;;font-size:0.9em}
small{font-size:80%}
sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}
sub{bottom:-0.25em}
sup{top:-0.5em}
img{border-style:none;display:block;max-width:100%;height:auto;margin:auto}
button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.3;margin:0}
button,input{overflow:visible}
button,select{text-transform:none}
button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}
button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}
button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}
fieldset{padding:0.35em 0.75em 0.625em}
legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}
progress{vertical-align:baseline}
textarea{overflow:auto}
[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}
[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}
[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}
[type="search"]::-webkit-search-decoration{-webkit-appearance:none}
::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}
details{display:block}
summary{display:list-item}
template{display:none}
[hidden]{display:none}
table,img{max-width:100%;height:auto;display:block}
ul,li{list-style:none}
*{padding:0;margin:0;outline:0;border:0 none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
.site-nav{float:right;line-height:54px}
.site-nav .nav-trigger{display:none}
.site-nav .menu-icon{display:none}
.site-nav .page-link{line-height:1.5}
.site-nav .page-link:not(:last-child){margin-right:20px}
@media screen and (max-width:600px){.site-nav{position:absolute;top:30px;right:10px;background-color:#fdfdfd;border:1px solid #e8e8e8;border-radius:5px;text-align:right}.site-nav label[for="nav-trigger"]{display:block;float:right;width:36px;height:36px;z-index:2;cursor:pointer}.site-nav .menu-icon{display:block;float:right;width:36px;height:26px;line-height:0;padding-top:10px;text-align:center}.site-nav .menu-icon > svg{fill:#424242}.site-nav input ~ .trigger{clear:both;display:none}.site-nav input:checked ~ .trigger{display:block;padding-bottom:5px}.site-nav .page-link{display:block;padding:5px 10px;margin-left:20px}.site-nav .page-link:not(:last-child){margin-right:0}}
.sidebarwidget{padding:10px;border-radius:5px}
.clear{clear:both}
.post_content p{padding:0.25em 0}
.post_content a{color:hsl(161,100%,27%);font-weight:600}
.post_content h2{padding-top:10px}
.post_content ul {padding-left: 40px;margin: 10px 0;}
.post_content ul li {list-style: disc;}
.post-list__item{padding:1rem;box-shadow:rgba(46,41,51,0.08) 0 1px 2px,rgba(71,63,79,0.08) 0 2px 4px;background:var(--postbg);border-radius:4px;border:0 none;margin-bottom:1.5rem;transition:transform 250ms cubic-bezier(0.4,0,0.2,1) 0s,box-shadow 250ms cubic-bezier(0.4,0,0.2,1) 0s,padding 250ms cubic-bezier(0.4,0,0.2,1) 0s}
.post-list__item:hover{-webkit-transform:translateY(-0.25rem);-ms-transform:translateY(-0.25rem);transform:translateY(-0.25rem);box-shadow:0px 4px 8px rgba(46,41,51,0.08),0px 8px 16px rgba(71,63,79,0.16);}
.post-list__content{display:flex;flex-direction:row;justify-content:space-between;position:relative;padding-bottom:15px}
.postinfo{display:flex;flex-direction:column;font-size:0.9em}
.posttime{min-width:110px;font-family:consolas,monospace;text-align:right;display:inline-block}
.cats-container{float:left;padding-top:10px}
.catname{display:block;padding:8px;margin-left:0;float:right;border-radius:3px;font-weight:600;text-transform:capitalize}
.catname.blogger{background:#f83}
.catname.gatsby{background:#623294}
.catname.jekyll{background:#323232}
.catname.blogger,.catname.gatsby a,.catname.jekyll a{color:#fff}
h2.post_title{line-height:1.5rem;margin-bottom:10px}
h2.post_title a{font-size:1.2rem;font-weight:600}
.page-navigation{text-align:center;margin:15px}
.page-navigation a{border:var(--border-bottom);padding:5px 10px;margin:0 5px;border-radius:8px}
pre{background:var(--codebg);margin:10px 0 10px 10px;padding:10px;border-radius:5px;white-space:pre-wrap;max-height:300px;overflow:auto}
:not(pre) > code{background:var(--codebg);color:var(--textNormal);padding:3px 5px;border-radius:4px}
.post_inner{display:flex;position:relative;overflow:hidden}
.post-list__thumbnail{width:90px;min-width:90px;margin-right:10px}
.postinfo .taglist{text-align: right;}
.tagname{margin:0 5px;border-bottom:dashed 1px;display: inline-block;}
.blogpostinfo{text-align:center;margin:10px 0}
#breadcrumbs li{display:inline-block;padding-left:5px}
.sharebox{text-align:center}
.sharebox a{margin:0 5px;border-bottom:dashed 1px}

@media screen and (max-width:600px){html{font-size:16px}.post-list__content{flex-direction:column-reverse}.post-list__thumbnail{width:50px;min-width:50px}.postinfo{flex-direction:row}.posttime{min-width: auto;}.cats-container{padding-top:0}.catname{padding:1px 5px;margin-left:10px;font-weight:normal}.tags-container {margin-left: 10px;margin-top: -2px;}.post_inner {margin-top: 10px;}}
@media screen and (max-width:450px){h2.post_title {margin-bottom: 0;}.post_description{display:none;}}
```

Chú ý là trong file `theme.css` có nhiều css sử dụng biến (variable) để dễ dàng thay đổi giao diện và phục vụ việc thiết lập giao diện Dark mode của mình (sẽ được giới thiệu ở các bài sau).