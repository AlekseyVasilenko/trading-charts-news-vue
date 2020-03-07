import axios from "axios";

export default {
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
    setNews({commit}, news) {
        commit('setNews', news);
    }
}
