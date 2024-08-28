import { useUsersContext } from "../context/useUsersContext"

export function ColorRowButton () {
  const { isColorActive, toggleColors } = useUsersContext()

  return (
    <button onClick={toggleColors}>
      {isColorActive ? 'Remove colors' : 'Color rows'}
    </button>
  )
}
