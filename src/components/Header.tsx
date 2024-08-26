import type { Props } from "../types.d.ts"


export function Header ({ state, dispatch }: Props) {
  const handleColorButton = () => {
    dispatch({ type: 'COLOR_UNCOLOR_ROWS' })
  }

  const resetUsers = () => {
    dispatch({ type: 'RESET_TO_USERS' })
  }

  const handleSortButton = () => {
    dispatch({ type: 'SORT_UNSORT_BY_COUNTRY'})
  }

  const handleCountryFilterInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: 'FILTER_USERS_BY_COUNTRY', payload: event.target.value })
  }

  return (
    <header style={{ display: 'flex', gap: '24px', placeContent: 'center' }}>
      <button onClick={handleColorButton}>Color rows</button>

      <button onClick={resetUsers}>Reset user list</button>

      <button onClick={handleSortButton}>
        {state.isSortByCountryActive ? 'Unsort' : 'Sort by country'}
      </button>

      <input
        placeholder="Filter by country"
        onChange={handleCountryFilterInput}
        value={state.inputValue}
      />
    </header>
  )
}
