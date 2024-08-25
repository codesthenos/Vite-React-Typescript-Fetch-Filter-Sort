import { useState } from "react"

export const useColorRowButton = () => {
  const [isColorButtonActive, setIsColorButtonActive] = useState(false)

  const handleColorButton = () => {
    setIsColorButtonActive(!isColorButtonActive)
  }

  return { isColorButtonActive, handleColorButton }
}
