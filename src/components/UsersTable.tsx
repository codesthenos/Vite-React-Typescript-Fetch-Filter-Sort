//Constants
import { Headers } from "../constants.ts"
//Context
import { useUsersContext } from "../context/useUsersContext.ts"

export function UsersTable () {
  const { shownUsers, isColorActive, deleteUser, toggleSortByCountry } = useUsersContext()
  
  return (
    <table>
      <thead>
        <tr>
          <th>
            {Headers.PHOTO}
          </th>

          <th className='pointer' onClick={() => {}}>
            {Headers.NAME}
          </th>

          <th className='pointer' onClick={() => {}}>
            {Headers.SURNAME}
          </th>

          <th className='pointer' onClick={toggleSortByCountry}>
            {Headers.COUNTRY}
          </th>

          <th>
            {Headers.DELETE_USER}
          </th>
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
                <button onClick={() => { deleteUser(user.login.uuid) }}>Delete</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>    
  )
}
