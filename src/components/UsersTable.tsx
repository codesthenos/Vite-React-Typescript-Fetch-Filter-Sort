import { useMemo } from "react"
//Types
import type { User } from "../types.d.ts"
//Constants
import { Headers, SortBy } from "../constants.ts"
//Context
import { useUsersContext } from "../context/useUsersContext.ts"
//Selectors
import { useSelectors } from "../selectors/useSelectors.ts"

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
    return users.filter(user => !user.isDeleted &&
      user.location.country.toLowerCase()
        .includes(filterCountryValue.toLowerCase()))    
  }, [users, filterCountryValue])

  const sortedUsers = useMemo(() => {
    console.log('---SORTING---')

    if (sortProperty === SortBy.NONE) return filteredUsers
    
    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.SURNAME]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }
    
    return filteredUsers.toSorted((a, b) => {
      const getProperty = compareProperties[sortProperty]
      return getProperty(a).localeCompare(getProperty(b))
    })

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
