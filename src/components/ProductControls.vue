<template>
  <controls
      :count="cartItem.count"
      @decrease="setCount({id: cartItem.id, count: cartItem.count - 1})"
      @increase="setCount({id: cartItem.id, count: cartItem.count + 1})"
  />
</template>

<script>
import {mapActions} from "vuex";

import Controls from "@/components/Controls.vue"

export default {
  components: { Controls },
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('cart', ['setCount']),
  }
}
</script>

<style scoped lang="scss">

</style>