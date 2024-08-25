import { useFilterUsers } from "../hooks/useFilterUsers.ts"
import { HEADERS } from "../constants.ts"

export function UsersTable () {
  const { filteredUsers, deleteUser, resetUsers } = useFilterUsers()

  return (
    <>
      <button onClick={resetUsers}>Reset user list</button>
      <table>
        <thead>
          <tr>
            {
              HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
            }
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
