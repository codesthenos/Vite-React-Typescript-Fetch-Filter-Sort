import { useUsers } from "../hooks/useUsers.ts"


export function FilterByCountryInput () {
  const { state, dispatch } = useUsers()

  const handleCountryFilterInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: 'FILTER_USERS_BY_COUNTRY', payload: event.target.value })
  }

  return (
    <input
      placeholder="Filter by country"
      onChange={handleCountryFilterInput}
      value={state.filterCountryValue}
    />
  )
}