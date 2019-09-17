<script>
import { EventBus, events } from "../../utils/EventBus";
import { debounce } from "../../utils/helpers";

export default {
  name: 'InputBase',
  props: {
    item: Object,
    name: String,
    label: String,
    defaultValue: Number,
    input: Object,
    optional: Boolean,
    hidden: Boolean,
  },
  data () {
    return {
      active: this.getInitalActiveState(),
    };
  },
  methods: {
    onChange (newArgState) {
      this.debounceTimer = debounce(() => {
        const payload = {
          newArgState,
          itemId: this.item.id,
        };
        EventBus.$emit(events.UPDATE_ITEM, payload);
      }, 250, this.debounceTimer);
    },
    getInitalActiveState () {
      if (this.optional) {
        return this.item.argState[this.name].active;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.editor-input {
  margin-bottom: 16px;
}
</style>