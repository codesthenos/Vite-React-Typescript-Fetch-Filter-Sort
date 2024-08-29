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
        ? getSortedUsers(getUsersNotDeleted(state.fetchedUsers, state.deletedUsers))
        : getUsersNotDeleted(state.fetchedUsers, state.deletedUsers)
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
    return {
      ...state, 
      deletedUsers: [],
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(state.fetchedUsers)
        : state.fetchedUsers
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
