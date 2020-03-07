<template>
    <div class="card">
        <div class="card-body">
            <div class="mb-3">
                <b-button-group size="sm">
                    <b-button
                        v-for="(tab, key) in tabs"
                        :key="key"
                        :to="{name: tab.to}"
                        variant="outline-dark"
                        exact-active-class="active outline-dark"
                        exact
                    >{{ tab.text }}</b-button>
                </b-button-group>
            </div>

            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import {BButtonGroup, BButton} from 'bootstrap-vue'

    export default {
        components: {BButtonGroup, BButton},
        data: () => ({
            tabs: [
                {
                    text: 'News',
                    to: 'news'
                },
                {
                    text: 'Charts',
                    to: 'chart'
                },
            ]
        })
    }
</script>

<style scoped>
    .card {
        margin: 80px auto 20px;
    }
</style>
