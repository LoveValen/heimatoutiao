import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from '@/router';
// 导入初始化样式
import '@/styles/reset.less';
// 全局注册vant模块
import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
