import axios from 'axios'
//Funcao de interceptacao de sucesso, no caso nao faz nada, 
//apenas retorna o proprio parametro, detalhe a funcao precisa
//retornar algo senao da problemas.
const success = res => res
//Aqui a interceptacao em caso de erro.
const error = err => {
    //Se for o erro 401, que acontece com o token expira,
    // redireciona a raiz da aplicacao
    if (401 === err.response.status) {
        window.location = '/'
    } else {
    //Caso nao retorna a rejeicao da promisse.    
        return Promise.reject(err)
    }
}
/*
    Aqui o Axios intercepta sucesso e erro, exemplo de uso.
    como parametro eh aceito duas callbacks a primeira de sucesso
    e a segunda de erro, no caso toda vez que o axios fazer
    uma requisicao essas funcoes irao interceptar.
    axios.interceptors.response.use(<callbackSuccesso>, <callbackErro>)
*/
axios.interceptors.response.use(success, error)