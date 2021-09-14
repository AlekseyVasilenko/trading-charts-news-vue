<template>
  <div id="app" class="app">
    <transition name="fade" mode="out-in">
      <Header v-if="isLoggedIn"/>
    </transition>

    <b-container class="container">
      <particles-bg v-if="!isLoggedIn"/>

      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </b-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {BContainer} from 'bootstrap-vue'
  import ParticlesBg from "./components/Particles/ParticlesBg"
  import Header from "./components/Header/Header"
  import {mapGetters} from 'vuex'
  import VueParticles from 'vue-particles'

  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';
  import './assets/scss/app.scss'
  import './assets/scss/keyframes.scss'
  import './components/Particles/particles.scss'

  Vue.use(VueParticles);

  export default {
    components: {BContainer, ParticlesBg, Header},
    computed: {
      ...mapGetters([
        'isLoggedIn'
      ])
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
  }
</script>
