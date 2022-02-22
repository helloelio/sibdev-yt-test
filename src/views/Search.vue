<template>
  <section id="search" :class="[isActiveSearched ? 'searched-block' : 'search-block']">
    <Header/>
    <div id="main" class="main-search" :class="{ 'main-searched': isActiveSearched }">
      <div class="container">
        <simple-search
          v-if="!this.searched && this.videos.length === 0"
          @handleSearch="handleSearch"
        />
        <div class="loader" v-else-if="isLoaded"></div>
        <active-search
          v-else-if="isActiveSearched"
          @handleSearch="handleSearch"
          :searchedValue="searchedValue"
        />

      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SimpleSearch from '@/components/search/SimpleSearch.vue';
import ActiveSearch from '@/components/search/ActiveSearch.vue';
import Header from '@/components/header/Header.vue';

export default {
  name: 'Search',
  components: {
    Header,
    ActiveSearch,
    SimpleSearch,
  },

  data() {
    return {
      isLogin: localStorage.getItem('token') !== null,
      searched: false,
      searchedValue: '',
    };
  },

  computed: {
    isActiveSearched() {
      return this.searched || this.videos.length !== 0;
    },
    ...mapGetters(['videos', 'isLoaded']),
  },

  created() {
    document.title = 'yt - поиск видео';
    /* eslint-disable */
    this.isLogin !== true ? this.$router.push({ name: 'Login' }) : ' ';
  },

  methods: {
    handleSearch(value) {
      if (value.trim() !== '') {
        this.searched = true;
        this.$store.dispatch('setItemsAction', value);
        this.searchedValue = value;
      }
    },
    ...mapActions(['setItemsAction']),
  },
};
</script>

<style scoped lang="scss">
#search {
  margin-bottom: 50px;
}

.header {
  margin-bottom: 40px;
}

.search-block {
  min-height: 100vh;
}

.searched-block {
  min-height: 100vh;
  height: 100% !important;
}

.main-search {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: -120px;
}

.main-searched {
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0;
  width: 100%;
}

.search {
  min-width: 1040px;
}

.searched {
  text-align: left;
  min-width: 1040px;
}

.el-form {
  display: flex;
}

.el-input__inner {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.search-length {
  color: rgba(23, 23, 25, 0.3);
}

.loader {
  border: 16px solid #c3c3c3;
  border-top: 16px solid #1390E5;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
