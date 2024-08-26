import { useEffect, useState } from "react"
import { useGetUsers } from "../hooks/useGetUsers.ts"

export const useFilterUsers = () => {
  const initialUsers = useGetUsers()

  const [filteredUsers, setFilteredUsers] = useState(initialUsers)

  const [inputValue, setInputValue] = useState<string>('')

  useEffect(()=> {
    setFilteredUsers(initialUsers)
  }, [initialUsers])

  const handleCountryFilterInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()

    const newInputValue = event.target.value

    setInputValue(newInputValue)    
  }

  useEffect(()=> {
    const newFilteredUsers = filteredUsers.filter(user => user.location.country.toLowerCase().includes(inputValue.toLowerCase()))
    setFilteredUsers(newFilteredUsers)
  }, [inputValue])

  const deleteUser = (userToDeleteLoginUUID: string) => {

    const newFilteredUsers = filteredUsers.filter(user => user.login.uuid !== userToDeleteLoginUUID)

    setFilteredUsers(newFilteredUsers)
  }

  const resetUsers: React.MouseEventHandler = (event) => {
    event.preventDefault()

    setFilteredUsers(initialUsers)
  }

  const handleSortButton: React.MouseEventHandler = (event) => {
    event.preventDefault()

    const newFilteredUsers = [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country))

    setFilteredUsers(newFilteredUsers)
  }

  return { filteredUsers, deleteUser, resetUsers, handleSortButton, inputValue, handleCountryFilterInput }
}
