<template>
  <Header />
  <main>
    <slot></slot>
  </main>
</template>

<script>
import Header from "@/components/Header"

export default {
  name: "Default",
  components: { Header }
}
</script>

<style scoped lang="scss">
main {
  margin-top: 32px;
}
</style>