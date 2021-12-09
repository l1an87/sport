import Vue from 'vue';
import { VuetifyInstall, VuetifyTiptapInstall, VuetifyInit } from '@/plugins/vuetify';
import { store } from '@/store';
import router from '@/router';
import filters from '@/filters';

import Main from '@/app/App.component.vue';

Vue.config.productionTip = false;
Vue.use(VuetifyInstall);
Vue.use(filters);
const vuetify = VuetifyInit({ primary: '#00a03b' });
Vue.use(VuetifyTiptapInstall, { vuetify });

if (window.location.protocol !== 'https:') {
  window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
}

window.app = new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(Main),
}).$mount('#app');
