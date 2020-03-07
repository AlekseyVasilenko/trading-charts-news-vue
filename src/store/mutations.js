export default {
    request(state) {
        state.status = 'loading';
    },
    success(state) {
        state.status = 'success';
    },
    authRequest(state) {
        state.status = 'loading';
        state.error = {};
    },
    authSuccess(state, {token, user}) {
        state.status = 'success';
        state.token = token;
        state.user = user;
        state.error = {};
    },
    authError(state, err) {
        state.status = 'error';
        state.error = err;
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.user = {};
        state.error = {};
    },
    setNewsData(state, newsData) {
        state.newsData = newsData;
    },
    setChartData(state, chartData) {
        state.chartData = {};
        state.chartData = {'ohlcv': chartData}
    },
}
