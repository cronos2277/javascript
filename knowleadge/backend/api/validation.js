module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError }
}
/*
    aqui temos a chamada throw, sintaxe:
    throw "MENSAGEM DE ERRO";
    uma vez chamado a throw voce pode mandar exeibir essa mensagem na
    tela como se voce um erro.
    Essa funcao, eh uma funcao para avaliar se os existe algum dado
    enviado pelo cliente esta vazio e se existe algum dado que repetido,
    caso exista eh dado um throw e ai essa mensagem de erro eh enviado
    para o o cliente como um erro 400. Mais informacoes, veja o arquivo
    users.js
 */
