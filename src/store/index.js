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
  },
  mutations: {
    setLogin(state, login) {
      state.login = login;
    },

    setItems(state, response) {
      state.searchQuery = response.searchQuery;
      state.items = response.data.data.items;
      state.searchLength = response.data.data.pageInfo.totalResults;
    },

    getFavFromStorage(state) {
      const getUser = JSON.parse(localStorage.getItem('login'));
      if (JSON.parse(localStorage.getItem(`${getUser.login}-favourites`)) !== null) {
        state.favourites = JSON.parse(localStorage.getItem(`${getUser.login}-favourites`));
      }
    },

    addFavourite(state, value) {
      const getUser = JSON.parse(localStorage.getItem('login'));
      if (value.name !== '' && value.name !== ' ') {
        state.favourites.push({
          id: new Date(),
          name: value.name,
          value: value.value,
          range: value.range,
          sort: value.sort,
        });
        localStorage.setItem(`${getUser.login}-favourites`, JSON.stringify(state.favourites));
      }
    },
    deleteFavourite(state, item) {
      /* eslint-disable */
      const getUser = JSON.parse(localStorage.getItem('login'));
      state.favourites = state.favourites.filter((favorite) => favorite.id !== item.id);
      localStorage.setItem(`${getUser.login}-favourites`, JSON.stringify(state.favourites));
    },
    editFavourite(state, item) {
      // находим в нашем стейт favourites ITEM id которого равен id пришедшего айтем, и меняем ему внутренности
      //  ставим в localStorage наши изменения!
    },

    logout(state) {
      state.searchLength = 0;
      state.items = [];
      state.searchQuery = '';
    },
  },
  actions: {
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
