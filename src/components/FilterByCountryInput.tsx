import { useUsersContext } from "../context/useUsersContext.ts"

export function FilterByCountryInput () {
  const { filterCountryValue, handleFilterCountryInput } = useUsersContext()

  return (
    <input
      placeholder="Filter by country"
      onChange={handleFilterCountryInput}
      value={filterCountryValue}
    />
  )
}
