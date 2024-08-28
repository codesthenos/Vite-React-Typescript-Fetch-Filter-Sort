import { useReducer, createContext } from "react"

import { usersInitialState, usersReducer } from '../reducer/usersReducer.ts'
import type { ContextProps, UsersProviderProps } from "../types.d.ts"

export const UsersContext = createContext<ContextProps | undefined>(undefined)

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, usersInitialState)

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
