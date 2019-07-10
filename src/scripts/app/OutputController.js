import presets from './settings/presets';

export default class OutputController {

  constructor (conf) {
    this.output = conf.output;
    this.presetsContainerEl = document.querySelector('.ControlsPresetsContainer');
    this.playEl = document.querySelector('.ControlsPlay');
    this.pauseEl = document.querySelector('.ControlsPause');

    this._init();
  }

  _init () {
    this._setupControls();
    this._setupEventHandlers();
  }

  _setupEventHandlers () {
    this._onPresetClick = this._onPresetClick.bind(this);
    this.presetEls.forEach((el) => {
      el.addEventListener('click', this._onPresetClick);
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

  setTransforms (transforms) {
    this.output.setTransforms(transforms);
  }

  _onPresetClick (e) {
    const presetId = e.target.dataset.presetId;
    const transforms = presets[presetId].transforms;

    this.output.pause();
    this.output.setTransforms(transforms);
    this.output.play();
  }

  _setupControls () {
    const html = presets.reduce((acc, cur, idx) => {
      return acc + this._presetHtml(idx, cur.name);
    }, '');
    
    this.presetsContainerEl.innerHTML = html;

    this.presetEls = document.querySelectorAll('.ControlsPreset');
  }

  _presetHtml (idx, name) {
    return `<button class="controls-button ControlsPreset" data-preset-id="${idx}">${name}</button>`;
  }

}