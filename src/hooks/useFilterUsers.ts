import { useEffect, useState } from "react"
import { useGetUsers } from "../hooks/useGetUsers.ts"

export const useFilterUsers = () => {
  const initialUsers = useGetUsers()

  const [filteredUsers, setFilteredUsers] = useState(initialUsers)

  useEffect(()=> {
    setFilteredUsers(initialUsers)
  }, [initialUsers])

  const deleteUser = (userToDeleteLoginUUID: string) => {

    const newFilteredUsers = filteredUsers.filter(user => user.login.uuid !== userToDeleteLoginUUID)

    setFilteredUsers(newFilteredUsers)
  }

  const resetUsers: React.MouseEventHandler = (event) => {
    event.preventDefault()

    setFilteredUsers(initialUsers)
  }

  return { filteredUsers, deleteUser, resetUsers }
}
