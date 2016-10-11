/**
 * Graph Selector Component
 * =========================
 *
 * Component displaying a select enabling you to select the current graph.
 */
import React from 'react';

const GRAPHS = [
  'arctic',
  'diaspora'
];

export default function GraphSelector(props) {
  const {
    selected,
    onChange
  } = props;

  return (
    <select className="selector" onChange={onChange} value={selected}>
      {GRAPHS.map(graph => (
        <option
          key={graph}
          value={graph}>
          {graph}
        </option>
      ))}
    </select>
  );
}
