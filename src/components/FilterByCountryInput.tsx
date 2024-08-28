import { useState } from "react"


export function FilterByCountryInput () {
  const [filterCountryInputvalue, setFilterCountryInputvalue] = useState('')

  const handleCountryFilterInput: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    setFilterCountryInputvalue(e.target.value)
  }

  return (
    <input
      placeholder="Filter by country"
      onChange={handleCountryFilterInput}
      value={filterCountryInputvalue}
    />
  )
}