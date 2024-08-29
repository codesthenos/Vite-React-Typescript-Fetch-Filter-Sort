import { useContext } from "react"
import { UsersContext } from "./UsersContext.tsx"

export const useUsersContext = () => {
  const usersContext = useContext(UsersContext)

  if (!usersContext) throw new Error('useUsersContext must be used within a UsersProvider')
  
  const { state, dispatch } = usersContext

  const toggleColors = () => {
    dispatch({ type: 'SET_COLORS' })
  }

  const toggleSortByCountry = () => {
    dispatch({ type: 'SORT_UNSORT_BY_COUNTRY' })
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
    shownUsers: state.shownUsers,
    isColorActive: state.isColorActive,
    toggleColors,
    isSortByCountryActive: state.isSortByCountryActive,
    toggleSortByCountry,
    deleteUser,
    recoverDeletes,
    filterCountryValue: state.filterCountryValue,
    handleFilterCountryInput
  }
}
