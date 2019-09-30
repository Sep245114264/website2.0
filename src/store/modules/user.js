/* eslint-disable no-shadow */
import userApi from '@/api/user';

const state = {
  // token: 'admin-token',
  token: '',
  roles: [],
  name: '',
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  CLEAR_LOGIN: (state) => {
    state.roles.length = 0;
  },
};

const actions = {
  login({ commit }, loginInfo) {
    const { username, password } = loginInfo;
    return new Promise((resolve, reject) => {
      userApi
        .login({ username: username.trim(), password, commit })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfo({ commit }) {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      userApi
        .getInfo(token)
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
