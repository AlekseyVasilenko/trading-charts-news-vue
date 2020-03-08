<template>
    <div>
        <b-button variant="outline-secondary" @click="loadData" :disabled="isLoading" class="mb-3">
            <v-icon name="redo" :spin="isLoading"/>&nbsp;reload
        </b-button>

        <b-row>
            <b-col cols="8">
                <div class="mb-3">
                    <b-form-select
                            v-for="(selector, key) in selectors"
                            :key="key"
                            v-model="apiParams[key]"
                            :options="selector"
                            class="col-2 mr-1"
                            @change="loadData"
                    />
                </div>

                <div ref="graph">
                    <trading-vue
                            :data="chart.data"
                            :width="chart.width"
                            :color-back="chart.colors.colorBack"
                            :color-grid="chart.colors.colorGrid"
                            :color-text="chart.colors.colorText"
                    />
                </div>
            </b-col>

            <b-col>
                <h4 class="text-center">Your wallets:</h4>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {BFormSelect, BButton, BRow, BCol} from 'bootstrap-vue'
    import axios from 'axios'
    import TradingVue from 'trading-vue-js'
    import 'vue-awesome/icons/redo'
    import VIcon from 'vue-awesome/components/Icon'
    import {mapGetters} from "vuex";

    export default {
        components: {BFormSelect, BButton, BRow, BCol, TradingVue, VIcon},
        data: () => ({
            interval: '',
            chart: {
                data: {},
                width: 600,
                colors: {
                    colorBack: '#fff',
                    colorGrid: '#eee',
                    colorText: '#333',
                },
            },
            apiParams: {
                link: 'https://min-api.cryptocompare.com/data/v2/histo',
                key: '532938bd62a8a84670c1beff115b8e875e88eef9d9156c3be40fa685d5b5d7f3',
                crypto: 'BTC',
                symbol: 'USD',
                timeInterval: 'hour',
                historyLimit: 50,
            },
            selectors: {
                crypto: [
                    {text: 'BTC', value: 'BTC'},
                    {text: 'ETH', value: 'ETH'},
                ],
                symbol: [
                    {text: 'USD', value: 'USD'},
                    {text: 'EUR', value: 'EUR'},
                ],
                timeInterval: [
                    {text: 'minute', value: 'minute'},
                    {text: 'hour', value: 'hour'},
                    {text: 'day', value: 'day'},
                ],
                historyLimit: [
                    {text: 50, value: 50},
                    {text: 200, value: 200},
                    {text: 500, value: 500},
                ],
            },
        }),
        computed: {
            ...mapGetters([
                'isLoading',
                'getChartData'
            ]),
            apiLink() {
                let {link, timeInterval} = this.apiParams;

                return link + timeInterval
            },
            reloadInterval() {
                let timeInterval = this.apiParams.timeInterval;
                switch (timeInterval) {
                    case 'minute':
                        return 60000;
                    case 'hour':
                        return 3600000;
                    case 'day':
                        return 86400000;
                    default:
                        return 1000;
                }
            },

        },
        methods: {
            onResize() {
                this.chart.width = this.$refs.graph.clientWidth;
            },
            loadData() {
                if (Object.keys(this.chart.data).length !== 0) this.chart.data = {};

                let {crypto, symbol, historyLimit, key} = this.apiParams;

                this.$store.dispatch('request');
                setTimeout(() => {
                    axios.get(this.apiLink, {
                        params: {
                            fsym: crypto,
                            tsym: symbol,
                            limit: historyLimit,
                            api_key: key
                        }
                    })
                        .then(response => {
                            let candles = response.data.Data.Data;
                            let ohlcv = [];

                            this.$store.dispatch('success');

                            candles.forEach(candle => {
                                let candleParams = [],
                                    {time, open, high, low, close, volumeto} = candle;

                                candleParams.push(time * 1000);
                                candleParams.push(open);
                                candleParams.push(high);
                                candleParams.push(low);
                                candleParams.push(close);
                                candleParams.push(volumeto);

                                ohlcv.push(candleParams);
                            });

                            this.$store.dispatch('setChartData', ohlcv);
                            this.$set(this.chart, 'data', this.getChartData);
                        })
                        .catch(err => console.log(err))
                }, 1000);
            },
        },
        mounted() {
            let event = new Event('resize');
            window.addEventListener('resize', this.onResize);
            window.dispatchEvent(event);
        },
        created() {
            if (Object.keys(this.getChartData).length === 0) {
                this.loadData();
            }
            this.interval = setInterval(() => {
                this.loadData();
                this.apiParams.historyLimit++;
            }, this.reloadInterval);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
            clearInterval(this.interval)
        },
    }
</script>

<style scoped>
    .card {
        margin-top: 80px;
    }
</style>
