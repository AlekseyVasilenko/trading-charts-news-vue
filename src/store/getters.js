export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  isLoading: state => state.status === 'loading',
  getNewsData: state => state.newsData,
  getChartData: state => state.chartData,
}
