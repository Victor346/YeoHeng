import * as MutationTypes from './types';

export default {
  [MutationTypes.LOGIN_SUCCESS](state, payload) {
    state.login.isLoading = false;
    state.login.username = payload.username;
    state.login.token = payload.token;
    state.login.id = payload.id;
    state.login.error = null;
    state.login.role = payload.role;
  },
  [MutationTypes.LOGIN_FAILED](state, payload) {
    state.login.isLoading = false;
    state.login.username = null;
    state.login.token = null;
    state.login.id = null;
    state.login.error = payload.error;
    state.login.role = null;
  },
  [MutationTypes.LOGIN_LOADING](state) {
    state.login.isLoading = true;
    state.login.error = null;
  },
  [MutationTypes.LOGOUT](state) {
    state.login.isLoading = false;
    state.login.username = null;
    state.login.token = null;
    state.login.id = null;
    state.login.error = null;
    state.login.role = null;
  },
};
