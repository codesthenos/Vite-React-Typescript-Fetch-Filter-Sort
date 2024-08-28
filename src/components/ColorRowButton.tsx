import { useUsers } from "../hooks/useUsers.ts"


export function ColorRowButton () {

  return (
    <button onClick={handleColorButton}>
      {state.isColorRowActive ? 'Remove colors' : 'Color rows'}
    </button>
  )
}