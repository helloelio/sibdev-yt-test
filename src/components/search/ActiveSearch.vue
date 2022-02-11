<template>
  <div class="searched">
    <h2>Поиск видео</h2>
    <el-form :inline="true" class="demo-form-inline">
      <img @click="handlerAddFavourite" class="input-btn" src="../../assets/heart.svg"
           alt="heart-icon">
      <el-input placeholder="Что хотите посмотреть?" v-model="searchValue">
        <el-button type="primary" slot="append" icon="el-icon-search"
                   @click="$emit('handleSearch', searchValue)">Найти
        </el-button>
      </el-input>
      <transition name="fade">
        <Tooltip v-if="tooltipShow"/>
      </transition>
    </el-form>
    <section class="search-result">
      <article>
        <div class="search-result__header">
          <div class="search-result__description">
            <h3>Видео по запросу «{{ searchQuery }}»
              <span class="search-length">{{ length }}</span>
            </h3>
          </div>
          <div class="search-result__controls">
            <button @click="cardViewList = true">
              <img v-if="cardViewList" src="@/assets/list-active.png" alt="">
              <img v-else src="@/assets/list.png" alt="">
            </button>
            <button @click="cardViewList = false">
              <img v-if="!cardViewList" src="@/assets/grid-active.png" alt="">
              <img v-else src="@/assets/grid.png" alt="">
            </button>
          </div>
        </div>
        <div :class="[cardViewList ? 'cards-list' : 'cards-grid']">
          <video-item v-for="video in this.videos" :key="video.id.videoId" :video="video"/>
        </div>
      </article>
    </section>
    <transition name="fade">
      <favourites-modal
        v-if="modalView"
        :query="searchQuery"
        @handlerCloseModal="handlerCloseModal"
        :type="typeModal"
      />
    </transition>
  </div>
</template>

<script>
import VideoItem from '@/components/search/video/VideoItem.vue';
import FavouritesModal from '@/components/modal/FavouritesModal.vue';
import Tooltip from '@/components/tooltip/Tooltip.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'ActiveSearch',
  components: {
    Tooltip,
    VideoItem,
    FavouritesModal,
  },

  props: {
    searchedValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      modalView: false,
      cardViewList: false,
      searchValue: '',
      typeModal: 'ADD',
      tooltipShow: false,
    };
  },

  computed: {
    ...mapGetters(['videos', 'length', 'searchQuery']),
  },

  methods: {
    handlerAddFavourite() {
      this.modalView = true;
    },
    handlerCloseModal() {
      this.modalView = false;
      this.tooltipShow = true;
      setTimeout(() => {
        this.tooltipShow = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
form {
  position: relative;
}

.input-btn {
  position: absolute;
  right: 116px;
  z-index: 1000;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.search-result__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
  column-gap: 20px;
  row-gap: 30px;
}

.el-button--primary {
  background-color: #66b1ff !important;
  color: #fff !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}
</style>
