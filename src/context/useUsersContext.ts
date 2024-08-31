import { useContext, useMemo } from "react"
import { UsersContext } from "./UsersContext.tsx"
import { SortBy } from "../constants.ts"
import type { User } from "../types.d.ts"

export const useUsersContext = () => {
  const usersContext = useContext(UsersContext)

  if (!usersContext) throw new Error('useUsersContext must be used within a UsersProvider')
  
  const { state, dispatch } = usersContext

  const toggleColors = () => {
    dispatch({ type: 'SET_COLORS' })
  }

  const toggleSort = (property: SortBy) => {
    dispatch({ type: 'SET_SORT_PROPERTY', payload: property })
  }

  const deleteUser = (userLoginUUID: string) => {
    dispatch({ type: 'DELETE_ROW', payload: userLoginUUID })
  }

  const recoverDeletes = () => {
    dispatch({ type: 'RECOVER_DELETES' })
  }

  const handleFilterCountryInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: 'FILTER_USERS_BY_COUNTRY', payload: event.target.value })
  }

  const sortedUsers = useMemo(() => {
    console.log('calculating filtered and sorted')
    const filteredUsers = state.users.filter(user => !user.isDeleted &&
      user.location.country.toLowerCase()
        .includes(state.filterCountryValue.toLowerCase()))

    if (state.sortProperty === SortBy.NONE) {

      return filteredUsers
    }

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.SURNAME]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }

    return filteredUsers.toSorted((a, b) => {
      const getProperty = compareProperties[state.sortProperty]
      return getProperty(a).localeCompare(getProperty(b))
    })
  }, [state.users, state.filterCountryValue, state.sortProperty])

  return {
    users: state.users,
    isColorActive: state.isColorActive,
    toggleColors,
    sortProperty: state.sortProperty,
    toggleSort,
    deleteUser,
    recoverDeletes,
    filterCountryValue: state.filterCountryValue,
    handleFilterCountryInput,
    sortedUsers
  }
}
