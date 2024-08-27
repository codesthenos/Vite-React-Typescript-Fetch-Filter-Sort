import { useUsers } from "../hooks/useUsers.ts"


export function ResetDeletedButton () {
  const { dispatch } = useUsers()

  const resetUsers = () => {
    dispatch({ type: 'RECOVER_DELETES' })
  }

  return (
    <button onClick={resetUsers}>
      Recover deleted users
    </button>
  )
}