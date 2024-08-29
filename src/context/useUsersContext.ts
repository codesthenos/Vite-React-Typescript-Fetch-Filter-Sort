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

  return {
    shownUsers: state.shownUsers,
    isColorActive: state.isColorActive,
    toggleColors,
    isSortByCountryActive: state.isSortByCountryActive,
    toggleSortByCountry,
    deleteUser,
    recoverDeletes
  }
}
