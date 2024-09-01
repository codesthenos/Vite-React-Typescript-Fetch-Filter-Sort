//Constants
import { Headers, SortBy } from "../constants.ts"
//Context
import { useUsersContext } from "../context/useUsersContext.ts"
//Sorted Users
import { useSortUsers } from "../hooks/useSortUsers.ts"

export function UsersTable () {
  const { isColorActive, deleteUser, handleToggleSort } = useUsersContext()

  const { sortedUsers } = useSortUsers()
  
  return (
    <table>
      <thead>
        <tr>
          <th>
            {Headers.PHOTO}
          </th>

          <th className='pointer' onClick={() => { handleToggleSort(SortBy.NAME) }}>
            {Headers.NAME}
          </th>

          <th className='pointer' onClick={() => { handleToggleSort(SortBy.SURNAME) }}>
            {Headers.SURNAME}
          </th>

          <th className='pointer' onClick={() => { handleToggleSort(SortBy.COUNTRY) }}>
            {Headers.COUNTRY}
          </th>

          <th>
            {Headers.DELETE_USER}
          </th>
        </tr>
      </thead>
      
      <tbody className={isColorActive ? 'show-colors' : ''}>
        {
          sortedUsers.map(user => (
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
