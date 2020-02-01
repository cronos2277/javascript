import Vue from 'vue';
import App from './app.vue';
/*
  Aqui eh feita a substituicao do conteudo no index.html na pasta
  publica pelo que sera renderizado aqui, o metodo abaixo renderiza
  todo o conteudo do arquivo app.vue para dentro da pagina.
*/
new Vue({  
  //Esse metodo renderiza o que sera exibido, esse metodo deve retornar algo. 
  /*  
    No caso a arrow function deixa bem claro como functiona, tudo que voce precisa fazer
    eh informar a mesma uma funcao ao render que sera usada para referencia na pagina, 
    nesse caso ela usa a criarElemento, essa funcao criar elemento, retorna uma funcao,
    passando como parametro o arquivo com o componente a ser renderizado. Isso tambem
    poderia ficar assim:
    render: function(funcao){
        return funcao(ArquivoASerRenderizado);
    }
    ou seja esse atributo ele envoca a funcao que foi informada no parametro.
  */
  render: criarElemento => criarElemento(App)
}).$mount("#app"); //<= Esse metodo ao final do objeto vue instanciado equivale ao atributo el.
/* 
  Repare que nesse exemplo nao existe um seletor el, justamente porque ele esta ao sendo 
chamado ao final do objeto criado com o metodo $mount('seletor'), essa pode ser uma 
estrategia alternativa a colocar o seletor como valor do atributo el.

 */


/*
Na pasta public a div com id app vai ser apagado do mesmo jeito, por mais
que voce use outro seletores aqui, entao por padrao eh bom usar padao 
que eh #app.
*/