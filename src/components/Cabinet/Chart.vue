<template>
  <div>
    <b-button variant="outline-secondary" @click="loadData" :disabled="isLoading" class="mb-3" size="sm">
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
            :disabled="selector.length < 2"
            size="sm"
          />
        </div>

        <div ref="graph">
          <trading-vue
            ref="chart"
            :data="getChartData"
            :width="chart.width"
            :color-back="chart.colors.colorBack"
            :color-grid="chart.colors.colorGrid"
            :color-text="chart.colors.colorText"
          />
        </div>
      </b-col>

      <b-col>
        <div v-if="Object.keys(getUserWallets).length > 0">
          <h4 class="text-center mb-4">Your wallets:</h4>

          <table class="table table-bordered table-sm mb-4">
            <tbody>
              <tr v-for="(wallet, key) in getUserWallets" :key="key">
                <td class="text-right"><b>{{ key }}</b></td>
                <td class="text-left">{{ wallet }}</td>
              </tr>
            </tbody>
          </table>

          <h4 class="text-center mb-4">Buy/Sell:</h4>

          <b-row class="mb-2">
            <b-col>
              <b-input-group :append="apiParams.crypto">
                <b-form-input
                  number
                  v-model="currentCurrencyVal"
                />
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group append="USD">
                <b-form-input
                  number
                  v-model="currentCurrencyVal"
                  :disabled="true"
                />
              </b-input-group>
            </b-col>
          </b-row>

          <b-button variant="outline-success" block size="sm">Buy</b-button>
          <b-button variant="outline-danger" block size="sm">Sell</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {BInputGroup, BFormSelect, BFormInput, BButton, BRow, BCol} from 'bootstrap-vue'
  import axios from 'axios'
  import TradingVue from 'trading-vue-js'
  import 'vue-awesome/icons/redo'
  import VIcon from 'vue-awesome/components/Icon'
  import {mapGetters} from "vuex";

  export default {
    components: {BInputGroup, BFormSelect, BFormInput, BButton, BRow, BCol, TradingVue, VIcon},
    data: () => ({
      currentCurrency: 'BTC',
      currentCurrencyVal: 0,
      interval: '',
      chart: {
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
        timeInterval: 'minute',
        historyLimit: 50,
      },
      selectors: {
        crypto: [
          {text: 'BTC', value: 'BTC'},
          {text: 'ETH', value: 'ETH'},
        ],
        symbol: [
          {text: 'USD', value: 'USD'},
          // {text: 'EUR', value: 'EUR'},
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
        'getChartData',
        'getUserWallets'
      ]),
      apiLink() {
        let {link, timeInterval} = this.apiParams;

        return link + timeInterval;
      },
      reloadInterval() {
        let timeInterval = this.apiParams.timeInterval;
        switch (timeInterval) {
          case 'day':
            return 86400000;
          case 'hour':
            return 3600000;
          case 'minute':
          default:
            return 60000;
        }
      },
    },
    methods: {
      onResize() {
        this.chart.width = this.$refs.graph.clientWidth;
      },
      loadData() {
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
              let candles = response.data.Data.Data,
                  ohlcv = [];

              this.$store.dispatch('success');

              candles.forEach(candle => {
                let {time, open, high, low, close, volumeto} = candle;

                ohlcv.push([time * 1000, open, high, low, close, volumeto]);
              });

              this.$store.dispatch('setChartData', ohlcv);
              this.$refs.chart.resetChart();
            })
            .catch(err => console.log(err))
        }, 1000);
      },
    },
    created() {
      Object.keys(this.getChartData).length === 0 && this.loadData();

      this.interval = setInterval(() => {
        this.loadData();
        this.apiParams.historyLimit++;
      }, this.reloadInterval);
    },
    mounted() {
      let event = new Event('resize');
      window.addEventListener('resize', this.onResize);
      window.dispatchEvent(event);

      let payload = {
        "wallets": JSON.stringify({"USD":15000,"BTC":1,"ETH":30}),
        "email": "admin@admin.ru"
      };
      this.$store.dispatch('updateUserWallets', payload);
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize);
      clearInterval(this.interval)
    },
  }
</script>
