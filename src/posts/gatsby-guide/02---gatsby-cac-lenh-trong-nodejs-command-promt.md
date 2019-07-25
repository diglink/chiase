---
title: "[Gatsby] Các lệnh thường sử dụng Nodejs command promt để xây dựng Blog"
date: "2019-05-11T23:16:37.121Z"
category: ["gatsby"]
description: Hướng dẫn dùng lệnh trong Nodejs command promt để cài đặt plugin và xây dựng GatsbyJs Blog.
tag: ["gatsby guide", "gatsby plugin"]
textthumb: Command

---

## Các lệnh thường dùng để xem trước hay phát triển Blog

CLI của Gatsby có một số câu lệnh để làm dự án. Khi chạy `gatsby new blog` một số câu lệnh sẽ được đặt trong file `package.json`. Chúng ta hãy check content của nó. Để ý kĩ mục `scripts`

![scripts](https://lh5.ggpht.com/-zvHxFFLFUlE/XQGAQcBbneI/AAAAAAAAV44/Bel2ZLfHQzUMS2UxzxISd3MQy3i5wjn9QCKgBGAs/s1600-e30/gatsby-02-01-chiase.web.app.png)

Để chạy các câu lệnh ở đây, bạn cần chạy `yarn run tên_câu_lệnh`. Chúng ta sẽ thử chạy câu lệnh `yarn run develop` xem sao.

![develop](https://lh5.ggpht.com/-s1J0vAXDHoQ/XQGAQSVDukI/AAAAAAAAV44/vTIXgiaNXusBQ45H6YmI4MVU125Okz-AACKgBGAs/s1600-e30/gatsby-02-02-chiase.web.app.png.png)

Bây giờ, nếu bạn mở `locahost:8000` ở trong trình duyệt, bạn sẽ nhìn thấy phiên bản phát triển của trang web. Gatsby cũng sử dụng hot reload giống create-react-app, tức là khi bạn chỉnh sửa code, bản phát triển này sẽ tự chạy lại phiên bản mới.

Sau khi phát triển xong, mình có thể chạy câu lệnh `yarn run build` để tạo ra phiên bản hoàn thiện. 

![build](https://lh5.ggpht.com/-ZMA0Ob5CmQI/XQGAQeGaP_I/AAAAAAAAV44/97FSUoQyZCA5lAd3D62o5vpCZJTmQdCswCKgBGAs/s1600-e30/gatsby-02-03-chiase.web.app.png.png)

Lúc này, Gatsby sẽ bundle code nằm trong `src` của bạn thành các file HTML, CSS, JS và đưa nó vào trong thư mục `public`, trông nó như thế này:

![public](https://lh5.ggpht.com/-YY9DH6lebpM/XQGAQb2rK_I/AAAAAAAAV44/rTF2ts2fBD8Wlhpsxy_mlJ3GG3vqQ460wCKgBGAs/s1600-e30/gatsby-02-04-chiase.web.app.png.png)

Bạn sẽ không cần quan tâm nội dung của các file/folder này làm gì, bạn chỉ cần đưa nó lên hosting là được.

Okay, cuối cùng có một câu lệnh nữa là `serve`. Sau khi bạn build xong, câu lệnh này sẽ đưa thư mục `public` đến `localhost:9000`. Bạn sẽ xem được sản phẩm của mình trông chính xác như thế nào khi đưa lên hosting.


## Dùng lệnh để cài đặt Plugin

Trong quá trình xây dựng Blog, chúng ta cần thêm vào một số plugin để phát triển tính năng cũng như giao diện của Blog, sử dụng lệnh sau:

```
yarn add gatsby-plugin-name
```
*Nguồn: Aldermann Blog*.
