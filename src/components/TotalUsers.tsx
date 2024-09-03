import { useUsers } from "../hooks/useUsers"

export const TotalUsers = () => {
  const { users } = useUsers()

  return (
    <h2>{users.length} USERS</h2>
  )
}
