const quantasVezes = 2; /*Quantidade de vezes que será executado a response, antes de cair no reject. */
let valor = 0; /*Valor Inicial, antes da operação. */
function callbackResponse(param){
	/*Essa função, ela é chamada no response, somando a variável valor */
	valor += param;
}

function callbackReject(param){
	/*Essa função é chamado no reject, ou seja quando existe a rejeição.*/
	console.log(`O valor da operação é:${param}`);
}

const executarPromise = function(quantasVezes){
	/*A promise aceita 2 parametros, o primeiro é o response que é uma callback e o segundo é o reject que também é uma callback.*/
	return new Promise(function(response,reject){
		/*A quantidade de vezes que se executa, verifica se a quantidades de vezes é maior que zero, e depois decrementa.*/
		if(quantasVezes-- > 0){
			/*Aqui é o response, o response equivale ao .then() na execução. */
			response(callbackResponse);
		}else{
			/*Aqui é o reject, o response equivale ao .catch() na execução. Isso acontece no caso de erro, no caso quando o quantasVezes chega a zero, se chama o reject. */
			reject(callbackReject);
		}
	});
}
executarPromise(quantasVezes).then(callbackResponse(5)).then(callbackResponse(4)).then(callbackResponse(6)).catch(callbackReject(valor));
/*Se tudo ocorrer bem o resultado será "O valor da operação é:15" */
/*
Uma promisse ela é uma promessa de que será executado e além disso a mesma é uma forma de executar códigos de maneira assincrona. 
Na sua promisse você passa uma função no construtor, essa função pode usar dois parametros, sendo o primeiro a resposta e o segundo,
a rejeição, tanto a resposta quanto a rejeição também é uma callback. Dentro da função promise, você programa a regra de negocios, 
caso de o resultado previsto, chame a resposta e essa resposta vai executar a função que você quer que seja executada, se caso ocorra 
alguma exceção a sua regra de negócio, ai você pode chamar a rejeição.
new Promise(função(parametro de resposta, parametro de rejeição){
	//sua regra de negócio, por exemplo;
	if(se dentro da regra){
		parametro de resposta(a função que você quer que seja executada);
	}else{
		parametro de rejeição(coloque aqui a função para tratar dos erros);
	}
});
agora chamando a sua promise.
new Promisse(function(response,reject)).then(coloque aqui a primeira função a ser executada).then(coloque aqui a função a ser executada logo após o
sucesso da função anterior).then(a quantidade de then é infinita campeão).catch(coloque aqui a função a ser executada, caso de algum erro.);
A Promisse é uma forma de fazer um código não bloqueante, muito útil para executar processos que podem demorar, como leitura de arquivos ou banco de dados.
Ou seja com ela vocâ executa o código de maneira assincrona, permitindo que o código posterior continue a ser executado, ao mesmo tempo que a promisse é executada.
*/