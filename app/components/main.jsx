import React from "react";
import "../styles/main.css";
import Timeline from "./timeline/Timeline.jsx";

export default function Main() {
    const composers = [
        {
            name: "Бах",
            birthYear: 1685,
            deathYear: 1750,
            birthDate: new Date(1685, 2, 31),
            deathDate: new Date(1750, 5, 28)
        },
        {
            name: "Жак Шампион де Шамбоньер",
            birthYear: 1602,
            deathYear: 1672
        },
        {
            name: "Жак Шампион де Шамбоньер2",
            birthYear: null,
            deathYear: 1672
        }
    ];

    const displaySettings = {
        succession: false,
        publications: true,
        lifetimes: true,
        historicalContext: false,
        genres: false
    };

    return (
        <main className="main">
            <Timeline composers={composers} displaySettings={displaySettings}/>
        </main>
    )
}