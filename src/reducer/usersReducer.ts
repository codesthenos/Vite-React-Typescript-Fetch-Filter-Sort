import type { Action, State } from "../types.d.ts"

export const usersInitialState: State = {
  isColorActive: false
}

export const usersReducer = (state: State, action: Action) => {
  if (action.type === 'SET_COLORS') {
    return {
      ...state,
      isColorActive: !state.isColorActive
    }
  }

  return state
}
