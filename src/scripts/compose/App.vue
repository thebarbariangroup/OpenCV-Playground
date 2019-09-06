<template>
  <div id="app">
    <CompositionsList />
    <Composer />
  </div>
</template>

<script>
import { EventBus, events } from './utils/EventBus.js';

import CompositionsList from './components/CompositionsList.vue';
import Composer from './components/Composer.vue';

export default {
  components: {
    CompositionsList,
    Composer,
  },
  data () {
    return {
      message: '',
      log: [],
    };
  },
  mounted () {
    this.connection = new WebSocket('ws://localhost:1337');

    this.setupEventHandlers();
  },
  methods: {
    setupEventHandlers () {
      this.onUpdateComposition = this.onUpdateComposition.bind(this);
      EventBus.$on(events.UPDATE_COMPOSITION, this.onUpdateComposition);

      this.onConnectionOpen = this.onConnectionOpen.bind(this);
      this.connection.onopen = this.onConnectionOpen;

      this.connection.onerror = (error) => {
        console.log('socket error', error);
      };

      this.connection.onmessage = this.onMessage;
    },
    onConnectionOpen () {
      EventBus.$emit(events.SOCKET_OPEN);
    },
    onUpdateComposition (composition) {
      console.log('updateComposition', composition);
      this.sendMessage('UPDATE_COMPOSITION', composition);
    },
    sendMessage (action, payload) {
      const message = JSON.stringify({ action, payload });
      this.connection.send(message);
    },
    onMessage (message) {
      const messageData = this.jsonParse(message.data);
      console.log('socket onMessage', messageData);
    },
    jsonParse (string) {
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
}
</script>

<style lang="scss">
#app {
  margin: 40px;
}
</style>
