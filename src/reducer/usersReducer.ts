import type { Action, State } from "../types.d.ts"

export const usersInitialState: State = {
  shownUsers: [],
  isColorActive: false,
  isSortByCountryActive: false
}

export const usersReducer = (state: State, action: Action) => {
  if (action.type === 'SET_FETCHED_USERS') {
    return {
      ...state,
      shownUsers: action.payload
    }
  }

  if (action.type === 'SET_COLORS') {
    return {
      ...state,
      isColorActive: !state.isColorActive
    }
  }

  if (action.type === 'SORT_UNSORT_BY_COUNTRY') {
    const sortedUsers = [...state.shownUsers].sort((a, b) => 
      a.location.country.localeCompare(b.location.country))

    const unSortedUsers = [...action.payload]

    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      shownUsers: !state.isSortByCountryActive ? sortedUsers : unSortedUsers
    }
  }

  return state
}
