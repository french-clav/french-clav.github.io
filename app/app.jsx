import React from "react"
import * as ReactDOM from "react-dom/client"
import Root from "./components/Root.jsx"

import "./styles/fonts.css"
import "./styles/basic.css"
import "./styles/scrollbars.css"

ReactDOM.createRoot(
    document.getElementById("app")
).render(
    <Root/>
)