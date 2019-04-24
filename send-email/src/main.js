import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
// Vue.use(Axios)

Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
