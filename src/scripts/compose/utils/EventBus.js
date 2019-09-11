import Vue from 'vue';

const EventBus = new Vue();

const events = {
  'SOCKET_OPEN': 'socketOpen',
  'UPDATE_COMPOSITION': 'updateComposition',
  'REMOVE_ITEM': 'removeItem',
  'OPEN_EDITOR': 'openEditor',
  'UPDATE_ITEM': 'updateItem',
  'UPDATE_ITEM_ARG': 'updateItemArg',
};

export {
  EventBus,
  events 
};
