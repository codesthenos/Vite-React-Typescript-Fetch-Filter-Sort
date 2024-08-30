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

export const getSortedByCountryUsers = (users: User[]) =>
  users.toSorted((a, b) => 
    a.location.country.localeCompare(b.location.country)
  )
/*
export const getSortedByNameUsers = (users: User[]) =>
  users.toSorted((a, b) => 
    a.name.first.localeCompare(b.name.first)
  )
if (action.type === 'SORT_UNSORT_BY_NAME') {
  const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers), state.filterCountryValue)
  return {
    isSortByCountryActive: state.isSortByCountryActive && !state.isSortByCountryActive,
    isSortByNameActive: !state.isSortByNameActive,
    shownUsers: !state.isSortByNameActive
      ? getSortedByNameUsers(filteredUsers)
      : filteredUsers
  }
}
*/
