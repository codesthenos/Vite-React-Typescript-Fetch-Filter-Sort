import { useState } from "react"

export function SortUnsortByCountryButton () {
  const [sortByCountryButtonActive, setSortByCountryButton] = useState(false)

  const handleSortButton = () => {
    setSortByCountryButton(!sortByCountryButtonActive)
  }

  return (
    <button onClick={handleSortButton}>
      {sortByCountryButtonActive ? 'Unsort' : 'Sort by country'}
    </button>
  )
}