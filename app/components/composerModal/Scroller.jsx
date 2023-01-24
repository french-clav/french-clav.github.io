import React, { useEffect, useRef } from "react"

export default function Scroller({ show, children }) {
    const scrollerRef = useRef()

    useEffect(() => {
        if (show) {
            scrollerRef.current.scroll(0, 0)
        }
    }, [show])

    return (
        <div ref={scrollerRef} className="composer-modal-scroller">
            <div className="composer-modal-content">
                {children}
            </div>
        </div>
    )
}