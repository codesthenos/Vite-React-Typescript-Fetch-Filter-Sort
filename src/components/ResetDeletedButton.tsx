//Context
import { useUsersContext } from "../context/useUsersContext"

export function ResetDeletedButton () {
  const { recoverDeletes } = useUsersContext()

  return (
    <button onClick={recoverDeletes}>
      Recover deleted users
    </button>
  )
}
