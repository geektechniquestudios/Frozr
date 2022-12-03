import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const useWindowSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [width])

  const isSmall = width < 500

  return { width, isSmall }
}

export const WindowSize = createContainer(useWindowSize)
