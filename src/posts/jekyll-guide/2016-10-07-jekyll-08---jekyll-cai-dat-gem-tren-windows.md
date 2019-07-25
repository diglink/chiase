---
title: '[Jekyll] Hướng dẫn cài đặt Gem trên Windows'
date: "2016-10-07T05:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn cài đặt Gem (các bộ thư viện được cộng đồng viết cho Ruby) trên Windows.
tag: ["Jekyll guide"]
textthumb: Jekyll Gem on Windows
---

Jekyll có một hệ thống plugin cho phép bạn tuỳ chỉnh để tạo ra nội dung cụ thể để trên trang web của bạn như phân trang, sơ đồ trang... Để bổ sung Plugin cho **Jekyll**, bạn cần phải cài **gem** (Gem là các bộ thư viện được cộng đồng viết cho Ruby)

Trước khi xem hướng dẫn bên dưới, có thể bạn nên xem [Cài đặt Jekyll trên Windows](/jekyll-cai-dat-tren-windows/), và để cài **gem** thì máy tính **_phải được kết nối Internet_**.

## Hướng dẫn cài đặt Gem trên Windows

### 1. Chỉnh sửa `Gemfile`

Tại thư mục gốc của Blog, mở file `Gemfile` và thêm dòng bên dưới vào file:

```
gem 'jekyll-paginate'
```

Sau đó lưu file này lại, lưu ý `jekyll-paginate` là tên của Plugin

### 2. Chỉnh sửa `_config.yml`

Thêm dòng khai báo tên Plugin này vào file `_config.yml` vào vị trí giống như:

```
gems:
  - jekyll-archives
  - jekyll-paginate
```

Lưu lại file này

### 3. Cài Gem

- Mở *command prompt* lên, dùng lệnh để vào thư mục của Blog, nếu bạn đang chạy lệnh `jekyll serve watch` thì dùng tổ hợp phím `Ctrl+C` để dừng lại.


- Chạy lệnh `gem install jekyll-paginate` (_jekyll-paginate_ là ví dụ), Chờ một vài giây gem này sẽ được cài

### 4. Xử lý lỗi

Trong quá trình cài **gem** có thể xảy ra lỗi như:

```
ERROR:  While executing gem ... (Encoding::ConverterNotFoundError)
    code converter not found (UTF-16LE to Windows-1258)
```

Thì chỉ cần chạy lệnh `chcp 850` >> rồi `gem install jekyll-paginate`