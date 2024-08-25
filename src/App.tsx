import { useEffect, useState } from 'react'
import './App.css'
import type { APIResponse, User } from './types.d.ts'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then((jsonData: APIResponse) => {
        setUsers(jsonData.results)
      })
      .catch((err: unknown) => {
        console.error(err)
      })

  }, [])

  return (
    <>
      <h1>CODESTHENOS</h1>
      <h3>USER FETCH APP</h3>
      <ul>
        {
          users.map(user => (
            <li key={user.email}>
              {user.name.last}
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
