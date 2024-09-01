import { useEffect, useMemo, useRef } from "react"
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

  const previouSortPropertyRef = useRef(sortProperty)

  useEffect(() => {
    previouSortPropertyRef.current = sortProperty
  }, [sortProperty])

  const filteredUsers = useMemo(() => {
    if (filterCountryValue.length === 0) return users.filter(user => !user.isDeleted)

    console.log('---FILTERING---')
    return filterUsers(users, filterCountryValue)
  }, [users, filterCountryValue])

  const sortedUsers = useMemo(() => {
    if (sortProperty === SortBy.NONE || previouSortPropertyRef.current === sortProperty) return filteredUsers

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
