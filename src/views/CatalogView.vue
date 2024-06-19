<template>
  <div class="catalog">
    <div class="filter">
      <div class="filter-title">Фильтр</div>
      <div class="filter-row">
        <div class="filter-category">Категория</div>
        <div class="filter-param">Выберите категорию</div>
        <select name="filter" id="filter" v-model="category" class="filter-field">
          <option :value="allBtnText">{{ allBtnText }}</option>
          <option v-for="(item, index) in categoryList" :value="categoryList[index]">{{ item }}</option>
        </select>
      </div>
      <div class="filter-row">
        <div class="filter-category">Цена</div>
        <div class="filter-group">
          <div class="filter-group-item">
            <div class="filter-param">Мин. цена</div>
            <input type="text" :value="minPrice" @input="handleInputMinPrice" class="filter-field" >
          </div>
          <div class="filter-group-item">
            <div class="filter-param">Макс. цена</div>
            <input type="text" :value="maxPrice" @input="handleInputMaxPrice" class="filter-field" >
          </div>
        </div>
      </div>
      <button @click="handleCLickCLearBtn">Очистить</button>
      <button @click="handleCLicApplyBtn">Применить</button>
    </div>
    <div class="products">
      <products-list :products="updatedProducts" />
      <div v-if="!updatedProducts.length" class="empty">Не найдено товаров соответствующих выбранным параметрам.</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ProductsList from "@/components/ProductsList"

export default {
  components: { ProductsList },
  data() {
    return {
      category: '',
      minPrice: '',
      maxPrice: ''
    }
  },
  computed: {
    ...mapGetters('products', { initialProducts: 'products' }),
    ...mapGetters('products', ['updatedProducts', 'filters', 'allBtnText']),
    categoryList() {
      return [...new Set(this.initialProducts.map(item => item.category))]
    },
    // filteredProducts() {
    //   return this.initialProducts.filter(product => {
    //     const byCategory = this.category === this.allBtnText ? true : product.category === this.category
    //     const byMinPrice = this.minPrice === '' ? true : product.price >= this.minPrice
    //     const byMaxPrice = this.maxPrice === '' ? true : product.price <= this.maxPrice
    //
    //     return byCategory && byMinPrice && byMaxPrice
    //   })
    // },
    isValidPrice() {
      return this.maxPrice !== '' ? this.minPrice <= this.maxPrice : true
    }
  },
  methods: {
    ...mapActions('products', ['loadProducts', 'setFilters']),
    handleInputMinPrice(event) {
      let value = event.target.value
      // this.minPrice = Math.min(value, this.maxPrice)
      // if(this.minPrice >= this.maxPrice) this.$forceUpdate()
      let oldValue = this.minPrice
      let newValue = value !== '' ? +value.replace(/[^0-9]/g, '') : ''
      this.minPrice = newValue

      if(newValue === oldValue) this.$forceUpdate()

    },
    handleInputMaxPrice(event) {
      let value = event.target.value
      // this.maxPrice = Math.max(value, this.minPrice)
      // if(this.maxPrice <= this.minPrice) this.$forceUpdate()
      let oldValue = this.maxPrice
      let newValue = value !== '' ? +value.replace(/[^0-9]/g, '') : ''
      this.maxPrice = newValue

      if(newValue === oldValue) this.$forceUpdate()
    },
    handleCLickCLearBtn() {
      this.clearFilter()
      this.setStoreFilters()
    },
    handleCLicApplyBtn() {
      if(this.isValidPrice) {
        this.setStoreFilters()
      } else {
        alert('Минимальная цена не может быть больше максимальной')
      }
    },
    clearFilter() {
      this.category = this.allBtnText
      this.minPrice = ''
      this.maxPrice = ''
    },
    setStoreFilters() {
      this.setFilters({
        category: this.category,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      })
    }
  },
  created() {
    this.category = this.filters.category
    this.minPrice = this.filters.minPrice
    this.maxPrice = this.filters.maxPrice

    if(!this.initialProducts.length) {
      this.loadProducts().then().catch(error => console.log(error))
    }
  }
}
</script>

<style scoped lang="scss">
.catalog {
  display: flex;
  justify-content: space-between;
}
.filter {
  width: 200px;
  text-align: left;
  padding: 8px;
  &-row {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  &-title {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 8px;
  }
  &-category {
    font-size: 20px;
    margin-bottom: 8px;
  }
  &-param {
    font-size: 16px;
  }
}
.filter-group {
  display: flex;
  justify-content: space-between;
  &-item {
    width: 48%;
  }
}
.products {
  width: calc(100% - 200px - 16px);
}
.filter-field  {
  margin-top: 8px;
  width: 100%;
  height: 30px;
}
button {
  width: 100%;
  height: 32px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
.empty {
  margin-top: 12px;
}
</style>
