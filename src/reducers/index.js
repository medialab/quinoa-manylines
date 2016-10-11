/**
 * Quinoa Manylines Reducers Endpoint
 * ===================================
 *
 * Combining the app's reducers.
 */
import graph from './graph';
import {combineReducers} from 'redux';

export default combineReducers({
  graph
});
