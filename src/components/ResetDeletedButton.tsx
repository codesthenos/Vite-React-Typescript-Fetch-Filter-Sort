import { useUsers } from "../hooks/useUsers.ts"


export function ResetDeletedButton () {

  return (
    <button onClick={resetUsers}>
      Recover deleted users
    </button>
  )
}