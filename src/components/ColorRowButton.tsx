import { useState } from "react"


export function ColorRowButton () {
  const [colorRowButtonActive, setColorRowButton] = useState(false)

  const handleColorButton = () => {
    setColorRowButton(!colorRowButtonActive)
  }

  return (
    <button onClick={handleColorButton}>
      {colorRowButtonActive ? 'Remove colors' : 'Color rows'}
    </button>
  )
}