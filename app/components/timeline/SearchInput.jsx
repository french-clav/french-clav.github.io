import React, { useState } from "react"
import "../../styles/timeline/searchInput.css"
import classNames from "../../util/classNames.js"
import SearchIcon from "./SearchIcon.jsx"

export default function SearchInput({ query, setQuery }) {
    const [focused, setFocused] = useState(false)

    return (
        <div
            className={classNames({
                "search-input-container": true,
                "search-input-container-focused": focused
            })}
        >
            <SearchIcon />
            <input
                type="search"
                placeholder="Поиск"
                className="search-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    )
}