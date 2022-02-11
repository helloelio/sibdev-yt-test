<template>
  <div class="tooltip">
    <p>Поиск сохранен в разделе <br/> <b>"Избранное"</b></p>
    <router-link to="/favourites">
      Перейти в избранное
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Alert',
};
</script>

<style scoped>
.tooltip {
  background: #FFFFFF;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  position: absolute;
  right: 58px;
  padding: 10px;
  border-radius: 4px;
}
</style>
