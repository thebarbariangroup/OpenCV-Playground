<script>
import { EventBus, events } from "../../utils/EventBus";

export default {
  name: 'InputBase',
  props: {
    item: Object,
  },
  methods: {
    onChange (newOpts) {
      this.debounce(() => {
        const payload = {
          newOpts,
          itemId: this.item.id,
        };
        EventBus.$emit(events.UPDATE_ITEM, payload);
      });
    },
    debounce (fn) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        fn();
      }, 250);
    }
  },
};
</script>

<style lang="scss">
.editor-input {
  margin-bottom: 16px;
}
</style>