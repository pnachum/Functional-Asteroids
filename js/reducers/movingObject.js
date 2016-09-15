import { MOVE } from '../actionCreators';
import mapToScreen from '../utils/mapToScreen';

export default function movingObject(state, action) {
  switch (action.type) {
    case MOVE:
      const newPos = state.pos.map((d, i) => d + state.vel[i]);
      const mappedPos = mapToScreen(newPos, state.radius);
      return {...state, pos: mappedPos };
    default:
      return state;
  }
}
