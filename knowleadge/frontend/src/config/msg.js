import Vue from 'vue';
import Toasted from 'vue-toasted';
Vue.use(Toasted,{
    iconpack: 'fontawesome',
    duration: 3000
});
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operacao realizado com Sucesso!' : payload.msg,
    {type:'success', icon:'check'}
);
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ocorreu um erro inesperado!' : payload.msg,
    {type : 'error', icon:'times'}
);