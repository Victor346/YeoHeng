import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import VuexPersistence from 'vuex-persist';
import Mutations from './mutations/mutations';
import Actions from './actions/actions';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

export default new Vuex.Store({
  state: {
    login: {
      isLoading: false,
      username: null,
      token: null,
      id: null,
      error: null,
      provider: null,
    },
  },
  mutations: Mutations,
  actions: Actions,
  plugins: [createLogger(), vuexLocal.plugin],
  modules: {

  },
});
