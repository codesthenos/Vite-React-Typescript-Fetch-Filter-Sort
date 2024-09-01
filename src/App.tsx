//Components
import { useEffect, useMemo, useRef, useState } from 'react'
import { UsersTable } from './components/UsersTable.tsx'
import type { APIResponse, User } from './types.d.ts'
import { SortBy } from './constants.ts'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortProperty, setSortProperty] = useState<string>(SortBy.NONE)
  const [filterByCountryValue, setFilterByCountryValue] =useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const originalUsers = useRef(users)

  const prevSortPropRef = useRef(sortProperty)
  useEffect(() => {
    prevSortPropRef.current = sortProperty
  }, [sortProperty])

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch(`https://randomuser.me/api?seed=codesthenos&results=10&page=${currentPage}`)
      .then(res => {
        if (!res.ok) throw new Error('Error fetching users')
        return res.json()
      })
      .then((res: APIResponse) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err: unknown) => {
        console.error(err)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortProperty = (property: string) => {
    const newSortingProperty = sortProperty === property ? SortBy.NONE : property
    setSortProperty(newSortingProperty)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleRecover = () => {
    setUsers(originalUsers.current)
  }

  const filterUsers = (users: User[]) => {
    return users.filter(user =>
      user.location.country.toLowerCase()
        .includes(filterByCountryValue.toLowerCase())
    )
  }

  const sortUsers = (users: User[]) => {
    if (sortProperty === prevSortPropRef.current || sortProperty === SortBy.NONE) return users

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

      <h3>PAGE {currentPage}</h3>

      <header>
        <button onClick={toggleColors}>
          {showColors ? 'Remove Colors' : 'Color rows'}
        </button>

        <button onClick={() => { toggleSortProperty(SortBy.COUNTRY) }}>
          {sortProperty === SortBy.COUNTRY ? 'Unsort' : 'Sort by Country'}
        </button>

        <button onClick={handleRecover}>
          Recover deleteds
        </button>

        <input
          placeholder='Filter by country'
          onChange={(e) => { setFilterByCountryValue(e.target.value) }}
          value={filterByCountryValue}
        />
      </header>

      <main>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>Fatal Error</p>}
        {!loading && !error && users.length === 0 && <p>No users found</p>}
        {!loading && !error && users.length > 0 && <UsersTable users={sortedUsers} showColors={showColors} deleteUser={handleDelete} toggleSortProperty={toggleSortProperty} />}

        {!loading && !error &&
        <button onClick={() => { setCurrentPage(currentPage + 1) }}>
          Next Page
        </button>
        } 
      </main>
    </>
  )
}

export default App
