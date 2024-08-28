import { useReducer, createContext } from "react";

import { userReducer, userInitialState } from '../reducer/reducerUsers.ts'

export const UsersContext = createContext({})

export function useUsersReducer () {
  const [state, dispatch] = useReducer(userReducer, userInitialState)
}