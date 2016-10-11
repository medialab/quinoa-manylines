/**
 * Quinoa Manylines Application Component
 * =======================================
 *
 * Root component of the application.
 */
import React from 'react';
import GraphLayout from '../components/graph/GraphLayout';

export default function Application(props) {
  const {
    quinoa: {
      actions: quinoaActions,
      store: {
        camera,
        currentGraph,
        currentSlide
      }
    },
    editorComponent,
    draftComponent
  } = props;

  return (
    <div id="wrapper">
      <div id="graph">
        <GraphLayout
          quinoaActions={quinoaActions}
          camera={camera}
          currentGraph={currentGraph}
          currentSlide={currentSlide} />
        <div id="draft">
          {React.createElement(draftComponent)}
        </div>
      </div>
      <div id="editor">
        {React.createElement(editorComponent)}
      </div>
    </div>
  );
}
