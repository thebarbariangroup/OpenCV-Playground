import transforms from './transforms';
import schemas    from './settings/schemas';
import dragula from '../lib/dragula';

export default class Composer {

  constructor (outputController) {
    this.outputController = outputController;
    this.el = document.querySelector('.Composer');
    this.inventoryEl = document.querySelector('.ComposerInventory');
    this.queueEl = document.querySelector('.ComposerQueue');
    this.queue = [];
    this.composition = () => [];

    this._init();
  }

  _init () {
    this._setupDragula();
    this._renderInventory();
    this._setupEventHandlers();
  }

  _renderInventory () {
    this.inventoryEl.innerHTML = schemas.reduce((acc, cur) => {
      return acc + this._inventoryItemHtml(cur);
    }, '');
    this.inventoryItemEls = this.inventoryEl.querySelectorAll('.ComposerItem');
  }

  _setupDragula () {
    this.drake = dragula([this.inventoryEl, this.queueEl], {
      copySortSource: true,
      removeOnSpill: true,
      copy: (el, source) => {
        return source === this.inventoryEl;
      },
      accepts: (el, target, source, sibling) => {
        const queueToQueue = source === this.queueEl && target === this.queueEl;
        const invToQueue = source === this.inventoryEl && target === this.queueEl;
        return invToQueue || queueToQueue;
      },
    });
  }

  _setupEventHandlers () {
    this._onDrop = this._onDrop.bind(this);
    this.drake.on('drop', this._onDrop);

    this._onRemove = this._onRemove.bind(this);
    this.drake.on('remove', this._onRemove);
  }

  _onDrop (el, target, source, sibling) {
    this._readQueue();
    this._updateComposition();
  }

  _onRemove (el, container, source) {
    this._readQueue();
    this._updateComposition();
  }

  _readQueue () {
    this.queue = Array.from(this.queueEl.children);
  }

  _updateComposition () {
    const composedList = this.queue.map((item) => {
      const type = item.dataset.transformType;
      const name = item.dataset.transformName;
      const schema = schemas.find((schema) => schema.type === type && schema.name === name);
      const transform = transforms[type] && transforms[type][name];

      if (!schema || !transform) {
        console.log('Transform or schema does not exist: ', type, name);
      }

      return transform(schema.defaultConf);
    });

    this.composition = () => composedList;
    this.outputController.setTransforms(this.composition);
  }

  _inventoryItemHtml (schema) {
    return `
      <li class="composer-item controls-button ComposerItem"
        data-transform-type="${schema.type}"
        data-transform-name="${schema.name}"
        draggable="true"
      >
        ${schema.name}
      </li>
    `;
  }

}