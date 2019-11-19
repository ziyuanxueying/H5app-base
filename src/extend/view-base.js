import Vue from 'vue';
import _ from 'lodash';

const viewBase = Vue.extend({
  data: () => ({
    ruleList: [
      { storeKey: 'basic/user', route: 'pages/login/login' }
      // { storeKey: 'basic/community', route: 'pages/login/check-house' }
    ]
  }),
  created() {
    this.pageLoad();
  },
  methods: {
    pageLoad() {
      const item = _.chain(this.ruleList).find(p => !this.$store.getters[p.storeKey] && (!p.route || this.route !== p.route)).value();
      item && this.$uni.reLaunch({ url: `/${item.route}` });
    }
  }
});
export default viewBase;
