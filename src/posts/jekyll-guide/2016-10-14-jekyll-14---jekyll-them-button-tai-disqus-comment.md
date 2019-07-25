---
title: '[Jekyll] Hướng dẫn thêm button tải Disqus comment'
date: "2016-10-14T08:46:37.121Z"
category: ["Jekyll"]
description: Hướng dẫn thêm hệ thống bình luận Disqus vào Blog.
tag: ["Jekyll guide"]
postthumb: "https://lh5.ggpht.com/-uEVeI9D2-xI/XQs0gKJQxzI/AAAAAAAAV-I/5UWxIV0xP18W-tpuUbHkV9G823SNajWPwCKgBGAs/w150-e30/jekyll-14-chiase.web.app-0.png"
---

Để tăng tốc độ trang blog, mặc định bạn có thể không cho phép tải comment Disqus. Khi người đọc muốn comment chỉ cần click vào nút "Add/Load comments" (Thêm/tải comment) là hệ thống comment sẽ được tải về.  


###  Bước 1

Trong thư mục `_include` tạo file có tên `disqus_comments.html` với nội dung:

```html
<div id="disqus_thread">
  <a class="comment-btn" href="#" onclick="disqus();return false;" role="button" rel="nofollow">Add/Load Comments</a>
</div>
<script type="text/javascript">
	var disqus_shortname = "chiasewebapp";
	var disqus_loaded = false;
	function disqus() {
	   if (!disqus_loaded)  {
	       disqus_loaded = true;
	       var e = document.createElement("script");
	    e.type = "text/javascript";
	    e.async = true;
	    e.src = "//" + disqus_shortname + ".disqus.com/embed.js";
	    (document.getElementsByTagName("head")[0] ||
	     document.getElementsByTagName("body")[0])
	    .appendChild(e);
	  }
	}  
</script>
```

Chú ý thay `chiasewebapp` bằng tên trên Disqus (shortname), xem thêm cách đăng ký Disqus [hướng dẫn đăng ký Disqus](/2016/03/huong-dan-tich-hop-disqus-vao-blogger.html)

### Bước 2 

Trong thư mục `_layout`, mở file `posst.html` để chỉnh sửa. Phía dưới cùng thêm dòng bên dưới (vị trí có thể thay đổi tùy theo bố cục trang bài viết của blog):

```html
<center>{% include disqus_comments.html %}</center>
```

Xong, bạn có thể thêm/ chỉnh sửa CSS để trang trí cho button tải comment, hoặc sử dụng:

```css
.comment-btn {
    color: #fff;
    background-color: #9E9E9E;
    padding: 10px;
}
```

Lưu lại và xem kết quả
