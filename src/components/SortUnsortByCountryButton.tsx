import { SortBy } from "../constants.ts"
import { useUsersContext } from "../context/useUsersContext"

export function SortUnsortByCountryButton () {
  const { sortProperty, handleToggleSort } = useUsersContext()

  return (
    <button onClick={() => { handleToggleSort(SortBy.COUNTRY) }}>
      {sortProperty === SortBy.COUNTRY ? 'Unsort' : 'Sort by country'}
    </button>
  )
}
