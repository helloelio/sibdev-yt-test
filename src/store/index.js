import Vue from 'vue';
import Vuex from 'vuex';
import {
  getVideos,
  getVideosWithStatistic,
  getVideosByParameters,
} from '../components/search/video/video.api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: '',
    searchLength: 0,
    items: [],
    favourites: [],
    API_KEY: 'AIzaSyC0tNbn_l7J2x6AWi7NUmak_etAiQSy0sQ',
    videoIds: '',
    isLoaded: true,
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
    isLoaded(state) {
      return state.isLoaded;
    },
  },
  mutations: {
    setLogin(state, login) {
      state.login = login;
    },

    setItems(state, response) {
      state.isLoaded = true;
      state.searchQuery = response.searchQuery;
      state.searchLength = response.videos.pageInfo.totalResults;
      /* eslint-disable */
      response.videos.items.map((item) => {
        state.videoIds += `${item.id.videoId},`;
      });
      this.dispatch('getVideos');
    },

    setItemsWithViews(state, response) {
      state.items = response.videos.items;
      state.videoIds = '';
      state.isLoaded = false;
    },

    getFavFromStorage(state) {
      if (JSON.parse(localStorage.getItem(`${this.getters.getUserLogin}-favourites`)) !== null) {
        state.favourites = JSON.parse(
          localStorage.getItem(`${this.getters.getUserLogin}-favourites`)
        );
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
        localStorage.setItem(
          `${this.getters.getUserLogin}-favourites`,
          JSON.stringify(state.favourites)
        );
      }
    },

    deleteFavourite(state, item) {
      /* eslint-disable */
      state.favourites = state.favourites.filter((favorite) => favorite.id !== item.id);
      localStorage.setItem(
        `${this.getters.getUserLogin}-favourites`,
        JSON.stringify(state.favourites)
      );
    },

    editFavourite(state, item) {
      state.favourites.map((fav) => {
        if (fav.id === item.id) {
          fav = item;
        }
      });
      localStorage.setItem(
        `${this.getters.getUserLogin}-favourites`,
        JSON.stringify(state.favourites)
      );
    },

    logout(state) {
      state.searchLength = 0;
      state.items = [];
      state.searchQuery = '';
    },
  },

  actions: {
    async setItemsAction(context, searchQuery) {
      const [error, videos] = await getVideos(searchQuery, this.state.API_KEY);
      if (error) {
        console.log(error);
      } else {
        context.commit('setItems', {
          videos,
          searchQuery,
        });
      }
    },

    async getVideos(context) {
      const videosIds = this.state.videoIds.slice(0, -1);
      const [error, videos] = await getVideosWithStatistic(videosIds, this.state.API_KEY);
      if (error) {
        console.log(error);
      } else {
        context.commit('setItemsWithViews', { videos });
      }
    },

    async searchFromFavourite(context, query) {
      const {range,sort,value} = query;
      const [error, videos] = await getVideosByParameters(range, sort, value, this.state.API_KEY);
      if (error) {
        console.log(error);
      } else {
        context.commit('setItems', {
          videos,
          searchQuery: value
        });
      }
    },
  },
  modules: {},
});
