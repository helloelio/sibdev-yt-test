<template>
  <section id="login">
    <div class="container-form">
      <img src="../assets/sibdev-logo.png" alt="sibdev-logo">
      <h3>Вход</h3>
      <login-form/>
    </div>
  </section>
</template>

<script>
import LoginForm from '../components/login/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
};
</script>

<style scoped lang="scss">
#login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-form {
  max-width: 540px;
  border: 1px solid rgba(39, 39, 39, 0.1);
  border-radius: 5px;
  margin: 0 auto;
  padding: 30px 88px 60px 88px;
  background-color: #fff;
}
</style>
