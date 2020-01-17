<h1>TypeScript compilador</h1>
<h2>Opcoes a serem colocadas ou habilitadas no tsconfig.json</h2>
<h3>Opcao noEmitOnError = true</h3>
<img src=".@imgs/onEmitOnError-true.png" /><br/>
A mesma deve ser colocada junto com as outras opcoes. Dentro da propriedade compilerOptions. Por padrao essa
opcao nao esta la, mas pode ser adicionado as configuracoes do compilador se necessario. Ela nao gera arquivo javascript, caso
possua erros no typescript, para isso basta colocar como um atributo
no json, ficando '<b>"noEmitOnError":true</b>'
<h3>Target</h3>
A propriedade target define o arquivo de saida JS, no caso voce especifica quais tecnologias geradas o arquivo de saida pode conter,
por padrao vem o es5 e por exemplo nesse padrao nao tinha o let, logo todas as variaveis criadas saem com o var, ao inves do let
quando a mesma eh criada. Agora se mudar para es6 ai o let comeca a aparecer por exemplo, essa opcao tem sim la no json e pode ser habilitada.
ficando: '<b>"target":"es5"</b>'
<h3>source Maps</h3>
ELe cria um arquivo .map junto na hora da compilacao, para que permitase o acompanhamento do codigo TypeScript pelo console do navegador.
Ou seja assim como voce pode acompanhar quando for debugar o codigo via javascript, isso vai permitir fazer isso com o typescript tambem.
'<b>sourceMap:true</b>'
<h3>Outputs</h3>
<img src=".@imgs/outputs.png" /><br/>
a opcao outDir faz referencia ao diretorio de output, enquanto que o outFile permite que todos os codigos javascript sejam unidos em um 
unico arquivo, para se unir todo em um arquivo: '<b>./[PATH]/[FILE.JS]</b>' <= [PATH] = diretorio, [FILE] => o arquivo de output.
siga sempre o padrao do unix quando for usar o outDir e o outFile. Porem algo mais eh necessario ser feito.
<img src=".@imgs/module-js.png" /><br/>
No caso por padrao do module eh comonjs, que eh o padrao do node js, que trata cada arquivo como um modulo, para que tudo funcione isso 
deve ser alterado tambem, caso voce queira incluir tudo dentro de um unico so arquivo, para alterar o diretorio de saida nao precisa se
preocupar com isso. apenas se voce quiser colocar tudo dentro de um arquivo unico. Mudar o modulo para system ou algum outro modulo, que
eh aquele campo selecionado na ultima imagem do json com o campo module selecionado, resolveria. Ficando assim:
'<b>"module":"system"</b>'
<h2>Uso</h2>
<h3>tsc [seu arquivo]</h3>
Compila o arquivo transformando-o em javascript. O <b>[seu arquivo]</b> deve ser substituido pelo arquivo a ser compilado.
<h3>tsc -init</h3>
cria um arquivo json padrao com muitas opcoes comentadas. Esse arquivo define o funcionamento do compilador.
<h3>tsc -w [arquivo.ts]</h3>
Monitora um arquivo e compila quando uma alteracao eh feita. O <b>[arquivo.ts]</b> deve ser substituido pelo arquivo a ser moniorado.
