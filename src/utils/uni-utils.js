/*
 * @Author: 吴占超
 * @Date: 2019-08-22 20:29:35
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-11-18 16:16:06
 */
import store from '../vuex/store';
const navigate = Symbol('navigate');
const findToUrl = Symbol('findToUrl');

const routelist = [
  // 啟動頁
  '/pages/login/login'
];
class UniUtils {
  showToast(text) {
    this[navigate]({
      title: text,
      icon: 'none'
    }, 'showToast');
  }
  [findToUrl](url) {
    console.log(process.env.NODE_ENV !== 'development' &&
      (!store.getters['basic/user'] && !routelist.includes(url))
      ? '/pages/login/login' : url);
    return process.env.NODE_ENV !== 'development' &&
      (!store.getters['basic/user'] && !routelist.includes(url))
      ? '/pages/login/login' : url;
  }
  /**
   * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
   */
  navigateTo({ url, animationType = 'pop-in', animationDuration = 300, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, animationType, animationDuration, success, fail, complete
    });
  }
  // 关闭当前页面，跳转到应用内的某个页面。
  redirectTo({ url, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, success, fail, complete
    }, 'redirectTo');
  }
  // 关闭所有页面，打开到应用内的某个页面。
  reLaunch({ url, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, success, fail, complete
    }, 'reLaunch');
  }
  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
  switchTab({ url, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, success, fail, complete
    }, 'switchTab');
  }
  // 关闭当前页面，返回上一页面或多级页面。
  navigateBack(delta) {
    this[navigate]({ delta }, 'navigateBack');
  }
  // 模态弹窗，类比html的alert和confirm
  async showModal({
    title,
    content,
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#cccccc',
    confirmText = '確定',
    confirmColor = '#353535'
  } = {}) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      uni.showModal({
        title,
        content,
        showCancel,
        cancelText,
        cancelColor,
        confirmText,
        confirmColor,
        success: result => {
          resolve(result);
        },
        fail: err => {
          reject(err);
        }
      });
    });
  }
  [navigate](param, actionName = 'navigateTo') {
    // eslint-disable-next-line no-undef
    uni[actionName](param);
  }
}
module.exports = new UniUtils();
