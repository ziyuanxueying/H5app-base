/* eslint-disable no-undef */
/*
 * @Author: 冯杰
 * @Date: 2019-08-16 14:51:52
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-11-18 16:17:21
 */
import { deleteData } from '../utils/obj-extend';
import store from '../vuex/store.js';

class Axios {
  constructor() {
    this.baseUrl = '/api';
    this.header = {
      'content-type': 'application/json',
      Accept: 'application/json'
    };
  }

  get({ url, data, dataType = 'json', config } = {}) {
    return this.request({ url, data, method: 'GET', dataType, config });
  }

  post({ url, data, dataType = 'json', config, header } = {}) {
    return this.request({
      url,
      data,
      method: 'POST',
      dataType,
      config,
      header
    });
  }

  put({ url, data, dataType = 'json', config, header } = {}) {
    return this.request({ url, data, method: 'PUT', dataType, config, header });
  }

  del({ url, data, dataType = 'json', config, header } = {}) {
    return this.request({
      url,
      data,
      method: 'DELETE',
      dataType,
      config,
      header
    });
  }

  async request({
    url,
    data,
    method = 'GET',
    dataType = 'json',
    config,
    header
  } = {}) {
    deleteData(data);
    const token = store.getters['basic/token'];
    token && (this.header.authorization = token);
    Object.assign(this.header, header);

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      uni.request({
        url: `${this.baseUrl}${url}`,
        data,
        dataType,
        header: this.header,
        method,
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else if (res.statusCode === 511) {
            uni.showToast({ title: res.data.message, icon: 'none' });
            reject(res.data);
          } else if (res.statusCode === 401) {
            store.dispatch('basic/logoutSuccess');
            uni.reLaunch({
              url: '/pages/login/login'
            });
            // uni.navigateBack({
            //   delta: 999
            // });
          }
          reject(res.data);
        },
        fail: err => {
          reject(err);
        }
      });
    });
  }
}
module.exports = new Axios();
