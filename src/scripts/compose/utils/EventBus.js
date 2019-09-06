import Vue from 'vue';

const EventBus = new Vue();

const events = {
  'SOCKET_OPEN': 'socketOpen',
  'UPDATE_COMPOSITION': 'updateComposition',
};

export {
  EventBus,
  events 
};
