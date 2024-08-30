import { SortBy } from "../constants.ts"
import { useUsersContext } from "../context/useUsersContext"

export function SortUnsortByCountryButton () {
  const { sortProperty, toggleSort } = useUsersContext()

  const handleToggleSort = (property: SortBy) => {
    if (sortProperty === property) {
      toggleSort(SortBy.NONE)
    } else {
      toggleSort(property)
    }
  }

  return (
    <button onClick={() => { handleToggleSort(SortBy.COUNTRY) }}>
      {sortProperty === SortBy.COUNTRY ? 'Unsort' : 'Sort by country'}
    </button>
  )
}
