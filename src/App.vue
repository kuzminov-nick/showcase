<template>
  <keep-alive>
    <component :is="layout">
      <router-view/>
    </component>
  </keep-alive>
</template>

<script>
import Default from "@/layouts/Default.vue"
import NoHeader from "@/layouts/NoHeader.vue"

export default {
  components: { Default, NoHeader },
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
img {
  max-width: 100%;
}
h1 {
  font-size: 24px;
  text-align: left;
}
table {
  border-collapse: collapse;
}
td, th {
  border: 1px solid;
  padding: 8px 12px;
}
.fw600 {
  font-weight: 600;
}
main {
  text-align: left;
  flex-grow: 1;
}
.container {
  //width: 100%;
  //max-width: 1200px;
  //margin: 0 auto;
  height: 100%;
  padding: 0 15px;
}
</style>