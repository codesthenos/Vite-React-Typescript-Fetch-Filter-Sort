import { useEffect, useState } from "react"
import { useUsersContext } from "../context/useUsersContext"
import { useGetFetchedUsers } from "../hooks/useGetFetchedUsers.ts"

export function ManagePagesButtons () {
  const { setFetchedUsers } = useUsersContext()

  const [page, setPage] = useState(1)

  const { fetchedUsers } = useGetFetchedUsers(page)

  useEffect(() => {
    setFetchedUsers(fetchedUsers)
  }, [fetchedUsers, setFetchedUsers])

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if  (page > 1) {
      setPage(page -1)
    }
  }

  return (
    <>
      <div>
        <button onClick={() => { previousPage() }}>
          Previous page
        </button>

        <button onClick={() => { nextPage() }}>
          Next page
        </button>
      </div>

      <span>Page {page}</span>
    </>
  )
}
