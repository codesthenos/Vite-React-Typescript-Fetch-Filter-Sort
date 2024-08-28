import { useReducer, createContext, useEffect } from "react"

import { usersInitialState, usersReducer } from '../reducer/usersReducer.ts'
import type { ContextProps, UsersProviderProps } from "../types.d.ts"

import { useGetUsers } from "../hooks/useGetFetchedUsers.ts"

export const UsersContext = createContext<ContextProps | undefined>(undefined)

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, usersInitialState)

  const { fetchedUsers } = useGetUsers()

  useEffect(() => {
    if (fetchedUsers) {
      dispatch({ type: 'SET_FETCHED_USERS', payload: fetchedUsers })
    }
  }, [fetchedUsers])

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
