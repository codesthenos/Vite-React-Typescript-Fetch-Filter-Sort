import type { APIResponse } from "../types.d.ts"

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return await fetch(`https://randomuser.me/api?seed=codesthenos&results=10&page=${pageParam}`)
    .then(res => {
      if (!res.ok) throw new Error('Error fetching users')
      return res.json()
    })
    .then((res: APIResponse) => {
      const currentPage = res.info.page
      const nextPage = currentPage > 3 ? undefined : currentPage + 1
      return {
        users: res.results,
        nextPage: nextPage
      }
    })
}
