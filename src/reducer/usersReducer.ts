import type { Action, State } from "../types.d.ts"
//Selectors
import { getSortedUsers, getUsersNotDeleted } from "../selectors/usersSelectors.ts"

export const usersInitialState: State = {
  fetchedUsers: [],
  shownUsers: [],
  deletedUsers: [],
  isColorActive: false,
  isSortByCountryActive: false,
  filterCountryValue: ''
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
    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      shownUsers: !state.isSortByCountryActive
        ? getSortedUsers(getUsersNotDeleted(state))
        : getUsersNotDeleted(state)
    }
  }

  if (action.type === 'DELETE_ROW') {
    return {
      ...state,
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(upadated)
        : upadated,
      deletedUsers: deletedUsers
        ? [...state.deletedUsers, deletedUsers]
        : state.deletedUsers
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    return {
      ...state,
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(combinedUsers)
        : combinedUsers,
      deletedUsers: []
    }
  }

  if (action.type === 'FILTER_USERS_BY_COUNTRY') {
    const filteredUsers = getFilteredUsers(state)
    return {
      ...state,
      filterCountryValue: action.payload,
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(filteredUsers)
        : filteredUsers
    }
  }

  return state
}
