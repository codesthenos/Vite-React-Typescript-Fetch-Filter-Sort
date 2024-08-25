import { useEffect, useState } from "react"
import { useGetUsers } from "../hooks/useGetUsers.ts"

export function UsersTable () {
  const initialUsers = useGetUsers()

  const [filteredUsers, setFilteredUsers] = useState(initialUsers)

  const deleteUser = (userToDeleteLoginUUID: string) => {

    const newFilteredUsers = filteredUsers.filter(user => user.login.uuid !== userToDeleteLoginUUID)

    setFilteredUsers(newFilteredUsers)
  }

  useEffect(()=> {
    setFilteredUsers(initialUsers)
  }, [initialUsers])

  const resetUsers: React.MouseEventHandler = (event) => {
    event.preventDefault()

    setFilteredUsers(initialUsers)
  }

  return (
    <>
      <button onClick={resetUsers}>Reset user list</button>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Country</th>
            <th>Delete user</th>
          </tr>
        </thead>
        
        <tbody>
          {
            filteredUsers.map(user => (
              <tr key={user.login.uuid}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>

                <td>
                  {user.name.first}
                </td>

                <td>
                  {user.name.last}
                </td>

                <td>
                  {user.location.country}
                </td>

                <td>
                  <button onClick={() => { deleteUser(user.login.uuid) }}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
    
  )
}
