import { useState } from "react"
//Custom hook to get the fetched array of users 
import { useGetUsers } from "../hooks/useGetUsers.ts"

export function useUsers () {
  const fetchedUsers = useGetUsers()

  const [usersShown, setUsersShown] = useState([...fetchedUsers])

  const getUsers = () => { setUsersShown(usersShown)}

  return { usersShown, getUsers }
}