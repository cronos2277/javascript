/*
    Aqui nos temos o vues, que lida com state no vue.
    O state tem a funcionalidade de criar uma especie
    de atributos de classe, ou seja os atributos estaticas
    do O.O, o funcionamento eh parecido com os metodos de
    classe, uma vez que o atributo estara disponivel a qualquer
    instancia do Vue, e eh justamente para isso que server o
    Vuex.
*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//new Vuex.Store({estados,mutacoes})
export default new Vuex.Store({
    //Os estados em questao, dentro do objeto state.
    state:{
        isMenuVisible:true,
        user:{
            name:"Usuario User",
            email:'email@email.com'
        }
    },
    //mutations: aqui as funcoes para mudar o estado do atributo.
    mutations:{
        toggleMenu(state,isVisible){
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible;
            }else{
                state.isMenuVisible = isVisible;
            }
            
        }
    }
});
/*
    Lembre-se de incluir no arquivo main.js
    import store from './config/store'; //<- o import
    new Vue({
  store, //<-- inclua aqui.
  render: h => h(App)
}).$mount('#app'

Deu problema quando eu usei o nome em letra de forma Store, entao
quando eu mudei para letra minuscula funcionou.
*/
