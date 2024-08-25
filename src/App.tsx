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
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Country</th>
          </tr>
        </thead>
      
        <tbody>
          {
            users.map(user => (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>

                <td>
                  {user.name.first}
                </td>

                <td>
                  {user.name.last}
                </td>

                <td>
                  {user.location.country}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
