<template>
  <section id="search" :class="[isActiveSearched ? 'searched-block' : 'search-block']">
    <Header/>
    <div id="main" class="main-search"
         :class="{'main-searched': isActiveSearched}">
      <div class="container">
        <simple-search v-if="!this.searched && this.videos.length === 0"
                       @handleSearch="handleSearch"/>
        <active-search v-else-if="isActiveSearched"
                       @handleSearch="handleSearch" :searchedValue="searchedValue"/>
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
    ...mapGetters(['videos']),
  },

  methods: {
    handleSearch(value) {
      if (value.trim() !== '') {
        this.searched = true;
        this.$store.dispatch('setItemsAction', value);
        this.searchedValue = value;
      }
    },
    handlerLogout() {
      this.$store.commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    },
    ...mapActions(['setItemsAction']),
  },
};
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 40px;
}

.search-block {
  min-height: 100vh;
  height: 100vh;
}

.searched-block {
  height: 100% !important;
}

.main-search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: -120px;
}

.main-searched {
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0;
  width: 100%;
  min-height: 100%;
}

.search {
  width: 686px;
}

.searched {
  width: 1040px;
  text-align: left;
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

</style>
