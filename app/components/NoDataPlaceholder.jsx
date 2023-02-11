import React from "react"
import "../styles/noDataPlaceholder.css"

export default function NoDataPlaceholder() {
    return (
        <div className="relative zero-pos xy-centerer pointer-transparent">
            <div className="no-data-placeholder">Выберете параметры для отображения</div>
        </div>
    )
}