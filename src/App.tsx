//User context
import { UsersProvider } from './context/UsersContext.tsx'
//Components
import { UsersTable } from './components/UsersTable.tsx'
import { Header } from './components/Header.tsx'

function App () {
  return (
    <UsersProvider>
      <h1>CODESTHENOS</h1>

      <h3>USER FETCH APP</h3>

      <Header />
      
      <UsersTable />
    </UsersProvider>
  )
}

export default App
