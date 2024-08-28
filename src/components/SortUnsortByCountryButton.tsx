import { useUsers } from "../hooks/useUsers.ts"


export function SortUnsortByCountryButton () {
  return (
    <button onClick={handleSortButton}>
      {state.isSortByCountryActive ? 'Unsort' : 'Sort by country'}
    </button>
  )
}