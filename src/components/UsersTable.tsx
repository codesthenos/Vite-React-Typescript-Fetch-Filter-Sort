import { useMemo } from "react"
//Constants
import { Headers, SortBy } from "../constants.ts"
//Context
import { useUsersContext } from "../context/useUsersContext.ts"
//Selectors
import { filterUsers, sortUsers } from "../selectors/useSelectors.ts"

export function UsersTable () {
  const { users, isColorActive, deleteUser, toggleSort, sortProperty, filterCountryValue } = useUsersContext()

  const handleToggleSort = (property: SortBy) => {
    if (sortProperty === property) {
      toggleSort(SortBy.NONE)
    } else {
      toggleSort(property)
    }
  }

  const filteredUsers = useMemo(() => {
    console.log('---FILTERING---')
    return filterUsers(users, filterCountryValue)
  }, [users, filterCountryValue])

  const sortedUsers = useMemo(() => {
    console.log('---SORTING---')
    return sortUsers(filteredUsers, sortProperty)
  }, [filteredUsers, sortProperty])
  
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
