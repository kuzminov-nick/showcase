<template>
  <div class="container auth-container">
    <div class="auth">
      <div class="auth-title">Форма авторизации</div>
      <div class="fields">
        <field-valid
          v-for="(item, index) in fields"
          :field="item"
          @handle-input="handleInput($event, index)"
          :key="item.name"
          class="field"
        />
      </div>
      <button :disabled="!fieldsDone" @click="sendForm" class="send-btn">Войти</button>
    </div>
  </div>
</template>

<script>
import FieldValid from "@/components/FieldValid.vue"
import { mapActions } from "vuex"

export default {
  components: {FieldValid},
  data() {
    return {
      fields: [
        {
          name: 'email',
          value: '',
          label: 'Email',
          placeholder: 'Введите Email',
          required: true,
          pattern: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
          textError: 'Некорретный Email'
        },
        {
          name: 'password',
          value: '',
          label: 'Пароль',
          placeholder: 'Введите пароль',
          required: true,
          pattern: /^.{0,10}$/,
          textError: 'Некорретный пароль'
        }
      ]
    }
  },
  computed: {
    fieldsDone() {
      return this.fields.every(field => field.valid)
    },
    formData() {
      const formData = {}
      this.fields.forEach(field => formData[field.name] = field.value)
      return formData
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    sendForm() {
      if(this.fieldsDone) {
        this.setUser(this.formData)
        this.$router.push({ name: 'catalog' })
      }
    },
    handleInput(value, index) {
      let field = this.fields[index]

      field.value = value
      field.valid = field.required
          ? !!field.value && field.pattern.test(field.value)
          : !field.value
              ? true
              : field.pattern.test(field.value)
    }
  },
  created(){
    this.fields.forEach(field => {
      field.valid = !field.required
    })
  }
}
</script>

<style scoped lang="scss">
.auth-container
.auth {
  width: 100%;
  max-width: 600px;
  padding: 16px;
  margin: 0 auto;
  margin-top: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.auth-title {
  font-size: 28px;
  margin-bottom: 12px;
}
.field {
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
.send-btn {
  width: 110px;
  height: 32px;
  padding: 0 12px;
  margin-top: 18px;
}
</style>