import React from "react"
import Header from "./header.jsx"
import Footer from "./footer.jsx"
import Main from "./main.jsx"
import "../styles/root.css"

export default function Root() {
    return (
        <div id="root">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
}