import React, { useState } from "react"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Main from "./Main.jsx"
import Repository from "../data/respository.js"
import "../styles/root.css"
import useDisplaySettings from "../hooks/useDisplaySettings.js"

export default function Root() {
    const composers = Repository.composers;
    const [displaySettings, setDisplaySettings] = useDisplaySettings();

    return (
        <div id="root">
            <Header />
            <Main composers={composers} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            <Footer />
        </div>
    )
}