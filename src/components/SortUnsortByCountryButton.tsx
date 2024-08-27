import { useUsers } from "../hooks/useUsers.ts"


export function SortUnsortByCountryButton () {
  const { state, dispatch } = useUsers()

  const handleSortButton = () => {
    if (!state.isSortByCountryActive) {
      dispatch({ type: 'SORT_BY_COUNTRY' })
    } else {
      dispatch({ type: 'UNSORT' })
    }
  }

  return (
    <button onClick={handleSortButton}>
      {state.isSortByCountryActive ? 'Unsort' : 'Sort by country'}
    </button>
  )
}