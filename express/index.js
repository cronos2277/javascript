{
	const express = require('express');
	const app = express();
	const resposta = '/resposta/:id';
	const porta = '8001'
	function funcaoEscutar(){
		console.log(`O Express esta escutando na porta: ${porta} e pegando valores na: ${resposta}`);
	}
	function pegandoGet(requisicao,resposta,proximaFuncao){
		resposta.send(`Valor pego com o get: ${requisicao.params.id} `);
	}
	function pegandoPost(requisicao,resposta,proximaFuncao){
		resposta.send({value:"Objeto retornado como json, no Post"});
	}

	app.get(resposta,pegandoGet);
	app.post(resposta,pegandoPost);
	app.listen(porta,funcaoEscutar);
}
