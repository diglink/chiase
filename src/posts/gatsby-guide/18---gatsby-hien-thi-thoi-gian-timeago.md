---
title: "[Gatsby] Hiển thị thời gian kiểu time ago"
date: "2019-07-01T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: "Hướng dẫn hiển thị thời gian kiểu time ago cho GatsbyJs"
seoimage: ""
postthumb: 
textthumb: TimeAgo
---

Tạo file mới `src/templates/components/timeago.js` có nội dung:

```
/* https://stackoverflow.com/a/6109105 */
export default function timeago(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
}
```

### Chỉnh sửa template

Chỉnh sửa template muốn hiển thị thời gian kiểu time ago, ví dụ `blog-post.js`:

```tl
// src/temlates//blog-post.js`
```
```
...
import PropTypes from 'prop-types'
```
```hl
import timeago from './components/timeago';
```
```

export default function Template({ data, pageContext }) {
    const { markdownRemark: post } = data
    const siteUrl=data.site.siteMetadata.siteUrl
```
```hl    
    const time = new Date(post.frontmatter.date)
    const currentDate = new Date();
```
```
    return (
        <>
        ......
                <div className="blogpostinfo">
```
```hl                
                <span className="date">{ timeago(currentDate, time) }</span>
```                
```
		......
```		

- Chỉnh sửa template `blog-list.js`:

```tl
// src/temlates//blog-post.js`
```
```
......
import slug from "slug";
```
```hl
import timeago from './components/timeago';
```
```

const BlogPage = ({ data, pageContext }) => {
......
              <div className="postinfo">
```
```hl
                <span className="date">{ timeago(new Date, new Date(post.node.frontmatter.date)) }</span>
```
```                
{/*  delete this line    <div className="posttime">{post.node.frontmatter.date}</div> */}
              {post.node.frontmatter.category ? (
           ...........
```           