import type { State, Action } from "../types.d.ts"

export const initialState: State = {
  fetchedUsers: [],
  isColorRowActive: false,
  deletedUsers:[],
  isSortByCountryActive: false,
  filterCountryValue: ''
}

export const reducer = (state: State, action: Action) => {
  const { type } = action

  if (type === 'SET_USERS') {
    return {
      ...state,
      fetchedUsers: action.payload
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
      isSortByCountryActive: !state.isSortByCountryActive
    }
  }

  if (type === 'DELETE_ROW') {
    const userToDelete = [...state.fetchedUsers].find(user =>
      user.login.uuid === action.payload
    )

    return {
      ...state,
      fetchedUsers: [...state.fetchedUsers].filter(user =>
        user.login.uuid !== action.payload
      ),
      deletedUsers: userToDelete
        ? [...state.deletedUsers, userToDelete]
        : state.deletedUsers,
    }
  }

  if (type === 'RECOVER_DELETES') {
    return {
      ...state,
      fetchedUsers: [...state.fetchedUsers, ...state.deletedUsers],
      deletedUsers: []
    }
  }

  if (type === 'FILTER_USERS_BY_COUNTRY') {
    return {
      ...state,
      filterCountryValue: action.payload
    }
  }

  return state
}
