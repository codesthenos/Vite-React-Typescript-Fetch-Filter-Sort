import { useEffect, useMemo, useRef } from "react"
import { useUsersContext } from "../context/useUsersContext"
import { filterUsers, sortUsers } from "../selectors/useSelectors"
import { SortBy } from "../constants"

export const useSortUsers = () => {
  const { sortProperty, filterCountryValue, users } = useUsersContext()
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

  return { sortedUsers }
}
