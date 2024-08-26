import { createContext, useEffect, useReducer } from "react"
import { initialState, reducer } from "../reducer/reducerUsers.ts"
import { useGetUsers } from '../hooks/useGetUsers.ts'
import type { ContextProps, UsersProvidersProps } from "../types.d.ts"

export const UsersContext = createContext<ContextProps | undefined>(undefined)

export const UsersProvider = ({ children }: UsersProvidersProps) => {
  const initialUsers = useGetUsers()
  
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_USERS', payload: initialUsers })
  }, [initialUsers])

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
