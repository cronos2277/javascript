/* Esse cross-env no json permite criar variaveis de ambientes tanto no mac, windows e linux.
   como variaveis de ambientes sao diferentes em cada sistema operacional, eh interessante usar
   aquilo, abaixo sera verificado se foi usado a tag build ou start como argumento do npm, gracas
   a esse modulo claro. Use npm run build para funcionar o modo production.
*/
//process.env eh o acesso a todas as variaveis de ambiente do sistema operacional, se nao identico a production, logo esta no modo dev.
const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack'); //necessario para funcionar o webpack
const MinicssExtractPlugin = require('mini-css-extract-plugin'); //mimifica o css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //Otimiza o css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //Por padrao o webpack mimifica JS, mas com esse modulo voce tem opcoes a mais.
module.exports = {
	mode: modoDev ? 'development': 'production', //Voce pode escolher entre modo de producao e desenvolvimento, mas apenas o producao mimifica, vale apenas para JS.
	entry: './principal.js', //Arquivo js de entrada, todos os imports desse arquivo ou feitos aqui serao exportados
	output:{
		filename:'app.min.js', //nome do arquivo js de saida.
		path: __dirname + '/dist' //diretorio do arquivo js de saida, o path precisa ser caminho absoluto.
	},
	devServer:{ //Esse servidor so funciona em localhost, pois eh para modo de desenvolvimento, talvez se colocar o host, funcione.
 			contentBase: "./dist", //A pasta que contera as paginas.
			port:9000 //a porta que ira ouvir.
	},
	optimization:{
		minimizer:[
			 new UglifyJsPlugin({
					cache:true, //Salva cache.
					parallel:true //Pode ser executado em paralelo, mais performatico que o padrao.
			}),
			new OptimizeCSSAssetsPlugin({
					
			})
		]
	},
	plugins:[ //aqui estao os plugins.
		new MinicssExtractPlugin({ //Esse plugin
				filename:"app.min.css" //nome do arquivo de saida caso use o plugin
		})
	],
	module:{ //aqui estao os loaders, por padrao o webpack so lida com JS.
		rules:[{ //Esse primeiro loader trabalha com os arquivos css.
			test:/\.s?[ac]ss$/, //Expressao regular que indica o tipo de arquivo a ser tratato, no caso tudo que termine em css.
			use:[
				MinicssExtractPlugin.loader, //o plugin carregado acima, para usar chame o atributo loader.
				/* Esse plugin de cima eh conflitante com o de baixo, o de cima mimifica,
				   esse debaixo ele coloca o codigo css dentro de uma tag style usando o DOM.
				 */
				//'style-loader', //adiciona CSS a DOM injetando a tag
				'css-loader', //interpreta @import, url(), etc...
				'sass-loader', //Trabalhar com SASS
			]	
		},
		{
			test:/\.(png|svg|jpg|gif)$/, //expressao regular, caso seja imagem.
			use:['file-loader'] //O file-loader permite que o webpack trabalhe com imagem
		}]
	}
}
/*
 Existe formas de importar arquivos, se voce usar o require ou o import apenas apontando para a pasta, a mesma ira importar o
 * arquivo index.js daquela pasta, ou seja segue a logica de procurar pelo arquivo index, como nos sites por exemplo,
 * alem disso esse codigo devido a expressao regular no test dentro de rules dentro de module, consegue interpretar sass ou scss.
 * o import eh recurso novo do ES6, logo nao deve funcionar em versoes antigas. Nao importe arquivos css ou sass aqui, importe
 * no arquivo que eh aqui referenciado, uma vez que esse arquivo ira rodar com os modulos para tratar esse tipo de arquivo
 * o sass-loader precisa do node-sass para funcionar, logo tudo que esta no package.json eh importante.
 * npm start => inicia o servidor tambem;
 * npm run build => inicia em modo de producao;
 * npm test => inicia em modo dev.
*/
