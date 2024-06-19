<template>
  <div class="products-list">
    <product-item
        v-for="product in products"
        :product="product"
        :key="product.id"
        class="products-list__item"
    />
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue"

export default {
  components: { ProductItem },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.products-list {
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 25%;
    padding: 12px;
  }
}
</style>