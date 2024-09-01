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
  
  console.log('PROP', sortProperty)
  console.log('REF', prevSortPropRef.current)

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
    if (sortProperty === prevSortPropRef.current) return users

    if (sortProperty === SortBy.NONE) return users
    console.log('calculate sorted')

    if (sortProperty === SortBy.NAME) {
      return users.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first))
    }

    if (sortProperty === SortBy.SURNAME) {
      return users.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last))
    }

    if (sortProperty === SortBy.COUNTRY) {
      return users.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country))
    }
    return users
  }

  const filteredUsers = useMemo(() => {
    console.log('calculate filtered')
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
