<template>
  <header class="header">
    <div class="container">
      <div id="nav">
        <div class="nav-leftside">
          <img src="@/assets/sibdev-logo.png" alt="">
          <router-link to="/search">
            Поиск
          </router-link>
          <router-link to="/favourites">
            Избранное
          </router-link>
        </div>
        <div class="nav-rightside">

          <router-link to="/">
            <span @click="handlerLogout">Выйти</span>
          </router-link>
        </div>
      </div>
    </div>
    <span class="login"><b>Вы вошли как: {{ name.login }}</b></span>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    name() {
      return JSON.parse(localStorage.getItem('login'));
    },
  },
  methods: {
    handlerLogout() {
      this.$store.commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    },
  },
};
</script>

<style scoped>
img {
  width: 48px;
  height: 48px;
}

.login {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
</style>
