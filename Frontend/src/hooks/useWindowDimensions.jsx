import { useEffect, useState } from "react"

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    useEffect(() => {
        const updateWindowDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener("resize", updateWindowDimensions)
        return () => {
            window.removeEventListener("resize", updateWindowDimensions)
        }
    }, [])
    return { ...windowDimensions, isMobile }
}
export default useWindowDimensions