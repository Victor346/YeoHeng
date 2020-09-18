import axios from 'axios';
import * as ActionTypes from './types';
import * as MutationTypes from '../mutations/types';

const dotenv = require('dotenv');
const qs = require('qs');

dotenv.config();

const loginUrl = `${process.env.VUE_APP_BACKEND_URL}/login`;
const registerUrl = `${process.env.VUE_APP_BACKEND_URL}/signup`;

export default {
  async [ActionTypes.AUTHENTICATE_USER]({ commit }, payload) {
    commit(MutationTypes.LOGIN_LOADING);

    await axios.post(loginUrl, qs.stringify(payload), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        commit(MutationTypes.LOGIN_SUCCESS, {
          username: response.data.username,
          token: response.data.jwt,
        });
      })
      .catch((error) => {
        commit(MutationTypes.LOGIN_FAILED, {
          error: error.response.data,
        });
      });
  },
  // TODO: Se mamaron en el back: signup es con JSON y login es www-unencoded
  async [ActionTypes.REGISTER_USER]({ commit }, payload) {
    commit(MutationTypes.LOGIN_LOADING);

    await axios.post(registerUrl, payload)
      .then((response) => {
        commit(MutationTypes.LOGIN_SUCCESS, {
          username: response.data.username,
          token: response.data.jwt,
        });
      })
      .catch((error) => {
        commit(MutationTypes.LOGIN_FAILED, {
          error: error.response.data,
        });
      });
  },
};
