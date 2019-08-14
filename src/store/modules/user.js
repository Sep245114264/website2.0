import { login } from '@/api/user';

const state = {
  token: 'testToken',
  name: '',
};

const mutations = {
  SET_TOKEN: (token) => {
    state.token = token;
  },
  SET_NAME: (name) => {
    state.name = name;
  },
};

const actions = {
  login({ commit }, loginInfo) {
    const { username, password } = loginInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, commit })
        .then(({ data }) => {
          commit('SET_TOKEN', data.token);
          resolve();
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
