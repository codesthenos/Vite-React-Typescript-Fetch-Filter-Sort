import type { Action, State } from "../types.d.ts"
import { SortBy } from "../constants.ts"

export const usersInitialState: State = {
  users: [],
  isColorActive: false,
  sortProperty: SortBy.NONE,
  filterCountryValue: ''
}

export const usersReducer = (state: State, action: Action) => {
  if (action.type === 'SET_FETCHED_USERS') {
    return {
      ...state,
      users: action.payload
    }
  }

  if (action.type === 'SET_COLORS') {
    return {
      ...state,
      isColorActive: !state.isColorActive
    }
  }

  if (action.type === 'SET_SORT_PROPERTY') {
    return {
      ...state,
      sortProperty: action.payload
    }
  }

  if (action.type === 'DELETE_ROW') {
    return {
      ...state,
      users: state.users.map(user =>
        user.login.uuid === action.payload ? { ...user, isDeleted: true } : user
      )
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    return {
      ...state,
      users: state.users.map(user => {
        return { ...user, isDeleted: false }
      })
    }
  }

  if (action.type === 'FILTER_USERS_BY_COUNTRY') {
    return {
      ...state,
      filterCountryValue: action.payload
    }
  }

  return state
}
