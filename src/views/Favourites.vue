<template>
  <section id="favourites">
    <Header/>
    <div id="main" class="main-favourites">
      <div class="container">
        <section class="favourites">
          <article>
            <h2>Избранное</h2>
            <ul class="favourites__items">
              <favourite-item
                :key="favourite.id"
                v-for="favourite in favitems"
                :favourite="favourite"
                :controlsView="controlsView"
                @handleOpenModal="handleOpenModal"
              />
            </ul>
          </article>
        </section>
      </div>
    </div>
    <favourites-modal
      v-if="modalView"
      @handlerCloseModal="handlerCloseModal"
      :typeModal="typeModal"
      :itemToedit="itemToedit"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import FavouriteItem from '@/components/favourites/FavouriteItem.vue';
import FavouritesModal from '@/components/modal/FavouritesModal.vue';
import Header from '@/components/header/Header.vue';

export default {
  name: 'Favourites',
  components: {
    FavouritesModal,
    FavouriteItem,
    Header,
  },
  data() {
    return {
      isLogin: localStorage.getItem('token') !== null,
      items: [],
      controlsView: false,
      modalView: false,
      typeModal: 'EDIT',
      itemToedit: {},
    };
  },

  created() {
    document.title = 'yt - избранное';
    this.$store.commit('getFavFromStorage');
    /* eslint-disable */
    this.isLogin !== true ? this.$router.push({ name: 'Login' }) : ' ';
  },

  computed: {
    favitems() {
      const getUser = JSON.parse(localStorage.getItem('login'));
      return JSON.parse(localStorage.getItem(`${getUser.login}-favourites`));
    },
    ...mapGetters(['favourites']),
  },

  methods: {
    handlerLogout() {
      this.$store.commit('logout');
      localStorage.removeItem('token');
    },
    handleOpenModal(item) {
      this.modalView = true;
      this.itemToedit = item;
    },
    handlerCloseModal() {
      this.modalView = false;
    },
  },
};
</script>

<style scoped lang="scss">
#favourites {
  min-height: 100vh;
}

.favourites {
  &__items {
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 13px 20px;
    margin-bottom: 1px;
  }

  &__controls {
    button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
    }

  }
}

.main-favourites {
  text-align: left;
}

</style>
