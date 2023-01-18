import React from "react"
import "../styles/noDataPlaceholder.css"

export default function NoDataPlaceholder() {
    return (
        <div className="relative zero-pos xy-centerer">
            <div className="no-data-placeholder prevent-select">Выберете параметры для отображения</div>
        </div>
    )
}