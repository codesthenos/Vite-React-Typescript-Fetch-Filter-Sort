//Components
import { useEffect, useMemo, useRef, useState } from 'react'
import { UsersTable } from './components/UsersTable.tsx'
import type { User } from './types.d.ts'
import { SortBy } from './constants.ts'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortProperty, setSortProperty] = useState<string>(SortBy.NONE)
  const [filterByCountryValue, setFilterByCountryValue] =useState('')

  const originalUsers = useRef(users)

  const prevSortPropRef = useRef(sortProperty)
  useEffect(() => {
    prevSortPropRef.current = sortProperty
  }, [sortProperty])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

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
      <h1>CODESTHENOS</h1>

      <h3>USER FETCH APP</h3>

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
          onChange={(e) => setFilterByCountryValue(e.target.value)}
          value={filterByCountryValue}
        />
      </header>
      
      <UsersTable users={sortedUsers} showColors={showColors} deleteUser={handleDelete} toggleSortProperty={toggleSortProperty} />
    </>
  )
}

export default App
