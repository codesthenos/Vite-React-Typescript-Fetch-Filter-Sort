import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUsers } from "../services/users.ts"
import type { User } from "../types.d.ts"

type UsersPage = {
  users: User[]
  nextPage: number | undefined
}

type UsersQueryData = {
  pages: UsersPage[]
  pageParams?: number[]
}

export const useUsers = () => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchOnWindowFocus: false
  })

  const deleteUser = (email: string) => {
    queryClient.setQueryData<UsersQueryData>(
      ['users'],
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            users: page.users.map((user) => user.email === email ? { ...user, isDeleted: true } : user)
          }))
        }
      }
    )
  }

  const recoverDeleteds = () => {
    queryClient.setQueryData<UsersQueryData>(
      ['users'],
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            users: page.users.map((user) => user.isDeleted === true ? { ...user, isDeleted: false } : user)
          }))
        }
      }
    )
  }

  return {
    isLoading,
    isError,
    users: data?.pages.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
    deleteUser,
    recoverDeleteds
  }
}
