<h1>TypeScript compilador</h1>
<h2>Opcoes a serem colocadas ou habilitadas no tsconfig.json</h2>
<h3>Opcao noEmitOnError = true</h3>
<img src=".@imgs/onEmitOnError-true.png" /><br/>
A mesma deve ser colocada junto com as outras opcoes. Dentro da propriedade compilerOptions. Por padrao essa
opcao nao esta la, mas pode ser adicionado as configuracoes do compilador se necessario.
<h2>Uso</h2>
<h3>tsc [seu arquivo]</h3>
Compila o arquivo transformando-o em javascript. O [seu arquivo] deve ser substituido pelo arquivo a ser compilado.
<h3>tsc -init</h3>
cria um arquivo json padrao com muitas opcoes comentadas. Esse arquivo define o funcionamento do compilador.
<h3>tsc -w [arquivo.ts]</h3>
Monitora um arquivo e compila quando uma alteracao eh feita. O [arquivo.ts] deve ser substituido pelo arquivo a ser moniorado.
