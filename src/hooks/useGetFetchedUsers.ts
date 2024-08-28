import { useEffect, useState } from "react"
import type { User, APIResponse } from "../types"

export const useGetFetchedUsers = () => {
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

  return { fetchedUsers }
}
