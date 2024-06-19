<template>
  <header>
    <nav>
      <router-link :to="{name: 'catalog'}" class="logo">
        <img alt="logo" src="../assets/logo2.png">
      </router-link>
      <router-link :to="{name: 'cart'}" class="cart-img">
        <img alt="cart" src="../assets/cart.png">
        <div v-if="totalCount" class="cart-count">{{ totalCount }}</div>
      </router-link>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters('cart', ['totalCount'])
  }
}
</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
}
.logo {
  display: block;
  max-width: 50px;
}
.cart-img {
  width: 30px;
  position: relative;
}
.cart-count {
  position: absolute;
  background: lightblue;
  right: -5px;
  top: -5px;
  padding: 2px;
  border-radius: 50%;
  min-width: 20px;
}
</style>