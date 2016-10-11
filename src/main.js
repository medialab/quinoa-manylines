/**
 * Quinoa Manylines Application Endpoint
 * ======================================
 *
 * Rendering the application.
 */
import uuid from 'uuid';
import React from 'react';
import {render} from 'react-dom';
import Application from './containers/Application';
import Quinoa from 'quinoa';
import {createStore} from 'redux';
import reducers from './reducers';
import {Provider} from 'react-redux';

/**
 * Create an editor state object from slides & resources.
 *
 * @param  {array}  slides - Slides list.
 * @return {object}        - Editor state object.
 */
export function createEditorState(slides = []) {
  const slidesMap = {};

  slides.forEach(slide => (slidesMap[slide.id] = slide));

  return {
    current: slides[0].id,
    slides: slidesMap,
    order: slides.map(slide => slide.id)
  };
}

/**
 * Create a full state from slides & resources.
 *
 * @param  {array}  slides - Slides list.
 * @return {object}        - Quinoa state object.
 */
export function createState(slides = []) {
  return {
    editor: createEditorState(slides)
  };
}

// TODO: encapsulate in Quinoa
// import {createState} from '../../../src/state';

// TODO: this should move away to be encapsulated in quinoa
import {EditorState} from 'draft-js';

let CurrentApplication = Application;

const store = createStore(reducers);
window.store = store;

/**
 * Style.
 */
import 'normalize.css';
import 'codemirror/lib/codemirror.css';
import '../style/codemirror-theme.css';
import '../style/quinoa.css';
import '../style/manylines.scss';

/**
 * Creating our editor.
 */
function createSlide(data) {
  return {
    id: uuid.v4(),
    title: data.title || '',
    markdown: data.markdown || '',
    draft: EditorState.createEmpty(),
    meta: {
      graph: 'arctic',
      camera: {
        x: 0,
        y: 0,
        angle: 0,
        ratio: 1
      }
    }
  };
}

const DEFAULT_STATE = createState([
  createSlide({title: 'First slide'}),
  createSlide({title: 'Second slide'})
]);

const quinoa = new Quinoa({
  defaultState: DEFAULT_STATE,
  slideCreator: createSlide
});
window.quinoa = quinoa;

/**
 * Rendering logic.
 */
const mountNode = document.getElementById('mount');

// NOTE: it's probably better to plug the state somewhere else for perf reasons
function mapStore() {
  const {editor} = quinoa.getState();

  const currentSlide = editor.slides[editor.current];

  return {
    currentSlide: editor.current,
    currentGraph: currentSlide.meta.graph,
    camera: currentSlide.meta.camera
  };
}

function renderApplication() {
  const group = (
    <Provider store={store}>
      <CurrentApplication
        quinoa={{actions: quinoa.getActions(), store: mapStore()}}
        editorComponent={quinoa.getEditorComponent()}
        draftComponent={quinoa.getDraftComponentForSlide()} />
    </Provider>
  );

  render(group, mountNode);
}

renderApplication();

quinoa.subscribe(renderApplication);

/**
 * Hot-reloading.
 */
module.hot.accept('./containers/Application', function() {
  CurrentApplication = require('./containers/Application').default;
  renderApplication();
});

quinoa.hot(renderApplication);
