import type { State, User } from "../types"

export const getUsersNotDeleted = (state: State) =>
  state.fetchedUsers.filter(user =>
    !state.deletedUsers.includes(user)
  )

export const getSortedUsers = (users: User[]) =>
  users.toSorted((a, b) => 
    a.location.country.localeCompare(b.location.country)
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
