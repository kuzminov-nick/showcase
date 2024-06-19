<template>
  <div class="container">
    <div v-if="cartItems.length">
      <h1>Товары в Корзине</h1>
      <div style="width: max-content">
        <table class="cart-table">
          <thead>
          <tr>
            <th>№</th>
            <th>Наименование товара</th>
            <th>Количесвто</th>
            <th>Цена за ед.</th>
            <th>Итого</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in cartItems" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td>
              <product-controls :cartItem="item" />
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.price * item.count }}</td>
          </tr>
          </tbody>
        </table>
        <div class="total">
          <div class="total-text">
            Всего товаров <span class="fw600">{{ totalCount }}</span> на сумму <span class="fw600">{{ totalPrice }}</span>
          </div>
          <button @click="send" class="send-btn">Оформить заказ</button>
        </div>
      </div>
    </div>
    <div v-else class="cart-empty-wrapper">
      <div class="cart-empty">
        <div class="cart-empty-text">Корзина пуста</div>
        <button @click="$router.push({ name: 'catalog' })" class="cart-empty-link">Вернуться к покупкам</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import ProductControls from "@/components/ProductControls.vue"

export default {
  components: {ProductControls},
  computed: {
    ...mapGetters('cart', ['cartItems', 'totalCount']),
    totalPrice() {
      return this.cartItems.reduce((sum, current) => sum + current.price * current.count, 0).toFixed(2)
    }
  },
  methods: {
    ...mapActions('cart', ['removeFromCart']),
    send() {
      alert('Ваш заказ успешно оформлен')
      this.cartItems.forEach(item => this.removeFromCart(item.id))
      this.$router.push({ name: 'catalog' })
    }
  }
}

</script>

<style scoped lang="scss">
.cart-table {
  margin-bottom: 16px;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total-text {
  font-size: 22px;
  font-weight: 500;
}
.send-btn {
  height: 32px;
}
.cart-empty-wrapper {
  display: flex;
  justify-content: center;
}
.cart-empty {
  margin-top: 56px;
  text-align: center;
}
.cart-empty-text {
  font-size: 24px;
}
.cart-empty-link {
  height: 32px;
  margin-top: 8px;
}
</style>
