<template>
  <div class="product">
    <div class="product-title">{{ product.title }}</div>
    <div class="product-image">
      <img :src="product.image" :alt="product.title">
    </div>
    <div class="product-description">{{ product.description }}</div>
    <div class="product-price">{{ product.price }}</div>
    <button v-if="!cartProduct" @click="addToCart(product)" class="in-cart-btn">В корзину</button>
    <controls
        v-else
        :count="cartProduct.count"
        @decrease="setCount({id: product.id, count: cartProduct.count - 1})"
        @increase="setCount({id: product.id, count: cartProduct.count + 1})"
        class="product-controls"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Controls from "@/components/Controls.vue"

export default {
  components: { Controls },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItem']),
    cartProduct() {
      return this.cartItem(this.product.id)
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'setCount'])
  }
}
</script>

<style scoped lang="scss">
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-title {
  font-size: 18px;
  font-weight: 500;
  height: 60px;
  margin-bottom: 8px;
}
.product-image {
  height: 300px;
  margin-bottom: 16px;
  img {
    height: 100%;
    object-fit: contain;
  }
}
.product-description {
  flex-grow: 1;
  margin-bottom: 8px;
}
.product-price {
  font-size: 20px;
  margin-bottom: 12px;
}
.in-cart-btn {
  height: 32px;
}
</style>