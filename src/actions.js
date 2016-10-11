/**
 * Quinoa Manylines Actions
 * =========================
 */
import {
  GRAPH_SELECT
} from './constants';

/**
 * Select a graph.
 */
export function selectGraph(name) {
  return {type: GRAPH_SELECT, name};
}
