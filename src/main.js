import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from '@/router';
// 导入初始化样式
import '@/styles/reset.less';
// 全局注册vant模块
import { Toast, Uploader, Dialog, Icon, Field, Popup, Picker, Tab, Tabs, List, PullRefresh, Sticky, Search } from 'vant';

Vue.use(Toast)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(Icon)
  .use(Picker)
  .use(Popup)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Sticky)
  .use(Search)

import Vuex from 'vuex';
Vue.use(Vuex);
// 初始化vuex对象
const store = new Vuex.Store({
  // state是放置公共状态的属性，如果你有一个公共状态数据，你只需要定义在state对象中
  state: {
    // name: '李师',
    // userInfo: {
    //   name: '张珊',
    //   age: 20,
    //   gender: 'women'
    // }
    historyList: []
  },
  mutations: {
    addHistory(state, data) {
      if (state.historyList.indexOf(data) === -1) {
        state.historyList.unshift(data);
      }
    },
    restoreHistory(state, data) {
      state.historyList = data;
    },
    removeHistory(state) {
      state.historyList = [];
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
