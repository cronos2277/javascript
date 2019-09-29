{
	const axios = require('axios');
	const f = require('./file');
	console.log(f.var1,f.var2,f.var3);
	const http = require('http');
	const conteudo = function(requisicao,resposta){
		resposta.write('Ola mundo<br/>');
		resposta.end();
	}
	http.createServer(conteudo).listen(8081);
}
