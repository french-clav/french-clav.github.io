import React from "react"
import Publication from "./Publication.jsx";

export default function Publications({ composer, selectedPublication }) {
    return (
        <>
            <h2>Издания нот</h2>
            <ul>
                {composer.publications.map(p => (
                    <Publication key={p.timestamp} publication={p} isSelected={p == selectedPublication} />
                ))}
            </ul>
        </>
    );
}