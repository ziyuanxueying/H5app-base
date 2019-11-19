/*
 * @Author: 吴占超
 * @Date: 2019-08-16 15:19:40
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-11-18 14:42:09
 */
import LocalStorage from '../extend/uni-storage-localstorage';

export default {
  namespaced: true,
  state: {
    // 加载状态
    ajaxLoad: false,
    // ajax正在加載的项目
    loadingItem: [],
    // 当前登陆人
    user: undefined,
    // 未解密的token
    token: undefined,
    // 購物車數量
    cartNum: 0
  },
  getters: {
    user(state) {
      let user = LocalStorage.get('user');
      !state.user && user && (state.user = user);
      return state.user;
    },
    ajaxLoad(state) {
      return state.ajaxLoad;
    },
    token(state) {
      let def = LocalStorage.get('token');
      !state.token && def && (state.token = def);
      return state.token;
    },
    cartNum(state) {
      let cart = LocalStorage.get('cartNum');
      !state.cartNum && cart && (state.cartNum = cart);
      return state.cartNum;
    },
    activityType(state) {
      let activityType = LocalStorage.get('activityType');
      !state.activityType && activityType && (state.activityType = activityType);
      return state.activityType;
    }
  },
  mutations: {
    /**
     * 登陆成功
     *
     * @param {any} state
     * @param {any} [user=validKey()]
     */
    loginSuccess(state, user) {
      state.user = user;
    },
    /**
     * 退出
     *
     * @param {any} state
     */
    logoutSuccess(state) {
      state.user = undefined;
    },
    /**
     * 未解密token
     *
     * @param {*} state
     * @param {*} value
     */
    token(state, value) {
      state.token = value;
    },
    /**
     * 購物車數量每次+1
     * @param {*} state
     * @param {*} cartNum
     */
    cartNum(state, cartNum) {
      state.cartNum = cartNum;
    },
    activityType(state, activityType) {
      state.activityType = activityType;
    }
  },
  actions: {
    /**
     * 登陆成功方法
     *
     * @param {any} context
     * @param {any} user
     */
    loginSuccess(context, user) {
      LocalStorage.set('user', user);
      context.commit('loginSuccess', user);
    },
    /**
     * 清空登陆人
     *
     * @param {any} context
     */
    logoutSuccess(context) {
      LocalStorage.clear('user');
      context.commit('logoutSuccess');
    },
    /**
     * 未解密
     *
     * @param {*} context
     * @param {*} value
     */
    token(context, value) {
      LocalStorage.set('token', value);
      context.commit('token', value);
    },
    cartNum(context, cartNum) {
      LocalStorage.set('cartNum', cartNum);
      context.commit('cartNum', cartNum);
    }
  }
};
