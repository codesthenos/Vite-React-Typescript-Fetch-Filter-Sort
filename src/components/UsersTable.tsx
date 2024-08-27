import { useMemo } from "react"

import { HEADERS } from "../constants.ts"
import { useUsers } from "../hooks/useUsers.ts"

export function UsersTable () {
  const { state, dispatch } = useUsers()

  const filteredUsers = useMemo(() => {
    return state.filterCountryValue
      ? state.fetchedUsers.filter(user =>
        user.location.country.toLowerCase().includes(state.filterCountryValue.toLowerCase()))
      : state.fetchedUsers
  }, [state.fetchedUsers, state.filterCountryValue])

  const sortedUsers = useMemo(() => {
    return state.isSortByCountryActive
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : filteredUsers
  }, [state.fetchedUsers, state.isSortByCountryActive])

  const deleteUser = (userLoginUUID: string) => {
    dispatch({ type: 'DELETE_ROW', payload: userLoginUUID })
  }

  return (
    <table>
      <thead>
        <tr>
          {
            HEADERS.map(headerCell => <th key={headerCell}>{headerCell}</th>)
          }
        </tr>
      </thead>
      
      <tbody className={state.isColorRowActive ? 'show-colors' : ''}>
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
