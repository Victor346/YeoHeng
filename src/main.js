import Vue from 'vue';
import Buefy from 'buefy';
import PortalVue from 'portal-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
  defaultContainerElement: '#content',
});

Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
