import { useState, useEffect } from "react"
import type { User, APIResponse } from "../types.d.ts"

export const useGetUsers = () => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then((jsonData: APIResponse) => {
        setFetchedUsers(jsonData.results)
      })
      .catch((err: unknown) => {
        console.error(err)
      })

  }, [])

  return fetchedUsers
}
