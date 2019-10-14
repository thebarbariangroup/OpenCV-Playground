import transforms   from '../transforms';
import schemas      from '../settings/schemas';
import compositions from '../settings/compositions';


// import Composer from './Composer';

export default class OutputController {

  constructor (conf) {
    this.output = conf.output;

    this._init();
  } 

  _init () {
    this.connection = new WebSocket(`wss://${location.hostname}:8443`);

    this._handleQueryOptions();
    this._setupEventHandlers();
  }

  _setupEventHandlers () {
    this.connection.onopen = () => {
      console.log('socket open');
    };

    this.connection.onerror = (error) => {
      console.log('socket error', error);
    };

    this._onMessage = this._onMessage.bind(this);
    this.connection.onmessage = this._onMessage;
  }

  _handleQueryOptions () {
    const query = location.search.replace('?', '');

    query.split('&').forEach((pair) => {
      const splitPair = pair.split('=');

      if (splitPair[0] === 'layout' && splitPair[1] === 'rotate') {
        document.body.classList.add('rotate');
      }
    });
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

  buildComposition (compositionData) {
    return () => compositionData.map((transformData) => {
      const { category, name, opts } = transformData;
      return transforms[category][name](opts);
    });
  }

  _onMessage (message) {
    const messageData = this._jsonParse(message.data);
    console.log('socket onMessage', messageData);

    if (messageData.action === 'RENDER_COMPOSITION') {
      const composition = this.buildComposition(messageData.payload);

      this.pause();
      this.setTransforms(composition);
      this.play();
    }
  }

  _jsonParse (string) {
    var obj;
    try {
      obj = JSON.parse(string);
    } catch (e) {
      console.log('invalid JSON: ', string);
      return;
    }
    return obj;
  }

}