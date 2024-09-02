import { useReducer, createContext, useEffect } from "react"

import { usersInitialState, usersReducer } from '../reducer/usersReducer.ts'
import type { ContextProps, UsersProviderProps } from "../types.d.ts"

import { useGetFetchedUsers } from "../hooks/useGetFetchedUsers.ts"

export const UsersContext = createContext<ContextProps | undefined>(undefined)

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, usersInitialState)

  //Magic number 1, is the first page of users that will be load
  const { fetchedUsers } = useGetFetchedUsers(1)

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
