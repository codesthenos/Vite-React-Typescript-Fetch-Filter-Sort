import type { Action, State } from "../types.d.ts"

export const usersInitialState: State = {
  shownUsers: [],
  isColorActive: false
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

  return state
}
