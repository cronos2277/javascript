import Vue from 'vue'
import VueMq from 'vue-mq'
/*
    Esse eh o Vue Media Query, que ajuda na responsividade.
    Quando aplicado no use fica disponivel para todas as
    instancias.
    
*/
Vue.use(VueMq, { //No caso aqui eh definido um objeto dentro com breakpoints
    breakpoints: { //Aqui sao definidos os breakpoints como no bootstrap.
        xs: 576, //Menor tamanho
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity //Infinito, ou seja qualquer tamanho maior que ultimo informado.
    }
})