'use strict';

if (process.env.NODE_ENV === 'development') {
  exports.AXIOS_BASE = 'https://localfun.advokate.com.cn/web/pages/login/login-wx';// UAT测试
  exports.WECHART_ID = 'wxe1e00ceb03c478d5';
  exports.FACEBOOK_ID = '2829031917125865';
} else {
  // #ifndef UAT-CONST
  exports.AXIOS_BASE = 'https://localfun.advokate-bj.com/web/pages/login/login-wx';// 生产环境
  exports.WECHART_ID = 'wx2887e87ce77ca8b2';
  // #endif

  // #ifdef UAT-CONST
  exports.AXIOS_BASE = 'https://localfun.advokate.com.cn/web/pages/login/login-wx';// UAT测试
  exports.WECHART_ID = 'wxe1e00ceb03c478d5';
  // #endif

  exports.FACEBOOK_ID = '379367789393159';
}
