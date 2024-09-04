import { Headers } from "../constants.ts"
import { useUsers } from "../hooks/useUsers.ts"
import type { User } from "../types.d.ts"

interface Props {
  users: User[],
  showColors: boolean,
  toggleSortProperty: (property: string) => void
}

export function UsersTable ({ users, showColors, toggleSortProperty }: Props) {
  const { deleteUser } = useUsers()

  return (
    <table>
      <thead>
        <tr>
          {
            Object.values(Headers).map(headerCell =>
              <th
                key={headerCell}
                className={headerCell === Headers.PHOTO || headerCell === Headers.DELETE
                  ? "" : "pointer"}
                onClick={headerCell === Headers.PHOTO || headerCell === Headers.DELETE
                  ? () => {} : () => { toggleSortProperty(headerCell) }}
              >
                {headerCell}
              </th>
            )
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
