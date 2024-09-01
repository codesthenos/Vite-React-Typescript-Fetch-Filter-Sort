import { useContext } from "react"
import { UsersContext } from "./UsersContext.tsx"
import type { SortBy } from "../constants.ts"

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

  return {
    users: state.users,
    isColorActive: state.isColorActive,
    toggleColors,
    sortProperty: state.sortProperty,
    toggleSort,
    deleteUser,
    recoverDeletes,
    filterCountryValue: state.filterCountryValue,
    handleFilterCountryInput
  }
}
