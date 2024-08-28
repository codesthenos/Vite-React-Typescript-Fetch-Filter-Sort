import { ColorRowButton } from "./ColorRowButton.tsx"
//import { FilterByCountryInput } from "./FilterByCountryInput.tsx"
//import { ResetDeletedButton } from "./ResetDeletedButton.tsx"
import { SortUnsortByCountryButton } from "./SortUnsortByCountryButton.tsx"

export function Header () {
  return (
    <header style={{ display: 'flex', gap: '24px', placeContent: 'center' }}>
      <ColorRowButton />

      <SortUnsortByCountryButton />
    </header>
  )
}
