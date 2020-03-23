export default {
  state: {
    news: {
      data: []
    },
  },
  getters: {
    getNewsData: state => state.news.data,
  },
  mutations: {
    setNewsData(state, newsData) {
      state.news.data = newsData;
    },
  },
  actions: {
    setNewsData({commit}, newsData) {
      commit('setNewsData', newsData);
    },
  }
}
