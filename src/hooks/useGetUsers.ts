import { useState, useEffect, useRef } from "react"
import type { User, APIResponse } from "../types.d.ts"

export const useGetUsers = () => {
  const [shownUsers, setShownUsers] = useState<User[]>([])

  const fetchedUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then((jsonData: APIResponse) => {
        fetchedUsers.current = jsonData.results
        setShownUsers(jsonData.results)
      })
      .catch((err: unknown) => {
        console.error(err)
      })

  }, [])

  return { shownUsers }
}
