import React from "react"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Main from "./Main.jsx"
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