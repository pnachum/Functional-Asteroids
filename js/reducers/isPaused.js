import { TOGGLE_PAUSE } from '../actionCreators';

// state is a boolean
export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return !state;
    default:
      return state;
  }
}
