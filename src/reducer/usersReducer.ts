import type { Action, State } from "../types.d.ts"
//Selectors
import { getFilteredUsers, getSortedUsers, getUsersNotDeleted } from "../selectors/usersSelectors.ts"
import { SortBy } from "../constants.ts"

export const usersInitialState: State = {
  fetchedUsers: [],
  shownUsers: [],
  deletedUsers: [],
  isColorActive: false,
  sortProperty: SortBy.NONE,
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

  if (action.type === 'SET_SORT_PROPERTY') {
    const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers), state.filterCountryValue)
    
    return {
      ...state,
      sortProperty: action.payload,
      shownUsers: action.payload !== SortBy.NONE
        ? getSortedUsers(filteredUsers, action.payload)
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
      shownUsers: state.sortProperty !== SortBy.NONE
        ? getSortedUsers(filteredUsers, state.sortProperty)
        : filteredUsers
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    const filteredUsers = getFilteredUsers(state.fetchedUsers, state.filterCountryValue)
    return {
      ...state, 
      deletedUsers: [],
      shownUsers: state.sortProperty !== SortBy.NONE
        ? getSortedUsers(filteredUsers, state.sortProperty)
        : filteredUsers
    }
  }

  if (action.type === 'FILTER_USERS_BY_COUNTRY') {
    const filteredUsers = getFilteredUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers), action.payload)

    return {
      ...state,
      filterCountryValue: action.payload,
      shownUsers: state.sortProperty !== SortBy.NONE
        ? getSortedUsers(filteredUsers, state.sortProperty)
        : filteredUsers
    }
  }

  return state
}
