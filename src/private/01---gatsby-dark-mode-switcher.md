---
title: "[Gatsby] Đổi nút darkmode"
date: "2019-07-012T23:12:03.284Z"
update: 
category: ["gatsby"]
tag: ["gatsby guide"]
description: "Đổi nút Darkmode cho chuyên nghiệp"
seoimage: ""
postthumb: 
---

Chỉnh sửa file:

```tl
// src/components/header/index.js
```
```
............
                </h1>
```                
```hl                
        <div class="headernav"> 
```
```
                <ThemeButton />
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
            <Link to="/tags/" className="page-link">Tag</Link>
            <Link to="/cats/" className="page-link">Category</Link>
            <Link to="/about/" className="page-link">About</Link>
```
```hl            
        </div>
```
```
      </nav>
      </div>
```      

### Style 1

```tl
// src/components/header/switchbutton.js
```
```
import React, { useContext } from "react"
import ThemeContext from "../../context"
const ThemeButton = () => {
    const { theme, switchTheme } = useContext(ThemeContext)
    return (
```
```hl      
    <button onClick={switchTheme} className="switchtheme">
            <i className="dark mode" title="Switch to dark mode" style={theme === "dark" ? { display: 'none' } : {display: 'inherit' }} ></i>
            <i className="light mode" title="Switch to light mode" style={theme === "light" ? { display: 'none' } : { display: 'inherit' }}></i>

        </button>
```
```
    )
}

export default ThemeButton
```

```tl
// src/components/layout/theme.css
```
```
.......
*{padding:0;margin:0;outline:0;border:0 none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
```
```hl
.headernav { float: right;}
.switchtheme {background: none;margin-right: 30px;margin-top: 12px;float: left;}
.dark-mode{width:66px;text-align:center;margin:0 auto}
.mode{position:relative;float:right;outline:0;border:0;padding:0;overflow:hidden;cursor:pointer}
.mode::before,.light.mode::after{background:yellow}
.mode::before,.mode::after{position:absolute;content:''}
.mode,.mode::before,.mode::after{border-radius:50%}
.light.mode{top:2px;left:-2px;overflow:visible}
.light.mode,.light.mode::before{border-radius:0}
.mode,.light.mode::before,.mode::after{background:#999}
.mode{width:20px;height:20px;transition: none}
.light.mode,.mode::before,.mode::after{width:16px;height:16px;transition: none}
.mode::before{top:2px;left:2px}
.light.mode::before{top:0;left:0;transform:rotate(44deg)}
.mode::after{top:-3px;left:7px}
.light.mode::after{top:1px;left:1px;width:14px;height:14px}
```
```
.site-nav{float:right;line-height:45px}
.....
```

### Style 2

```tl
// src/components/header/switchbutton.js
```
```
import React, { useContext } from "react"
import ThemeContext from "../../context"
const ThemeButton = () => {
    const { theme, switchTheme } = useContext(ThemeContext)
    return (
```
```hl      
<div class="switchmode" onClick={switchTheme}>
<div class={theme === "dark" ? "lighttoggle" : "darktoggle"}></div>
<svg viewBox="0 0 512 512" focusable="false" role="img" fill="currentColor" class="lightmode switcher">
<title>Light Mode</title>
<path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>
</svg>
<svg viewBox="0 0 512 512" focusable="false" role="img" fill="currentColor" class="darkmode switcher">
<title>Dark Mode</title>
<path fill="currentColor" d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
</svg>
</div>
```
```
    )
}

export default ThemeButton
```

```tl
// src/components/layout/theme.css
```
```
.......
*{padding:0;margin:0;outline:0;border:0 none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
```
```hl
.headernav{float:right}
.switchmode{position:relative;display:flex;align-items:center;justify-content:space-between;width:calc(2.2em);height:1em;background:rgba(255,255,255,0.3) none repeat scroll 0% 0%;border-radius:calc(0.5em);float:left;margin-right:30px;margin-top:13px;cursor:pointer}
.darktoggle{background:white none repeat scroll 0% 0%;position:absolute;width:calc(0.8em);height:calc(0.9em); margin-left: 1.5px;border-radius:50%;transition:all 0.3s ease 0s}
.lighttoggle{background:white none repeat scroll 0% 0%;position:absolute;width:calc(0.9em);height:calc(0.9em);margin-left: 1px;border-radius:50%;transition:all 0.3s ease 0s;transform:translateX(calc(1.2em))}
.switcher{display:inline-block;vertical-align:-0.125em;overflow:hidden}
.lightmode{padding:0.1em;box-sizing:border-box;color:rgb(255,255,0);width:1em;overflow:visible}
.darkmode{padding:0.1em;box-sizing:border-box;color:rgb(255,255,0);width:1em;overflow:visible}
```
```
.site-nav{float:right;line-height:45px}
.....
```