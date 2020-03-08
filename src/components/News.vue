<template>
    <div>
        <b-button variant="outline-secondary" @click="loadData" :disabled="isLoading" class="mb-3">
            <v-icon name="redo" :spin="isLoading"/>&nbsp;reload
        </b-button>

        <b-pagination-nav :link-gen="linkGen" :number-of-pages="pagesCount" use-router></b-pagination-nav>

        <b-card-group columns>
            <b-card
                v-for="item in paginatedData"
                :key="item.id"
                :title="item.title"
                :img-src="item.imageurl"
                :img-alt="item.title"
                img-top
            >
                <b-card-text>{{item.body}}</b-card-text>

                <template v-slot:footer>
                    <b-link :href="item.guid" class="card-link">Read more</b-link>
                </template>
            </b-card>
        </b-card-group>

        <b-pagination-nav :link-gen="linkGen" :number-of-pages="pagesCount" use-router></b-pagination-nav>
    </div>
</template>

<script>
    import axios from 'axios'
    import {BCardGroup, BCard, BCardTitle, BCardText, BLink, BButton, BPaginationNav} from 'bootstrap-vue'
    import {mapGetters} from "vuex"
    import 'vue-awesome/icons/redo'
    import VIcon from 'vue-awesome/components/Icon'

    export default {
        components: {BCardGroup, BCard, BCardTitle, BCardText, BLink, BButton, BPaginationNav, VIcon},
        data: () => ({
            newsPerPage: 8,
            apiParams: {
                link: 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN',
                key: '532938bd62a8a84670c1beff115b8e875e88eef9d9156c3be40fa685d5b5d7f3',
            },
        }),
        computed: {
            ...mapGetters([
                'isLoading',
                'getNewsData',
            ]),
            apiLink() {
                let {link, key} = this.apiParams;

                return link + '&api_key=' + key;
            },
            pagesCount() {
                return Math.ceil(this.getNewsData.length / this.newsPerPage) || 1;
            },
            curPage() {
                return this.$route.query.page
            },
            paginatedData() {
                let curPage = this.curPage || 1;
                const start = (curPage - 1) * this.newsPerPage,
                    end = start + this.newsPerPage;

                return this.getNewsData.slice(start, end);
            }
        },
        methods: {
            linkGen(pageNum) {
                return pageNum === 1 ? '?' : `?page=${pageNum}`
            },
            loadData() {
                this.$store.dispatch('request');
                setTimeout(() => {
                    axios.get(this.apiLink)
                        .then(response => {
                            let news = response.data.Data;

                            this.$store.dispatch('success');
                            this.$store.dispatch('setNewsData', news);
                        })
                        .catch(err => console.log(err))
                }, 1000);
            },
        },
        created() {
            if (this.getNewsData.length === 0) {
                this.loadData()
            }
        }
    }
</script>
