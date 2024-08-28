//Components
import { UsersTable } from './components/UsersTable.tsx'
import { Header } from './components/Header.tsx'
//User context


function App () {
  return (
    <>
      <h1>CODESTHENOS</h1>

      <h3>USER FETCH APP</h3>

      <Header />
      
      <UsersTable />
    </>
  )
}

export default App
