---
title: "Generate random color"
date: "2019-07-015T23:12:03.284Z"
update: 
category: ["Web development"]
tag: ["color"]
description: "Generate random dark color"
seoimage: ""
postthumb: 
---

### Using randomDarkColor.js 

https://gist.github.com/Chak10/dc24c61c9bf2f651cb6d290eeef864c1

```
function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}
```

### Using getRandomDarkHSLColor.js

https://gist.github.com/lvnam96/d341d3885244c285efc7590b7d9c107b

```

const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360),
          s = Math.floor(Math.random() * 100) + '%',
          l = Math.floor(Math.random() * 60) + '%';// max value of l is 100, but I set to 60 cause I want to generate dark colors
                                                   // (use for background with white/light font color)
    return `hsl(${h},${s},${l})`;
};
```

Ex:
```
<div className="post-list__thumbnail" style={{background: 'hsl('+Math.floor(Math.random() * 360)+','+Math.floor(Math.random() * 100) + '%,'+Math.floor(Math.random() * 60) + '%)', color: 'white'}}><span>{node.frontmatter.textthumb}</span></div>
```

### Generate color

```
<div className="post-list__thumbnail" style={{background: '#'+((1<<24)*(Math.random()+1)|0).toString(16).substr(1), color: 'white'}}><span>{post.node.frontmatter.textthumb}</span></div>
```