import { HEADERS } from "../constants.ts"
import { useUsers } from "../hooks/useUsers.ts"

export function UsersTable () {
  const { state, dispatch } = useUsers()

  const deleteUser = (userLoginUUID: string) => {
    dispatch({ type: 'DELETE_ROW', payload: userLoginUUID })
  }

  return (
    <table>
      <thead>
        <tr>
          {
            HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
          }
        </tr>
      </thead>
      
      <tbody className={state.isColorRowActive ? 'show-colors' : ''}>
        {
          state.filteredUsers.map(user => (
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
  )
}
