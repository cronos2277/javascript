import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import App from './App';
import './config/bootstrap';
import './config/msg'; //Importando arquivo de mensagens
import store from './config/store'; //Importando Store.
import router from "./config/router";
Vue.config.productionTip = false;

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFkYW0gU2t5bmV3IiwiZW1haWwiOiJlbWFpbEBlbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTc2NTI2NzE3LCJleHAiOjE1NzY3ODU5MTd9.6HLrSl0mvVbuj0OR4efMYmSNAJrMFpxb2VqF5UkcJoM';

//repare que o store eh incluido aqui.
new Vue({
//<- equivalente a store: store, 
//quando o atributo tem o mesmo nome que o valor isso eh permitido.  
  store, 
  router: router, //<-ou pode ser na maneira classica.
  render: h => h(App)
}).$mount('#app')