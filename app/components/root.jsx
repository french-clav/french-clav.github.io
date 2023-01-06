import React from "react"
import "../styles/root.css"
import Header from "./header.jsx"
import Footer from "./footer.jsx"
import Main from "./main.jsx"

export default function Root() {
    return (
        <div id="root">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
}