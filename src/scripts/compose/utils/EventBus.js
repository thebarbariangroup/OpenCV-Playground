import Vue from 'vue';

const EventBus = new Vue();

const events = {
  'SOCKET_OPEN': 'socketOpen',
  'UPDATE_COMPOSITION': 'updateComposition',
  'QUEUE_REMOVE_ITEM': 'queueRemoveItem',
  'OPEN_EDITOR': 'openEditor',
};

export {
  EventBus,
  events 
};
