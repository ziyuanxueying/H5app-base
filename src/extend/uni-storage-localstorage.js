/*
 * @Author: 吴占超
 * @Date: 2019-08-16 15:51:55
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-09-09 23:08:40
 */
class LocalStorage {
  set(key, data) {
    // eslint-disable-next-line no-undef
    return uni.setStorageSync(key, data);
  }
  get(key, defaultValue) {
    // eslint-disable-next-line no-undef
    const value = uni.getStorageSync(key);
    return value || defaultValue;
  }
  getInfo() {
    // eslint-disable-next-line no-undef
    return uni.getStorageInfoSync();
  }
  remove(key) {
    // eslint-disable-next-line no-undef
    return uni.removeStorageSync(key);
  }
  clear(key) {
    // eslint-disable-next-line no-undef
    return uni.clearStorageSync();
  }
}
module.exports = new LocalStorage();
