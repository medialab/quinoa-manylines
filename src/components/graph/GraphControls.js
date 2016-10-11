/**
 * Graph Controls Component
 * =========================
 *
 * Component rendering the graph's controls such as camera zoom & pan.
 */
import React, {Component} from 'react';

export default class GraphControls extends Component {
  constructor(props, context) {
    super(props, context);

    // Binding methods for performance
    this.rescale = this.rescale.bind(this);
    this.zoom = this.zoom.bind(this);
    this.unzoom = this.unzoom.bind(this);
  }

  rescale() {
    const camera = this.props.camera;

    if (!camera)
      return;

    sigma.misc.animation.camera(
      camera,
      {x: 0, y: 0, angle: 0, ratio: 1},
      {duration: 150}
    );
  }

  zoom() {
    const camera = this.props.camera;

    if (!camera)
      return;

    sigma.misc.animation.camera(
      camera,
      {ratio: camera.ratio / 1.5},
      {duration: 150}
    );
  }

  unzoom() {
    const camera = this.props.camera;

    if (!camera)
      return;

    sigma.misc.animation.camera(
      camera,
      {ratio: camera.ratio * 1.5},
      {duration: 150}
    );
  }

  render() {
    return (
      <div className="controls">
        <div className="control" onClick={this.zoom}>
          <button>+</button>
        </div>
        <div className="control" onClick={this.unzoom}>
          <button>-</button>
        </div>
        <div className="control" onClick={this.rescale}>
          <button>o</button>
        </div>
      </div>
    );
  }
}
