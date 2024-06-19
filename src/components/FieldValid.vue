<template>
  <div class="field">
    <label :for="field.name">{{ field.label }}</label>
    <input type="text" :id="field.name" :value="field.value" @input="handleInput">
    <div v-show="activated && !field.valid" class="error">{{ field.textError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activated: false
    }
  },
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleInput(event) {
      this.activated = true
      this.$emit('handleInput', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
label {
  display: block;
  margin-bottom: 4px;
}
input {
  display: block;
  width: 220px;
  height: 32px;
}
.error {
  font-size: 14px;
  color: red;
  margin-top: 4px;
}
</style>