import { useUsers } from "../hooks/useUsers.ts"


export function FilterByCountryInput () {

  return (
    <input
      placeholder="Filter by country"
      onChange={handleCountryFilterInput}
      value={state.filterCountryValue}
    />
  )
}