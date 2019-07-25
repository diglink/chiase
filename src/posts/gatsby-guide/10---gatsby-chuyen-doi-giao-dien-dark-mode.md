---
title: '[Gatsby] Chuyển đổi giao diện Darkmode'
date: "2019-05-18T23:12:03.284Z"
category: ["gatsby"]
tag: ["gatsby guide"]
description: Thêm nút chuyển đổi qua lại giữa chế độ xem thường và Darkmode.
textthumb: Darkmode
---

Thêm file mới `./src/components/header/switchbutton.js`:

```
import React, { useContext } from "react"
import ThemeContext from "../../context"
import style from "./header.module.css"
const ThemeButton = () => {
    const { theme, switchTheme } = useContext(ThemeContext)
    return (
        <label onClick={switchTheme} className={style.switchtheme}>
            <span style={theme === "dark" ? { display: 'none' } : {display: 'inherit' }} >☾</span>
            <span style={theme === "light" ? { display: 'none' } : { display: 'inherit' }}>☀</span>

        </label>
    )
}

export default ThemeButton

```

- Thêm vào file `./src/components/header/header.module.css`:

```
.switchtheme {
    margin-left: 10px;
}
```
- Thêm nội dung vào file `./src/components/header/index.js`:

```tl
// src/components/header/index.js
```
```
import React from "react"
import { Link } from "gatsby"
import * as PropTypes from "prop-types"
import style from "./header.module.css"
```
```hl
import ThemeButton from "./switchbutton.js"
```
```
const Header = ({ siteTitle, siteDescription }) => {
    return (
        <header className={style.header}>
            <div className={style.div}>
                <h1 className={style.h1}>
                    <Link to="/" className={style.Link}>
                        {siteTitle}
                    </Link>
                </h1>
```
```hl
                <ThemeButton />
```
```                
                <nav class="site-nav">
```

Thêm file mới `.src/context.js`:

```
import React from "react"

const ThemeContext = React.createContext({
    theme: "light",
    switchTheme: () => {
        console.log("default")
    },
})

class ThemeProvider extends React.Component {
    state = {
        theme: "light",
    }

    switchTheme = () => {
        const theme = this.state.theme === "light" ? "dark" : "light"
        localStorage.setItem("theme", theme)
        document.body.className = `switch ${theme}`
        setTimeout(() => (document.body.className = theme), 300)
        this.setState({ theme })
    }

    componentDidMount() {
        const theme = localStorage.getItem("theme") || "light"
        this.setState({ theme })
        document.body.className = theme
    }

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state.theme,
                    switchTheme: this.switchTheme,
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContext

export { ThemeProvider }
```

Mở file `gatsby-browser.js`, thêm vào:

```tl
// gatsby-browser.js
```
```
import React from "react"
import { ThemeProvider } from "./src/context"

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>{element}</ThemeProvider>
)
```