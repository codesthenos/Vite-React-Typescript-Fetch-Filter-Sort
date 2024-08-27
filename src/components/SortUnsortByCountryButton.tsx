import { useUsers } from "../hooks/useUsers.ts"


export function SortUnsortByCountryButton () {
  const { state, dispatch } = useUsers()

  const handleSortButton = () => {
    dispatch({ type: 'SORT_UNSORT_BY_COUNTRY' })
  }

  return (
    <button onClick={handleSortButton}>
      {state.isSortByCountryActive ? 'Unsort' : 'Sort by country'}
    </button>
  )
}