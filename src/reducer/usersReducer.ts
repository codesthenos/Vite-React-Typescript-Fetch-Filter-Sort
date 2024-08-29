import type { Action, State } from "../types.d.ts"
//Selectors
import { getFilteredUsers, getSortedUsers, getUsersNotDeleted } from "../selectors/usersSelectors.ts"

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
    const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers), state.filterCountryValue)
    
    return {
      ...state,
      isSortByCountryActive: !state.isSortByCountryActive,
      shownUsers: !state.isSortByCountryActive
        ? getSortedUsers(filteredUsers)
        : filteredUsers
    }
  }

  if (action.type === 'DELETE_ROW') {
    const userDeleted = state.fetchedUsers.find(user =>
      user.login.uuid === action.payload
    )

    const usersDeleted = userDeleted
      ? [...state.deletedUsers, userDeleted]
      : state.deletedUsers

    return {
      ...state,
      deletedUsers: usersDeleted,
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(getUsersNotDeleted(state.fetchedUsers, usersDeleted))
        : getUsersNotDeleted(state.fetchedUsers, usersDeleted)
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    const filteredUsers = getFilteredUsers(state.fetchedUsers, state.filterCountryValue)
    return {
      ...state, 
      deletedUsers: [],
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(filteredUsers)
        : filteredUsers
    }
  }

  if (action.type === 'FILTER_USERS_BY_COUNTRY') {
    const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers), action.payload)

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
