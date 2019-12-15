import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import App from './App';
import './config/bootstrap'
import store from './config/store'; //Importando Store.
import router from "./config/router";
Vue.config.productionTip = false;
//repare que o store eh incluido aqui.
new Vue({
//<- equivalente a store: store, 
//quando o atributo tem o mesmo nome que o valor isso eh permitido.  
  store, 
  router: router, //<-ou pode ser na maneira classica.
  render: h => h(App)
}).$mount('#app')