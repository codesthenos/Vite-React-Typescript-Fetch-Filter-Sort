/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
//Components
import { useMemo, useState } from 'react'
import { UsersTable } from './components/UsersTable.tsx'
import type { User } from './types.d.ts'
import { SortBy } from './constants.ts'
import { useUsers } from './hooks/useUsers.ts'
import { TotalUsers } from './components/TotalUsers.tsx'

function App () {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sortProperty, setSortProperty] = useState<string>(SortBy.NONE)
  const [filterByCountryValue, setFilterByCountryValue] = useState('')

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortProperty = (property: string) => {
    const newSortingProperty = sortProperty === property ? SortBy.NONE : property
    setSortProperty(newSortingProperty)
  }

  const handleDelete = () => {
    // NO FUNCIONA const updatedUsers =  [...fetchedUsers].map((user) => user.email === email ? { ...user, isDeleted: true } : { ...user, isDeleted: false })
  }

  const handleRecover = async () => {
    await refetch() // no tiene sentido, pero da igual
  }

  const filterUsers = (users: User[]) => {
    return users.filter(user =>
      user.location.country.toLowerCase()
        .includes(filterByCountryValue.toLowerCase())
    )
  }

  const sortUsers = (users: User[]) => {
    if (sortProperty === SortBy.NONE) return users

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.SURNAME]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }

    return users.toSorted((a, b) => {
      const getProperty = compareProperties[sortProperty]

      return getProperty(a).localeCompare(getProperty(b))
    })
  }

  const filteredUsers = useMemo(() => {
    return filterUsers(users)
  }, [users, filterByCountryValue])

  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers)
  }, [filteredUsers, sortProperty])

  return (
    <>
      <h2>CODESTHENOS</h2>

      <TotalUsers />

      <div>
        {
          !isLoading && !isError && hasNextPage &&
            <button onClick={ () => { void fetchNextPage() } }>
              Load more users
            </button>
        }
        {
          !hasNextPage && <h2>No more users</h2>
        }
      </div>

      <header>
        <button onClick={toggleColors}>
          {showColors ? 'Remove Colors' : 'Color rows'}
        </button>

        <button onClick={() => { toggleSortProperty(SortBy.COUNTRY) }}>
          {sortProperty === SortBy.COUNTRY ? 'Unsort' : 'Sort by Country'}
        </button>

        <button onClick={() => handleRecover}>
          Recover deleteds
        </button>

        <input
          placeholder='Filter by country'
          onChange={(e) => { setFilterByCountryValue(e.target.value) }}
          value={filterByCountryValue}
        />
      </header>

      <main>
        {users.length > 0 &&
          <UsersTable
            users={sortedUsers}
            showColors={showColors}
            deleteUser={handleDelete}
            toggleSortProperty={toggleSortProperty}
          />
        }

        {isLoading && <p>Loading...</p>}

        {isError && <p>Fatal Error</p>}

        {!isError && users.length === 0 && <p>No users found</p>}
      </main>
    </>
  )
}

export default App
