import React, { useEffect, useRef } from "react"

export default function Publication({ publication, isSelected }) {
    const ref = useRef()

    useEffect(() => {
        if (isSelected) {
            const timeout = setTimeout(() => {
                ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
                console.log(publication, isSelected)
            }, 300)

            return () => clearTimeout(timeout)
        }
    }, [isSelected])

    return (
        <li ref={ref}>
            {publication.timestamp.year}
        </li>
    )
}