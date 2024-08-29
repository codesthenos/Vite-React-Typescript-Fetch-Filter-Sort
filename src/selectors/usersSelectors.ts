import type { State, User } from "../types"

export const getSortedUsers = (users: User[]) =>
  users.toSorted((a, b) => 
    a.location.country.localeCompare(b.location.country)
  )

export const getFilteredUsers = (state: State) => {
  const { readyToShowUsers, filterCountryValue } = state

  return filterCountryValue
    ? readyToShowUsers.filter(user =>
      user.location.country.toLocaleLowerCase()
        .includes(filterCountryValue.toLocaleLowerCase())
    )
    : readyToShowUsers
}
