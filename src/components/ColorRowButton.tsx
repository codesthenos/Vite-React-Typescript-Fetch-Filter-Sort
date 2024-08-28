//Context
import { useUsersContext } from "../context/useUsersContext.ts"

export function ColorRowButton () {
  const { isColorActive, toggleColors } = useUsersContext()

  return (
    <button onClick={toggleColors}>
      {isColorActive ? 'Remove colors' : 'Color rows'}
    </button>
  )
}
