import { NEW_FRAME } from '../actionCreators';

export default function frameCount(state = 0, action) {
  switch (action.type) {
    case NEW_FRAME:
      return state + 1;
    default:
      return state;
  }
}
