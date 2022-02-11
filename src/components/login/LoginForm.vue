<template>
  <form id="form">
    <el-form class="demo-form-inline">
      <el-form-item label="Логин">
        <el-input
          placeholder=""
          v-model="user.login"></el-input>
      </el-form-item>
      <el-form-item label="Пароль">
        <el-input
          placeholder=""
          v-model="user.password" show-password></el-input>
      </el-form-item>
      <p v-show="wrongLogin"> Неправильно введен логин или пароль </p>
      <el-button type="primary" @click="handlerLogin">Войти</el-button>
    </el-form>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      user: {
        login: '',
        password: '',
      },
      wrongLogin: false,
    };
  },
  methods: {
    handlerLogin() {
      axios.get('http://localhost:8080/users')
        .then((res) => {
          /* eslint-disable */
          res.data.find((dataItem) => {
            if (JSON.stringify(this.user) === JSON.stringify(dataItem)) {
              localStorage.setItem('login', JSON.stringify(this.user));
              localStorage.setItem('token', JSON.stringify(this.user.login + this.user.password));
              this.$router.push('/search');
              this.$store.commit('setLogin', this.user.login);
            }
            res.data.every((dataItem) => {
              if (JSON.stringify(this.user) !== JSON.stringify(dataItem)) {
                this.wrongLogin = true;
              }
            });

          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
#form {
  max-width: 334px;
}

.el-input {
  width: 334px !important;
}

.el-form-item {
  margin-bottom: 20px !important;

  &__label {
    color: #E5E5E5 !important;
  }
}

.el-form-item:nth-child(2) {
  margin-bottom: 40px !important;
}
</style>
