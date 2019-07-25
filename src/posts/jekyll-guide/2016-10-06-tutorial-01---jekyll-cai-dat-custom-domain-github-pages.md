---
title: 'Hướng dẫn cài đặt custom domain cho Github page'
date: "2016-10-06T05:46:37.121Z"
category: ["tutorial"]
description: Hướng dẫn cài đặt tên miền riêng cho trang Github.
tag: ["domain", "github"]
textthumb: Custom Github Domain
---

Bạn đã xây dựng được một trang Github với Jekyll, việc tiếp theo bạn muốn cài đặt một tên miền riêng (custon domain) cho nó thì bạn làm theo hướng dẫn dưới đây:

## Bước 1: Tạo file CNAME trong repository

- Sau khi đăng nhập và **Github**, chọn **repository** cần cài đặt tên miền riêng

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-JzzQT_1D-Z8/XQs0lMYs0sI/AAAAAAAAV-Q/UQbio23A6QUKQm5nn4lUAVNe3em10T2iACKgBGAs/s1600-e30/jekyll-06-chiase.web.app-1.png)

- Click chọn **Create new file**

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-b2Io86tFecM/XQs0lMo2X0I/AAAAAAAAV-Q/IfoGF1WPgaMCAf4wIViuBhoVEyxop0NmQCKgBGAs/s1600-e30/jekyll-06-chiase.web.app-2.png)

- Đặt tên file là *CNAME* và nhập tên miền vào nội dung của file. Sau đó click chọn **commit new file**

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-3vFhvJxOoAs/XQs0lHZE1hI/AAAAAAAAV-Q/BH-QOS-UJsEb2-3ExlqrCzblve0n-_rZwCKgBGAs/s1600-e30/jekyll-06-chiase.web.app-3.png)

- Click chọn **Setting**

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-6315P0JWrrc/XQs0lHT7CpI/AAAAAAAAV-Q/WACfl3UR90oi_C1W9k1tKWW90fDxr2otQCKgBGAs/s1600-e30/jekyll-06-chiase.web.app-4.png)

- Kéo xuống dưới mục **Github pages** bạn sẽ nhìn thấy tên miền đã được thêm vào từ file *CNAME*

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-2-ShjZkF0go/XQs0lAuoh6I/AAAAAAAAV-Q/3j2Xdyz0T90knDunQ_7aXuo2RrgbKJxBQCKgBGAs/s1600-e30/jekyll-06-chiase.web.app-5.png)

## Bước 2: Tạo các bản ghi (Record) cho tên miền

Tùy thuộc vào các nhà cung cấp tên miền mà các bước cài đặt có thể không giống nhau, nhưng nội dung sẽ là tương tự, trong bài viết này mình lấy ví dụ nhà cung cấp tên miền là [Uniregistry](https://uniregistry.com/) 

- Truy cập vào phần quản lý domain, và click chọn thẻ **NS / DNS Records** >> Click chọn **NEW RECORD**

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-fLDFs3pAm8s/XQs0lMYASXI/AAAAAAAAV-Q/eGT3fNI56L0ZjSrDrkGSyC2DxLOFRTU8gCKgBGAs/s1600-e30/jekyll-06-chiase.web.app-6.png)

- Đây là 3 bản ghi (Record) cần để thiết lập: 

	\#1. Một bản cho @ để trỏ đến 192.30.252.153  
	\#2. Một bản cho @ để trỏ đến 192.30.252.154  
	\#3. Một bản ghi CNAME cho www trỏ đến trang **Github** của bạn (username.github.io) (username là tên tài khoản [Github](https://github.com)):

- Sau khi đã nhập đầy đủ các bản ghi, click chọn **SAVE CHANGES**

![Hướng dẫn cài đặt tên miền cho trang Github](https://lh5.ggpht.com/-_wnkKvUBEs4/XQs0lLW8E5I/AAAAAAAAV-Q/LpgeDhc95no6wmNq9oyUT4WotU7QmY1UQCKgBGAs/s1600-e30/jekyll-06-chiase.web.app-7.png)

## Kết luận

Sau khi đã cài đặt xong, bạn có thể truy cập vào tên miền mới để vào Blog, tuy nhiên cũng có thể bạn sẽ phải chờ một thời gian thì mới có thể vào được, tùy thuộc vào nhà cung cấp tên miền.
