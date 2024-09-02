import { useEffect, useState } from "react"
import type { User, APIResponse } from "../types"

export const useGetFetchedUsers = (page: number) => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`https://randomuser.me/api?seed=ataraxia&results=10&page=${page}`)
      .then(res => res.json())
      .then((jsonData: APIResponse) => {
        setFetchedUsers(jsonData.results)

      })
      .catch((err: unknown) => {
        console.error(err)
      })

  }, [page])

  return { fetchedUsers }
}
