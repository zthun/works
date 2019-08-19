import Vue from 'vue';
import ZAppComponent from './app/app.component.vue';

Vue.config.productionTip = false;
Vue.config.devtools = false;

export default new Vue({
  el: '#app',
  render: (h) => h(ZAppComponent),
  components: { ZAppComponent }
});
