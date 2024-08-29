import type { Action, State } from "../types.d.ts"
//Selectors
import { getSortedUsers, getFilteredUsers } from "../selectors/usersSelectors.ts"

export const usersInitialState: State = {
  fetchedUsers: [],
  readyToShowUsers: [],
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
      readyToShowUsers: action.payload,
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
        ? getSortedUsers(state.readyToShowUsers)
        : state.readyToShowUsers
    }
  }

  if (action.type === 'DELETE_ROW') {
    const upadatedReadyToShowUsers = state.readyToShowUsers.filter(user =>
      user.login.uuid !== action.payload
    )

    const deletedUsers = state.readyToShowUsers.find(user =>
      user.login.uuid === action.payload
    )

    return {
      ...state,
      readyToShowUsers: upadatedReadyToShowUsers,
      shownUsers: state.isSortByCountryActive
        ? getSortedUsers(upadatedReadyToShowUsers)
        : upadatedReadyToShowUsers,
      deletedUsers: deletedUsers
        ? [...state.deletedUsers, deletedUsers]
        : state.deletedUsers
    }
  }

  if (action.type === 'RECOVER_DELETES') {
    const recoveredUsers = state.deletedUsers.filter(deletedUser => 
      !state.readyToShowUsers.some(user =>
        user.login.uuid === deletedUser.login.uuid)
    )

    const combinedUsers = [...state.shownUsers, ...recoveredUsers]

    return {
      ...state,
      readyToShowUsers: combinedUsers,
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
