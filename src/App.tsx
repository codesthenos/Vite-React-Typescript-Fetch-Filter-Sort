//Components
import { useEffect, useMemo, useRef, useState } from 'react'
import { UsersTable } from './components/UsersTable.tsx'
import type { User } from './types.d.ts'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterByCountryValue, setFilterByCountryValue] =useState('')

  const originalUsers = useRef<User[]>(users)

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

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
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
    return sortByCountry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users
  }

  const filteredUsers = useMemo(() => {
    console.log('calculate filtered')
    return filterUsers(users)
  }, [users, filterByCountryValue])

  const sortedUsers = useMemo(() => {
    console.log('calculate sorted')
    return sortUsers(filteredUsers)
  }, [filteredUsers, sortByCountry])
  
  return (
    <>
      <h1>CODESTHENOS</h1>

      <h3>USER FETCH APP</h3>

      <header>
        <button onClick={toggleColors}>
          {showColors ? 'Remove Colors' : 'Color rows'}
        </button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'Unsort' : 'Sort by Country'}
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
      
      <UsersTable users={sortedUsers} showColors={showColors} deleteUser={handleDelete} />
    </>
  )
}

export default App
