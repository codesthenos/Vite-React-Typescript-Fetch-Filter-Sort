import { useMemo } from "react"
import { HEADERS } from "../constants.ts"
import type { User } from "../types.d.ts"

interface Props {
  users: User[],
  showColors: boolean,
  deleteUser: (email: string) => void
}

export function UsersTable ({ users, showColors, deleteUser }: Props) {

  return (
    <table>
      <thead>
        <tr>
          {
            HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
          }
        </tr>
      </thead>
      
      <tbody className={showColors ? 'show-colors' : ''}>
        {
          users.map(user => (
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
                <button onClick={() => { deleteUser(user.email) }}>Delete</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>    
  )
}
