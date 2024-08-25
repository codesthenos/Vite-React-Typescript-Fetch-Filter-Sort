import { UsersTable } from './components/UsersTable.tsx'

function App () {
  console.log('App.tsx RENDER')

  return (
    <>
      <h1>CODESTHENOS</h1>

      <h3>USER FETCH APP</h3>
      
      <UsersTable />
    </>
  )
}

export default App
