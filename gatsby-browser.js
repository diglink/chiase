/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { ThemeProvider } from "./src/context"

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>{element}</ThemeProvider>
)
const perlinNoise = require('https://cdn.commento.io/js/commento.js')

const insertJS = () => {
  const addJS = (src) => {
    const s = document.createElement(`script`)
    s.type = `text/javascript`
    s.src = src
    document.getElementsByTagName(`body`)[0].appendChild(s)
  }

  addJS(perlinNoise)
}

exports.onInitialClientRender = () => {
  insertJS()
}
