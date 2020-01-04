import Vue from 'vue'
/*
    a userKey sera a variavel que sera usado na aplicacao.
    e o valor aqui sera o nome que o local storage usara
    para criar o arquivo, esse conteudo pode ser visualizado
    chamando no console do navegador e digitar:
    localStorage.__knowledge_user => voce tera acesso ao dados salvos
    em uma string json. logo o user key sera usado no Auth.vue como
    um parametro do metodo setItem do localStorage
*/
export const userKey = '__knowledge_user'
//porta que a aplicacao rodara: 4000
export const baseApiUrl = 'http://localhost:4000' 

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }