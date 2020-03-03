import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        error: '',
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
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
            return new Promise((resolve, reject) => {
                commit('authRequest');
                setTimeout(() => {
                    axios({url: 'http://localhost:3000/login', data: user, method: 'POST'})
                        .then(resp => {
                            const {token, user} = resp.data;
                            localStorage.setItem('token', token);
                            localStorage.setItem('user', JSON.stringify(user));
                            axios.defaults.headers.common['Authorization'] = token;
                            commit('authSuccess', {token, user});
                            resolve(resp)
                        })
                        .catch(err => {
                            commit('authError', err.response.data);
                            localStorage.removeItem('token');
                            reject(err)
                        })
                }, 1000);
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('authRequest');
                setTimeout(() => {
                    axios({url: 'http://localhost:3000/register', data: user, method: 'POST'})
                        .then(resp => {
                            const {token, user} = resp.data;
                            localStorage.setItem('token', token);
                            axios.defaults.headers.common['Authorization'] = token;
                            commit('authSuccess', {token, user});
                            resolve(resp)
                        })
                        .catch(err => {
                            commit('authError', err);
                            localStorage.removeItem('token');
                            reject(err)
                        })
                }, 1000);
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        },
    },
})
