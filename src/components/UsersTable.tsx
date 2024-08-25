import { useGetUsers } from "../hooks/useGetUsers.ts"

export function UsersTable () {
  const users = useGetUsers()

  return (
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
  )
}
