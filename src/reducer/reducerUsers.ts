import type { State, Action } from "../types.d.ts"

export const initialState: State = {
  usersFetched: [],
  isColorRowActive: false,
  preSortUsers: [],
  filteredUsers: [],
  deletedUsers:[],
  isSortByCountryActive: false,
  inputValue: ''
}

export const reducer = (state: State, action: Action) => {
  const { type } = action

  if (type === 'SET_USERS') {
    return {
      ...state,
      usersFetched: action.payload,
      filteredUsers: action.payload,
      preSortUsers: action.payload
    }
  }

  if (type === 'COLOR_UNCOLOR_ROWS') {
    return {
      ...state,
      isColorRowActive: !state.isColorRowActive
    }
  }

  if (type === 'SORT_BY_COUNTRY') {
    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      preSortUsers: [...state.filteredUsers],
      filteredUsers: [...state.filteredUsers].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    }
  }

  if (type === 'UNSORT') {
    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      filteredUsers: state.preSortUsers
    }
  }

  if (type === 'DELETE_ROW') {
    const userToDelete = state.filteredUsers.find(user =>
      user.login.uuid === action.payload
    )

    return {
      ...state,
      filteredUsers: state.filteredUsers.filter(user =>
        user.login.uuid !== action.payload
      ),
      deletedUsers: userToDelete
        ? [...state.deletedUsers, userToDelete]
        : state.deletedUsers,
      preSortUsers: state.preSortUsers.filter(user =>
        user.login.uuid !== action.payload
      )
    }
  }

  if (type === 'RECOVER_DELETES') {
    return {
      ...state,
      preSortUsers: state.filteredUsers,
      filteredUsers: state.preSortUsers
    }
  }

  if (type === 'FILTER_USERS_BY_COUNTRY') {
    return {
      ...state,
      inputValue: action.payload,
      filteredUsers: state.filteredUsers.filter(user =>
        user.location.country.toLowerCase().includes(action.payload.toLowerCase())
      )
    }
  }

  return state
}
