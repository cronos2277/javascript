{
	//Módulo node instalado por padrão para escrita de arquivos.
	const fs = require('fs'); //módulo interno.
	const nomeArquivo = 'meuArquivo.json';
	const codificacao = 'UTF-8';
	const obj = {
		nome:'meu nome',
		atributo:'meu atributo',
		codigo: 0000
	}

	const conteudo = JSON.stringify(obj); //Método Stringify transforma objeto em JSON.
/* 
    Para leitura é necessário uma callback que aceita o primeiro parametro para erro e o segundo para os dados,
	caso seja necessário manipular os dados a serem lidos de alguma forma.
*/
	const funcaoLeitura = function(erro,dados){
		(erro)?console.log(erro):console.log('leitura feito com sucesso!');
		console.log(dados);
	}
/*Para escrita é necessário uma callback com parametros para tratamento de erro */
	const funcaoEscrita = function(erro){
		(erro)?console.log(erro):console.log('escrita feito com sucesso!');
	}
/*Método writeFile(Aqui o nome do arquivo a ser escrito, O conteúdo desse arquivo, Callback para lidar com o erro)*/
	fs.writeFile(nomeArquivo,conteudo,funcaoEscrita);
/*Método readFile(O nome do arquivo a ser lido, a codificacao do arquivo, no caso usamos a UTF-8, a funcao de callback de leitura */	
	fs.readFile(nomeArquivo,codificacao,funcaoLeitura);
}
