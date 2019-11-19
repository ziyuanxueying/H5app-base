/*
 * @Author: 吴占超
 * @Date: 2019-08-16 14:04:58
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-11-18 14:30:45
 */
import Vue from 'vue';
import App from './App';
import axios from './extend/uni-request-axios.js';
import store from './vuex/store.js';
import uniUtils from './utils/uni-utils.js';
import cmdIcon from './components/cmd-icon.vue';
import titleBar from './components/title-bar.vue';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$uni = uniUtils;
Vue.component('cmdIcon', cmdIcon);
Vue.component('titleBar', titleBar);

App.mpType = 'app';

const app = new Vue({
  ...App,
  store
});
app.$mount();
