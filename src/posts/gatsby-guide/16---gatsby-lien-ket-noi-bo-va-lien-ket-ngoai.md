---
title: "[Gatsby] Liên kết nội bộ và liên kết ngoài"
date: "2019-05-24T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby plugin"]
description: "Giới thiệu về plugin gatsby-plugin-catch-links và gatsby-remark-external-links"
seoimage: ""
textthumb: Links
---

### Gatsby-plugin-catch-links

GatsbyJS sử dụng Link component thay vì thẻ a. Việc sử dụng component này giúp bạn di chuyển giữa các trang thuộc trang web mà không cần phải reload lại trình duyệt, chỉ load những phần tử cần thiết để tăng tốc độ tải trang.

Tuy nhiên, bạn sẽ không thể sử dụng Link component trong file Markdown được. Do đó, plugin này sẽ làm nhiệm vụ tự động tìm kiếm những link nội bộ trong file Markdown và giúp chúng hoạt động tương tự như khi bạn sử dụng Link component vậy.

Xem thêm [gatsby-plugin-catch-links](https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/).

### Gatsby-remark-external-links

Khi soạn và chỉnh sửa bài viết Markdown, bạn sẽ không thể thêm thuộc tính để mở các liên kết ngoài ở một thẻ (tab) mới. Plugin gatsby-remark-external-links sẽ giúp ta nhận dạng các liên kết ngoài và mở chúng trong thẻ mới.

Xem thêm [gatsby-remark-external-links](https://www.gatsbyjs.org/packages/gatsby-remark-external-links/)

### Cài đặt

Mở file `gatsby-config.js`, thay thế:

```
`gatsby-transformer-remark`,
```

bằng:

```
	{
		resolve: `gatsby-transformer-remark`,
		options: {
		  plugins: [
			{
			  resolve: `gatsby-remark-images`,
			  options: {
        maxWidth: 800,
        linkImagesToOriginal: true,
        },
			},
		  ],
      plugins: [
      {
        resolve: "gatsby-remark-external-links",
      }
      ],
		},
	  },
    `gatsby-plugin-catch-links`,
```    

Sau đó chạy lệnh:


```
yarn add gatsby-remark-external-links
```

<br />

```
yarn add gatsby-plugin-catch-links
```

Done!