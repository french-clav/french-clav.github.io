import React, { useEffect, useRef } from "react"

export default function Publication({ publication, isSelected }) {
    const ref = useRef()

    useEffect(() => {
        if (isSelected) {
            const interval = setTimeout(() => {
                ref.current.scrollIntoView({behavior: "smooth", block: "center"})
                console.log(publication, isSelected)
            }, 10)
            
            return () => clearTimeout(interval)
        }
    }, [isSelected])

    return (
        <li ref={ref}>
            {publication.timestamp.year}
        </li>
    )
}