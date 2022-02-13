import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: '',
    searchLength: 0,
    items: [],
    favourites: [],
    API_KEY: 'AIzaSyC0tNbn_l7J2x6AWi7NUmak_etAiQSy0sQ',
    videoIds: '',
  },
  getters: {
    videos(state) {
      return state.items;
    },
    length(state) {
      return state.searchLength;
    },
    searchQuery(state) {
      return state.searchQuery;
    },
    favourites(state) {
      return state.favourites;
    },
    getUserLogin() {
      return JSON.parse(localStorage.getItem('login')).login;
    },
  },
  mutations: {
    setLogin(state, login) {
      state.login = login;
    },

    setItems(state, response) {
      state.searchQuery = response.searchQuery;
      state.searchLength = response.data.data.pageInfo.totalResults;
      /* eslint-disable */
      response.data.data.items.map((item) => {
        state.videoIds += `${item.id.videoId},`;
      });
      this.dispatch('getVideos');
    },

    setItemsWithViews(state, response) {
      state.items = response.data.data.items;
      state.videoIds = '';
    },

    getFavFromStorage(state) {
      if (JSON.parse(localStorage.getItem(`${this.getters.getUserLogin}-favourites`)) !== null) {
        state.favourites = JSON.parse(localStorage.getItem(`${this.getters.getUserLogin}-favourites`));
      }
    },

    addFavourite(state, value) {
      if (value.name !== '' && value.name !== ' ') {
        state.favourites.push({
          id: new Date(),
          name: value.name,
          value: value.value,
          range: value.range,
          sort: value.sort,
        });
        localStorage.setItem(`${this.getters.getUserLogin}-favourites`, JSON.stringify(state.favourites));
      }
    },
    deleteFavourite(state, item) {
      /* eslint-disable */
      state.favourites = state.favourites.filter((favorite) => favorite.id !== item.id);
      localStorage.setItem(`${this.getters.getUserLogin}-favourites`, JSON.stringify(state.favourites));
    },
    editFavourite(state, item) {
      state.favourites.map((fav) => {
        if (fav.id === item.id) {
          fav = item;
        }
      });
      localStorage.setItem(`${this.getters.getUserLogin}-favourites`, JSON.stringify(state.favourites));

    },

    logout(state) {
      state.searchLength = 0;
      state.items = [];
      state.searchQuery = '';
    },
  },
  actions: {
    getVideos(context) {
      axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${this.state.videoIds.slice(0, -1)}&key=${this.state.API_KEY}`)
        .then((data) => {
          context.commit('setItemsWithViews', {
            data
          });
        });
    },

    setItemsAction(context, searchQuery) {
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=title&q=${searchQuery}&key=${this.state.API_KEY}`)
        .then((data) => {
          context.commit('setItems', {
            data,
            searchQuery,
          });
        });
    },
    searchFromFavourite(context, query) {
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${query.range}&order=${query.sort || 'relevance'}&q=${query.value}&key=${this.state.API_KEY}`)
        .then((data) => {
          context.commit('setItems', {
            data,
            searchQuery: query.value,
          });
        });
    }
  },
  modules: {},
});
