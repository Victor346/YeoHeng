import * as MutationTypes from './types';

export default {
  [MutationTypes.LOGIN_SUCCESS](state, payload) {
    state.login.isLoading = false;
    state.login.username = payload.username;
    state.login.token = payload.token;
    state.login.error = null;
  },
  [MutationTypes.LOGIN_FAILED](state, payload) {
    state.login.isLoading = false;
    state.login.username = null;
    state.login.token = null;
    state.login.error = payload.error;
  },
  [MutationTypes.LOGIN_LOADING](state) {
    state.login.isLoading = true;
    state.login.error = null;
  },
  [MutationTypes.LOGOUT](state) {
    state.login.isLoading = false;
    state.login.username = null;
    state.login.token = null;
    state.login.error = null;
  },
};
