import Vue from 'vue';

const EventBus = new Vue();

const events = {
  'SOCKET_OPEN': 'socketOpen',
  'UPDATE_COMPOSITION': 'updateComposition',
  'UPDATE_ITEM': 'updateItem',
  'REMOVE_ITEM': 'removeItem',
  'OPEN_EDITOR': 'openEditor',
};

export {
  EventBus,
  events 
};
