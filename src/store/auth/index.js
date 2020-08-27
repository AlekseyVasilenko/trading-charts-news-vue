import axios from "axios";
import router from '../../router'

export default {
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    error: '',
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isLoading: state => state.status === 'loading',
    getUserWallets: state => state.user.wallets ? JSON.parse(state.user.wallets) : {},
  },
  mutations: {
    request(state) {
      state.status = 'loading';
    },
    success(state) {
      state.status = 'success';
    },
    authRequest(state) {
      state.status = 'loading';
      state.error = {};
    },
    authSuccess(state, {token, user}) {
      state.status = 'success';
      state.token = token;
      state.user = user;
      state.error = {};
    },
    authError(state, err) {
      state.status = 'error';
      state.error = err;
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = {};
      state.error = {};
    },
  },
  actions: {
    login({commit}, user) {
      commit('authRequest');
      setTimeout(() => { // for delay simulation
        axios.post('http://localhost:3000/login', user)
          .then(resp => {
            const {token, user} = resp.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = token;
            commit('authSuccess', {token, user});
            router.push('/cabinet')
          })
          .catch(err => {
            console.log(err)
            commit('authError', err.response.data);
            localStorage.removeItem('token');
          })
      }, 1000);
    },
    register({commit}, user) {
      commit('authRequest');
      setTimeout(() => { // for delay simulation
        axios.post('http://localhost:3000/register', user)
          .then(resp => {
            const {token, user} = resp.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('authSuccess', {token, user});
            router.push('/secure')
          })
          .catch(err => {
            console.log(err)
            commit('authError', err);
            localStorage.removeItem('token');
          })
      }, 1000);
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    },
  }
}
