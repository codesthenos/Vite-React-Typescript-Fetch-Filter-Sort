import { useCallback } from "react"
import { SortBy } from "../constants.ts"
import type { User } from "../types.d.ts"

export function useSelectors () {
  const filterUsers = useCallback((users: User[], filterValue: string) => {
    console.log('calculating filtered')
    return users.filter(user => !user.isDeleted &&
      user.location.country.toLowerCase()
        .includes(filterValue.toLowerCase()))    
  }, [])

  const sortUsers = useCallback((users: User[], property: SortBy) => {
    console.log('calculating sorted')
    if (property === SortBy.NONE) return users
  
    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.SURNAME]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }
  
    return users.toSorted((a, b) => {
      const getProperty = compareProperties[property]
      return getProperty(a).localeCompare(getProperty(b))
    })
  }, [])

  return { filterUsers, sortUsers }
}
