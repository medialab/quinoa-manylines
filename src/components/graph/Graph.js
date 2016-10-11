/**
 * Graph Component
 * ================
 *
 * Component designed to handle the sigma graph.
 */
import React, {Component} from 'react';
import GraphControls from './GraphControls';
import GraphSelector from './GraphSelector';
import debounce from 'lodash/debounce';

/**
 * Constants.
 */
const SIGMA_SETTINGS = {
  labelThreshold: 7,
  minNodeSize: 2,
  edgeColor: 'default',
  defaultEdgeColor: '#D1D1D1',
  sideMargin: 20
};

/**
 * Sigma instance.
 */
const sigInst = new sigma({
  settings: SIGMA_SETTINGS
});

const camera = sigInst.addCamera('main');

/**
 * Helpers.
 */

// NOTE: I should probably rely on the camera's internal event instead
function monkeyPatchCamera(action) {
  const originalFn = camera.goTo;
  camera.goTo = function() {
    if (typeof action === 'function')
      action();
    return originalFn.apply(camera, arguments);
  };

  return () => {
    camera.goTo = originalFn;
  };
}

/**
 * Graph component.
 */
export default class Graph extends Component {
  constructor(props, context) {
    super(props, context);

    // Building the action
    this.updateSlide = () => {
      this.props.updateSlide(this.props.currentSlide, {meta: {camera: sigInst.saveCamera('main')}});
    };

    this.updateSlide = debounce(this.updateSlide, 100);
  }

  componentDidMount() {

    // Adding the relevant renderer
    this.renderer = sigInst.addRenderer({
      container: this.container,
      camera
    });

    // Loading the graph
    sigma.parsers.gexf(
      this.props.data,
      sigInst,
      () => sigInst.refresh()
    );

    // Hooking into the camera
    this.releaseCamera = monkeyPatchCamera(this.updateSlide);
  }

  componentDidUpdate(prev) {

    // If the graph has changed, we reset sigma
    if (prev.data !== this.props.data) {
      sigInst.graph.clear();
      sigma.parsers.gexf(
        this.props.data,
        sigInst,
        () => {
          camera.goTo({x: 0, y: 0, angle: 0, ratio: 1});
          sigInst.refresh();
          sigInst.loadCamera('main', this.props.camera);
        }
      );
    }

    // If the slide has changed, we try to apply the saved camera
    else if (prev.currentSlide !== this.props.currentSlide)
      sigInst.loadCamera('main', this.props.camera);
  }

  componentWillUnmount() {

    // Killing the renderer
    sigInst.killRenderer(this.renderer);

    // Releasing the camera
    this.releaseCamera();
  }

  render() {
    const {
      currentGraph,
      selectGraph
    } = this.props;

    return (
      <div id="graph-container">
        <GraphControls camera={camera} />
        <GraphSelector selected={currentGraph} onChange={selectGraph} />
        <div id="sigma-container" ref={div => (this.container = div)} />
      </div>
    );
  }
}
