import { useContext } from "react"
import { UsersContext } from "./UsersContext.tsx"

export const useUsersContext = () => {
  const usersContext = useContext(UsersContext)

  if (!usersContext) throw new Error('useUsersContext must be used within a UsersProvider')
  
  const { state, dispatch, fetchedUsers } = usersContext

  const toggleColors = () => {
    dispatch({ type: 'SET_COLORS' })
  }

  const toggleSortByCountry = () => {
    dispatch({ type: 'SORT_UNSORT_BY_COUNTRY', payload: fetchedUsers })
  }

  return {
    shownUsers: state.shownUsers,
    isColorActive: state.isColorActive,
    toggleColors,
    isSortByCountryActive: state.isSortByCountryActive,
    toggleSortByCountry
  }
}
