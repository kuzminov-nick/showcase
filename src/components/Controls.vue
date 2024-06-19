<template>
  <div class="controls">
    <button @click="$emit('decrease')">-</button>
    <div class="count">{{ count }}</div>
    <button @click="$emit('increase')">+</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    width: 32px;
    height: 32px;
  }
}
.count {
  margin: 0 12px;
}
</style>