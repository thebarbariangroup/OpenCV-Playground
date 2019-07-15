import transforms from './transforms';
import schemas    from './settings/schemas';

export default class Composer {

  constructor () {
    this.el = document.querySelector('.Composer');
    this.inventoryEl = document.querySelector('.ComposerInventory');
    this.queueEl = document.querySelector('.ComposerQueue');

    this._init();
  }

  _init () {
    this._renderInventory();
    this._setupEventHandlers();
  }

  _renderInventory () {
    this.inventoryEl.innerHTML = schemas.reduce((acc, cur) => {
      return acc + this._inventoryItemHtml(cur);
    }, '');
    this.inventoryItemEls = this.inventoryEl.querySelectorAll('.ComposerItem');
  }

  _setupEventHandlers () {
    this._onItemDragstart = this._onItemDragstart.bind(this);
    this.inventoryItemEls.forEach((el) => {
      el.addEventListener('dragstart', this._onItemDragstart);
    });
    // this.inventoryEl.addEventListener('dragover', this._onInventoryDragover.bind(this));
    this.queueEl.addEventListener('dragover', this._onQueueDragover.bind(this));
    this.queueEl.addEventListener('drop', this._onQueueDrop.bind(this));
  }

  _onQueueDragover (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  _onQueueDrop (e) {
    e.preventDefault();
    debugger;
  }

  _onItemDragstart (e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  }

  _inventoryItemHtml (schema) {
    return `
      <li class="composer_item controls-button ComposerItem"
        data-transform-type="${schema.type}"
        data-transform-name="${schema.name}"
        draggable="true"
      >
        ${schema.name}
      </li>
    `;
  }



}