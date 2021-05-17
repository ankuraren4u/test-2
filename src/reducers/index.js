
import { ACTION_TYPES } from "./../actions";

export const rootReducer = (state = {}, action) => {
  const {type, ...rest} = action;
  switch (type) {
    case ACTION_TYPES.LOAD_AUDIO:
    case ACTION_TYPES.UPDATE_PLAYER_STATE:
    case ACTION_TYPES.SEEK:
    case ACTION_TYPES.UPDATE_CURRENT_TYPE:
      return {
        ...state, 
        ...rest
      }
    default: 
      return state;
  }
}