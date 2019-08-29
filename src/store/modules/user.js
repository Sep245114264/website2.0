/* eslint-disable no-shadow */
import { login, getInfo } from '@/api/user';

const state = {
  // token: 'admin-token',
  token: '',
  roles: [],
  name: '',
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  login({ commit }, loginInfo) {
    const { username, password } = loginInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, commit })
        .then(({ token }) => {
          commit('SET_TOKEN', token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(({ data }) => {
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
