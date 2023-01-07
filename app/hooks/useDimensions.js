import { useLayoutEffect, useRef, useState } from "react";

export default function useDimensions() {
    const measuredComponentRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (measuredComponentRef.current) {
            setDimensions({
                width: measuredComponentRef.current.offsetWidth,
                height: measuredComponentRef.current.offsetHeight
            });
        }
    }, []);

    return [measuredComponentRef, dimensions];
}