/*
    Aqui nos temos o vues, que lida com state no vue.
    O state tem a funcionalidade de criar uma especie
    de atributos de classe, ou seja os atributos estaticas
    do O.O, o funcionamento eh parecido com os metodos de
    classe, uma vez que o atributo estara disponivel a qualquer
    instancia do Vue, e eh justamente para isso que server o
    Vuex.
*/
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//new Vuex.Store({estados,mutacoes})
export default new Vuex.Store({
    state: {
        //Os estados em questao, dentro do objeto state.
        isMenuVisible: false,
        user: null
    },
    mutations: {
        //mutations: aqui as funcoes para mudar o estado do atributo.
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})
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