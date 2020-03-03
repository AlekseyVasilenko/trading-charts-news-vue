<template>
    <div class="card">
        <div class="card-body">
            <div class="mb-3">
                <b-button-group size="sm">
                    <b-button
                        :to="{name: 'news'}"
                        variant="outline-dark"
                        exact-active-class="active outline-dark"
                        exact
                    >News</b-button>
                    <b-button
                        :to="{name: 'chart'}"
                        variant="outline-dark"
                        exact-active-class="active outline-dark"
                        exact
                    >Charts</b-button>
                </b-button-group>
            </div>

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import {BButtonGroup, BButton} from 'bootstrap-vue'
    import 'vue-awesome/icons/redo'

    export default {
        components: {BButtonGroup, BButton}
    }
</script>

<style scoped>
    .card {
        margin: 80px auto 20px;
    }
</style>
