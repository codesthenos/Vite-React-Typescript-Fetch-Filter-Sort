import type { Action, State } from "../types.d.ts"
//Selectors
import { getFilteredUsers, getSortedByCountryUsers, getUsersNotDeleted } from "../selectors/usersSelectors.ts"

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
        ? getSortedByCountryUsers(filteredUsers)
        : filteredUsers
    }
  }

  if (action.type === 'DELETE_ROW') {
    const userDeleted = state.shownUsers.find(user =>
      user.login.uuid === action.payload
    )

    const updatedDeletedUsers = userDeleted
      ? [...state.deletedUsers, userDeleted]
      : state.deletedUsers

    const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, updatedDeletedUsers), state.filterCountryValue)

    return {
      ...state,
      deletedUsers: updatedDeletedUsers,
      shownUsers: state.isSortByCountryActive
        ? getSortedByCountryUsers(filteredUsers)
        : filteredUsers
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    const filteredUsers = getFilteredUsers(state.fetchedUsers, state.filterCountryValue)
    return {
      ...state, 
      deletedUsers: [],
      shownUsers: state.isSortByCountryActive
        ? getSortedByCountryUsers(filteredUsers)
        : filteredUsers
    }
  }

  if (action.type === 'FILTER_USERS_BY_COUNTRY') {
    const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers), action.payload)

    return {
      ...state,
      filterCountryValue: action.payload,
      shownUsers: state.isSortByCountryActive
        ? getSortedByCountryUsers(filteredUsers)
        : filteredUsers
    }
  }

  return state
}
