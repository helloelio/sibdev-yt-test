<template>
  <form id="form">
    <el-form class="demo-form-inline"
             :model="user"
             :rules="rules"
             ref="rules"
    >
      <el-form-item label="Логин" prop="login">
        <el-input
          v-model="user.login"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input
          v-model="user.password" show-password></el-input>
      </el-form-item>
      <p v-show="wrongLogin" class="error-message"> Неправильно введен логин или пароль </p>
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
      rules: {
        login: [{
          required: true,
          message: 'Поле необходимое для заполнения!',
          trigger: 'blur',
        }],
        password: [{
          required: true,
          message: 'Поле необходимое для заполнения!',
          trigger: 'blur',
        }],
      },
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

.error-message {
  border: 1px solid red;
  border-radius: 4px;
  padding: 10px 0;
}
</style>
