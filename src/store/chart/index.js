import axios from "axios";

export default {
  state: {
    chart: {
      data: {},
    },
  },
  getters: {
    getChartData: state => state.chart.data,
  },
  mutations: {
    setChartData(state, chartData) {
      state.chart.data = {...state.chart.data, 'ohlcv': chartData};
    },
  },
  actions: {
    setChartData({commit}, chartData) {
      commit('setChartData', chartData);
    },
    request({commit}) {
      commit('request');
    },
    success({commit}) {
      commit('success');
    },
    updateUserWallets({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('request');
        setTimeout(() => {
          axios({url: 'http://localhost:3000/update-user-wallets', data: payload, method: 'POST'})
            .then(resp => {
              commit('success');
              console.log('Данные кошельков успешно обновлены');
              resolve(resp)
            })
            .catch(err => {
              console.log('Ошибка обновления кошельков');
              reject(err)
            })
        }, 1000);
      })
    },
  }
}
