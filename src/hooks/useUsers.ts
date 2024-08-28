import { useEffect, useState } from "react"
//Custom hook to get the fetched array of users 
import { useGetUsers } from "../hooks/useGetUsers.ts"

export function useUsers () {
  const fetchedUsers = useGetUsers()

  const [shownUsers, setShownUsers] = useState([...fetchedUsers])

  useEffect(() => {
    setShownUsers([...fetchedUsers])
  }, [fetchedUsers])

  return { shownUsers }
}