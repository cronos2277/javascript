import Vue from 'vue'
//Biblioteca do toasted
import Toasted from 'vue-toasted'
/*
    Sintaxe Vue.use(<Objeto>,<Objeto com parametros>);
    o metodo use registra o modulo para todas as instancias
    do Vue Js.
*/
Vue.use(Toasted, {
    iconPack: 'fontawesome', //Colocando pacote de icones
    duration: 3000 //O tempo que a duracao vai levar, no caso 3 segundos
})
//Aqui estamos registrando a mensagem padrao de sucesso.
Vue.toasted.register(
//Voce pode chamar em alguma instancia do Vue usando: this.$toasted.global.defaultSuccess();
    'defaultSuccess', //A String com o nome do evento, nesse caso sucesso Padrao.
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' } //Objeto contendo qual evento e o icone que usara.
)
//Aqui estamos registrando a mensagem padrao de fracasso.
Vue.toasted.register(
//Voce pode chamar em alguma instancia do Vue usando: this.$toasted.global.defaultError();    
    'defaultError', //A String ao qual equivale o evento, nesse caso fracasso Padrao.
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' } //Objeto contendo qual evento e o icone que usara.
)
/*
    Quando voce registra um objeto no Vue.use, ele ja fica disponivel para uso
    nesse caso voce tem acesso ao atributo criado no metodo use que eh o atributo
    toasted. Dai temos o metodo register, ele aceita basicamente 3 argumentos:
    1 -> 'o nome do evento', 2 -> 'funcaoCallback()' para quando for chamado,
    3 -> {type:'tipo',icon:'icone'}, contendo pelo menos um tipo, e se for o caso
    voce pode colocar o atributo icon nele para que o evento tenha um icone.
*/