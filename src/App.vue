<template>
    <div id="app">
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
    import {BContainer} from 'bootstrap-vue'
    import ParticlesBg from "./components/ParticlesBg"
    import Header from "./components/Header"
    import {mapGetters} from 'vuex'

    import keyframes from './assets/scss/keyframes.scss'
    import particles from './assets/scss/particles.scss'

    export default {
        components: {
            BContainer,
            ParticlesBg,
            Header
        },
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

<style>
    html {
        height: 100%;
    }

    body {
        height: 100%;
        background-color: #f5f5f5;
    }

    #app {
        color: #2c3e50;
        margin: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container {
        margin: auto;
    }

    .auth-form {
        max-width: 400px;
    }
</style>
