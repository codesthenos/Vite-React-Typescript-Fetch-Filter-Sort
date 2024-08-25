import { HEADERS } from "../constants.ts"
import { useFilterUsers } from "../hooks/useFilterUsers.ts"
import { useColorRowButton } from "../hooks/useColorRowButton.ts"

export function UsersTable () {
  const { filteredUsers, deleteUser, resetUsers } = useFilterUsers()

  const { isColorButtonActive, handleColorButton } = useColorRowButton()

  return (
    <>
      <div style={{ display: 'flex', gap: '24px', placeContent: 'center' }}>
        <button onClick={handleColorButton}>Color rows</button>

        <button onClick={resetUsers}>Reset user list</button>
      </div>

      <table>
        <thead>
          <tr>
            {
              HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
            }
          </tr>
        </thead>
        
        <tbody className={isColorButtonActive ? 'show-colors' : ''}>
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
