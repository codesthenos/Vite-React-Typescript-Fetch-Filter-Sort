import { useContext } from "react";
import { UsersContext } from "../context/userContext.tsx";


export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }

  return context
}