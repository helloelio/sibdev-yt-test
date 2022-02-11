<template>
  <li
    class="favourites__item"
    :class="{hovered: controlsView}"
    @mouseover="controlsView = true"
    @mouseout="controlsView = false"
  >{{
      favourite.name
    }}
    <div class="favourites__controls" v-show="controlsView">
      <router-link to="/search" class="primary"
      >
        <span @click="$store.dispatch('searchFromFavourite', favourite)">Применить</span>
      </router-link>
      <button @click="$emit('handleOpenModal', favourite)" class="primary">Редактировать</button>
      <button @click="$store.commit('deleteFavourite', favourite)" class="danger">Удалить
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'FavouriteItem',
  props: {
    favourite: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      controlsView: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.hovered {
  background-color: rgba(0, 0, 0, 0.025);
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.primary {
  color: #1390E5;
}

.danger {
  color: red;
}
</style>
