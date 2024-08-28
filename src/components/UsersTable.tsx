//Constants
import { HEADERS } from "../constants.ts"
//Custom hook to get the array of users that will be shown
import { useGetUsers } from "../hooks/useGetUsers.ts"

export function UsersTable () {
  const { shownUsers } = useGetUsers()

  return (
    <table>
      <thead>
        <tr>
          {
            HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
          }
        </tr>
      </thead>
      
      <tbody className={false ? 'show-colors' : ''}>
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
