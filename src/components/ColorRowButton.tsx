import { useUsers } from "../hooks/useUsers.ts"


export function ColorRowButton () {
  const { state, dispatch } = useUsers()

  const handleColorButton = () => {
    dispatch({ type: 'COLOR_UNCOLOR_ROWS' })
  }
  return (
    <button onClick={handleColorButton}>
      {state.isColorRowActive ? 'Remove colors' : 'Color rows'}
    </button>
  )
}