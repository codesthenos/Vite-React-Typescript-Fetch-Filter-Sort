import { useReducer, useEffect } from 'react'
//Reducer constants
import { initialState, reducer } from './reducer/reducerUsers.ts'
//Custom hook (fetch 100 rows)
import { useGetUsers } from './hooks/useGetUsers.ts'
//Components
import { UsersTable } from './components/UsersTable.tsx'
import { Header } from './components/Header.tsx'

function App () {
  const initialUsers = useGetUsers()

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_USERS', payload: initialUsers})
  }, [initialUsers])

  return (
    <>
      <h1>CODESTHENOS</h1>

      <h3>USER FETCH APP</h3>

      <Header state={state} dispatch={dispatch} />
      
      <UsersTable state={state} dispatch={dispatch} />
    </>
  )
}

export default App
