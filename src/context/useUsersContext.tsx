import { useContext } from "react"
import { UsersContext } from "./UsersContext.tsx"

export const useUsersContext = () => {
  const usersContext = useContext(UsersContext)

  if (!usersContext) throw new Error('useUsersContext must be used within a UsersProvider')
  
  const { state, dispatch } = usersContext

  const toggleColors = () => {
    dispatch({ type: 'SET_COLORS' })
  }

  return {
    isColorActive: state.isColorActive,
    toggleColors
  }
}
