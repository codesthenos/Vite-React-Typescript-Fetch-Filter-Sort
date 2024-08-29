import { ColorRowButton } from "./ColorRowButton.tsx"
import { SortUnsortByCountryButton } from "./SortUnsortByCountryButton.tsx"
import { ResetDeletedButton } from "./ResetDeletedButton.tsx"
import { FilterByCountryInput } from "./FilterByCountryInput.tsx"

export function Header () {
  return (
    <header style={{ display: 'flex', gap: '24px', placeContent: 'center' }}>
      <ColorRowButton />

      <SortUnsortByCountryButton />

      <ResetDeletedButton />

      <FilterByCountryInput />
    </header>
  )
}
