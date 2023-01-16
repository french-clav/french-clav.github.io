import React, { useState } from "react"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Main from "./Main.jsx"
import Repository from "../data/respository.js"
import "../styles/root.css"

const defaultDisplaySettings = {
    succession: false,
    publications: true,
    lifetimes: true,
    historicalContext: false,
    genres: false
}

export default function Root() {
    const composers = Repository.composers;
    const [displaySettings, setDisplaySettings] = useState(defaultDisplaySettings);

    return (
        <div id="root">
            <Header />
            <Main composers={composers} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            <Footer />
        </div>
    )
}