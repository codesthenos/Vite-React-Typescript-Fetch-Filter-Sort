//Constants
import { HEADERS } from "../constants.ts"
//Context
import { useUsersContext } from "../context/useUsersContext.ts"

export function UsersTable () {
  const { shownUsers, isColorActive } = useUsersContext()
  
  return (
    <table>
      <thead>
        <tr>
          {
            HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
          }
        </tr>
      </thead>
      
      <tbody className={isColorActive ? 'show-colors' : ''}>
        {
          shownUsers.map(user => (
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
                <button onClick={() => {}}>Delete</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>    
  )
}
