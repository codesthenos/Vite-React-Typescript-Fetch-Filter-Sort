import type { State, Action } from "../types.d.ts"

export const initialState: State = {
  usersFetched: [],
  isColorRowActive: false,
  filteredUsers: [],
  isSortByCountryActive: false,
  inputValue: ''
}

export const reducer = (state: State, action: Action) => {
  const { type } = action

  if (type === 'SET_USERS') {
    return {
      ...state,
      usersFetched: action.payload,
      filteredUsers: action.payload
    }
  }

  if (type === 'COLOR_UNCOLOR_ROWS') {
    return {
      ...state,
      isColorRowActive: !state.isColorRowActive
    }
  }

  if (type === 'SORT_UNSORT_BY_COUNTRY') {
    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      filteredUsers: !state.isSortByCountryActive
        ? [...state.filteredUsers].sort((a, b) =>
          a.location.country.localeCompare(b.location.country))
        : state.usersFetched
    }
  }

  if (type === 'DELETE_ROW') {
    return {
      ...state,
      filteredUsers: state.filteredUsers.filter(user =>
        user.login.uuid !== action.payload
      )
    }
  }

  if (type === 'RESET_TO_USERS') {
    return {
      ...state,
      filteredUsers: state.usersFetched,
      inputValue: '',
      isSortByCountryActive: false
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
