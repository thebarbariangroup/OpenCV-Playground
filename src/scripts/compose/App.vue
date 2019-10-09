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
    this.connection = new WebSocket(`wss://${location.hostname}:8443`);

    this.setupEventHandlers();
  },
  methods: {
    setupEventHandlers () {
      EventBus.$on(events.UPDATE_COMPOSITION, this.onUpdateComposition);
      this.connection.onopen = this.onConnectionOpen;
      this.connection.onerror = this.onConnectionError;
      this.connection.onmessage = this.onConnectionMessage;
    },
    onConnectionOpen () {
      EventBus.$emit(events.SOCKET_OPEN);
    },
    onConnectionError (error) {
      console.log('socket error', error);
    },
    onUpdateComposition (composition) {
      // console.log('updateComposition', composition);
      this.sendMessage('UPDATE_COMPOSITION', composition);
    },
    sendMessage (action, payload) {
      const message = JSON.stringify({ action, payload });
      this.connection.send(message);
    },
    onConnectionMessage (message) {
      const messageData = this.jsonParse(message.data);
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
  padding: 32px;
}
</style>
