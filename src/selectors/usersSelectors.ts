import type { User } from "../types.d.ts"

export const getUsersNotDeleted = (fetchedUsers: User[], deletedUsers: User[]) =>
  fetchedUsers.filter(user =>
    !deletedUsers?.includes(user)
  )

export const getSortedUsers = (users: User[]) =>
  users.toSorted((a, b) => 
    a.location.country.localeCompare(b.location.country)
  )

export const getFilteredUsers = (usersNotDeleted: User[], inputValue: string) =>
  usersNotDeleted.filter(user =>
    user.location.country.toLowerCase()
      .includes(inputValue.toLowerCase())
  )

/*
export const getFilteredUsers = (state: State) => {
  const { filterCountryValue } = state

  return filterCountryValue
    ?filter(user =>
      user.location.country.toLocaleLowerCase()
        .includes(filterCountryValue.toLocaleLowerCase())
    )
    :}
*/
