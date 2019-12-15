import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import App from './App';
import './config/bootstrap'
import store from './config/store'; //Importando Store.
Vue.config.productionTip = false;
//repare que o store eh incluido aqui.
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')