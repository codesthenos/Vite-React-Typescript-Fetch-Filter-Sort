import { useState, useEffect } from "react"
import type { User, APIResponse } from "../types.d.ts"

export const useGetUsers = () => {
  const [initialUsers, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then((jsonData: APIResponse) => {
        setUsers(jsonData.results)
      })
      .catch((err: unknown) => {
        console.error(err)
      })

  }, [])

  return initialUsers
}
