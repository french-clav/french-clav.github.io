import React from "react";
import Repository from "../data/respository.js";
import "../styles/main.css";
import Timeline from "./timeline/Timeline.jsx";

export default function Main() {
    const composers = Repository.getComposers();

    const displaySettings = {
        succession: false,
        publications: true,
        lifetimes: true,
        historicalContext: false,
        genres: false
    };

    return (
        <main className="main">
            <Timeline composers={composers} displaySettings={displaySettings} />
        </main>
    )
}