---
title: '[Gatsby] Phân trang cho trang chủ (Bloglist template)'
date: "2019-05-13T10:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Hướng dẫn tạo phân trang cho template hiển thị danh sách bài viết.
textthumb: Paginate
---

-Trước khi thực hiện theo hướng dẫn này, khuyến cáo các bạn xem bài viết [Tạo trang hiển thị danh sách bài viết](/gatsby-hien-thi-danh-sach-bai-viet-bloglist-template/).

### Chỉnh sửa file `src/templates/bloglist.js`

-Sửa `const BlogPage = ({ data }) => {` thành `const BlogPage = ({ data, pageContext }) => {`

-Phía dưới code `const posts = data.allMarkdownRemark.edges;` thêm:

```
  const { currentPage, numPages } = pageContext;
  const pathPrefix = '';
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `${pathPrefix}/`
      : `${pathPrefix}/${(currentPage - 1).toString()}`;
  const nextPage = `${pathPrefix}/${(currentPage + 1).toString()}`;
```

-Hiển thị phân trang ở cuối danh sách bài viết, có 2 lựa chọn:

* Hiển thị Next và Previous, thêm trước `</Layout>`:

```
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
```      

* Hiển thị dạng số, thêm trước `</Layout>`:

```
{Array.from({ length: numPages }, (_, i) => (
        <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`}>
          {i + 1}
        </Link>
      ))}
```      