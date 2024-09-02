import { ColorRowButton } from "./ColorRowButton.tsx"
import { SortUnsortByCountryButton } from "./SortUnsortByCountryButton.tsx"
import { ResetDeletedButton } from "./ResetDeletedButton.tsx"
import { FilterByCountryInput } from "./FilterByCountryInput.tsx"
import { ManagePagesButtons } from "./ManagePagesButtons.tsx"

export function Header () {
  return (
    <header style={{ display: 'flex', gap: '24px', placeContent: 'center' }}>
      <ColorRowButton />

      <SortUnsortByCountryButton />

      <ResetDeletedButton />

      <FilterByCountryInput />

      <ManagePagesButtons />
    </header>
  )
}
