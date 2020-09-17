import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import Mutations from './mutations/mutations';
import Actions from './actions/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: {
      isLoading: false,
      username: null,
      token: null,
      error: null,
    },
  },
  mutations: Mutations,
  actions: Actions,
  plugins: [createLogger()],
  modules: {

  },
});
