/**
 * Quinoa Manylines Graph Reducer
 * ===============================
 */
// import {resolver} from '../../../../src/helpers';
function quinoaResolver(defaultState, map) {
  return function(state = defaultState, action) {
    const lookup = map[action.type];

    if (typeof lookup === 'function')
      return lookup(state, action);

    return state;
  };
}

import {
  GRAPH_SELECT
} from '../constants';

const DEFAULT_STATE = {
  current: 'arctic'
};

const resolver = quinoaResolver(DEFAULT_STATE, {
  [GRAPH_SELECT]: (state, {name}) => {
    return {
      ...state,
      current: name
    };
  }
});
export default resolver;