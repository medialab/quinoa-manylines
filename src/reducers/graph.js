/**
 * Quinoa Manylines Graph Reducer
 * ===============================
 */
import {resolver} from '../../../../src/helpers';
import {
  GRAPH_SELECT
} from '../constants';

const DEFAULT_STATE = {
  current: 'arctic'
};

export default resolver(DEFAULT_STATE, {
  [GRAPH_SELECT]: (state, {name}) => {
    return {
      ...state,
      current: name
    };
  }
});
