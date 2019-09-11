<script>
import { EventBus, events } from "../../utils/EventBus";

export default {
  name: 'InputBase',
  methods: {
    onChange (e) {
      console.log(e);
      EventBus.$emit(events.UPDATE_ITEM_ARG);
    }
  },
};
</script>