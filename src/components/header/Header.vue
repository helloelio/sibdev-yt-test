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
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      this.$store.commit('logout');
    },
  },
};
</script>

<style scoped>
img {
  max-width: 48px;
  max-height: 48px;
}

.login {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
</style>
