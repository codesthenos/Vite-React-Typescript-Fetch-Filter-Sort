import { SortBy } from "../constants.ts"
import type { User } from "../types.d.ts"

export const getUsersNotDeleted = (fetchedUsers: User[], deletedUsers: User[]) =>
  fetchedUsers.filter(user =>
    !deletedUsers?.includes(user)
  )

export const getFilteredUsers = (usersNotDeleted: User[], inputValue: string) => {
  return inputValue.length > 0
    ? usersNotDeleted.filter(user =>
      user.location.country.toLowerCase()
        .includes(inputValue.toLowerCase())
    )
    : usersNotDeleted
}

export const getSortedUsers = (users: User[], type: SortBy) => {
  const compareProperties: Record<string, (user: User) => string> = {
    [SortBy.NAME]: user => user.name.first,
    [SortBy.SURNAME]: user => user.name.last,
    [SortBy.COUNTRY]: user => user.location.country
  }

  return users.toSorted((a, b) => {
    const getProperty = compareProperties[type]
    return getProperty(a).localeCompare(getProperty(b))
  })
}
