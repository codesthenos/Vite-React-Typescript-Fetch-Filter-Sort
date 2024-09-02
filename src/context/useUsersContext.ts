import { useContext } from "react"
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

  const deleteUser = (userLoginUUID: string) => {
    dispatch({ type: 'DELETE_ROW', payload: userLoginUUID })
  }

  const recoverDeletes = () => {
    dispatch({ type: 'RECOVER_DELETES' })
  }

  const handleFilterCountryInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: 'FILTER_USERS_BY_COUNTRY', payload: event.target.value })
  }

  const handleToggleSort = (property: SortBy) => {
    if (state.sortProperty === property) {
      dispatch({ type: 'SET_SORT_PROPERTY', payload: SortBy.NONE })
    } else {
      dispatch({ type: 'SET_SORT_PROPERTY', payload: property })
    }
  }

  const setFetchedUsers = (users: User[]) => {
    if (users) {
      dispatch({ type: 'SET_FETCHED_USERS', payload: users })
    }
  }

  return {
    users: state.users,
    isColorActive: state.isColorActive,
    toggleColors,
    sortProperty: state.sortProperty,
    handleToggleSort,
    deleteUser,
    recoverDeletes,
    filterCountryValue: state.filterCountryValue,
    handleFilterCountryInput,
    setFetchedUsers
  }
}
