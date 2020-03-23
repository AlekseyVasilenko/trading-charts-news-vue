import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import news from './news'
import chart from './chart'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    news,
    chart,
  },
  strict: process.env.NODE_ENV !== 'production',
})
