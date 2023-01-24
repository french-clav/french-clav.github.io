import React from "react"
import Repository from "../../data/respository.js"
import "../../styles/timeline/historicalContextRow.css"
import HistoricalEpochCard from "./HistoricalEpochCard.jsx"

export default function HistoricalContextRow({ range }) {
    const epochs = Repository.historicalEpochs

    return (
        <div className="historical-context-row relative">
            {epochs.map(e => (
                <HistoricalEpochCard key={e.name} epoch={e} range={range} />
            ))}
        </div>
    )
}