import { SortBy } from "../constants.ts"
import type { User } from "../types.d.ts"

export const filterUsers = (users: User[], filterValue: string) => {
  return users.filter(user => !user.isDeleted &&
      user.location.country.toLowerCase()
        .includes(filterValue.toLowerCase()))    
}

export const sortUsers = (users: User[], property: SortBy) => {
  
  const compareProperties: Record<string, (user: User) => string> = {
    [SortBy.NAME]: user => user.name.first,
    [SortBy.SURNAME]: user => user.name.last,
    [SortBy.COUNTRY]: user => user.location.country
  }
  
  return users.toSorted((a, b) => {
    const getProperty = compareProperties[property]
    return getProperty(a).localeCompare(getProperty(b))
  })
}
