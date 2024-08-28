import { useUsersContext } from "../context/useUsersContext"

export function SortUnsortByCountryButton () {
  const { isSortByCountryActive, toggleSortByCountry } = useUsersContext()

  return (
    <button onClick={toggleSortByCountry}>
      {isSortByCountryActive ? 'Unsort' : 'Sort by country'}
    </button>
  )
}
