import type { Action, State } from "../types.d.ts"

export const usersInitialState: State = {
  fetchedUsers: [],
  shownUsers: [],
  isColorActive: false,
  isSortByCountryActive: false
}

export const usersReducer = (state: State, action: Action) => {
  if (action.type === 'SET_FETCHED_USERS') {
    return {
      ...state,
      fetchedUsers: action.payload,
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

    const unSortedUsers = [...state.fetchedUsers].filter(originalUser =>
      state.shownUsers.some(shownUser => shownUser.login.uuid === originalUser.login.uuid)
    )

    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      shownUsers: !state.isSortByCountryActive ? sortedUsers : unSortedUsers
    }
  }

  if (action.type === 'DELETE_ROW') {
    return {
      ...state,
      shownUsers: [...state.shownUsers].filter((user) =>
        user.login.uuid !== action.payload)
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    const sortedUsers = [...state.fetchedUsers].sort((a, b) =>
      a.location.country.localeCompare(b.location.country))

    return {
      ...state,
      shownUsers: !state.isSortByCountryActive ? [...state.fetchedUsers] : sortedUsers
    }
  }

  return state
}
