import transforms   from './transforms';
import schemas      from './settings/schemas';
import compositions from './settings/compositions';

import Composer from './Composer';

export default class OutputController {

  constructor (conf) {
    this.output = conf.output;
    this.playEl = document.querySelector('.ControlsPlay');
    this.pauseEl = document.querySelector('.ControlsPause');
    this.compositionsContainerEl = document.querySelector('.ControlsCompositionsContainer');

    this._init();
  }

  _init () {
    this.composer = new Composer(this);

    this._setupControls();
    this._setupEventHandlers();
  }

  _setupEventHandlers () {
    this._onCompositionClick = this._onCompositionClick.bind(this);
    this.compositionEls.forEach((el) => {
      el.addEventListener('click', this._onCompositionClick);
    });

    this.playEl.addEventListener('click', this.play.bind(this));
    this.pauseEl.addEventListener('click', this.pause.bind(this));
  }

  play () {
    this.output.play();
  }

  pause () {
    this.output.pause();
  }

  setTransforms (tfs) {
    this.output.setTransforms(tfs);
  }

  _onCompositionClick (e) {
    const compositionId = e.target.dataset.compositionId;
    const tfs = compositions[compositionId].transforms;

    this.output.pause();
    this.output.setTransforms(tfs);
    this.output.play();
  }

  _setupControls () {
    this.compositionsContainerEl.innerHTML = compositions.reduce((acc, cur, idx) => {
      return acc + this._compositionHtml(idx, cur.name);
    }, '');
    this.compositionEls = document.querySelectorAll('.ControlsComposition');
  }

  _compositionHtml (idx, name) {
    return `<button class="controls-button ControlsComposition" data-composition-id="${idx}">${name}</button>`;
  }

}