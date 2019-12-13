<h1> Projeto Instrucoes.</h1>
<h2>Mongo DB</h2>
O mongo precisa estar devidamente instalando precisa estar em execucao
<h2>Seguranca</h2>
Nao esqueca de alterar a chave do arquivo "<b>.env</b>", na aplicacao, essa chave
garante seguranca na aplicacao, eh obrigatorio mudar o valor caso use essa solucao,
por questoes de seguranca, mude a String de altenticacao e cuidado com esse arquivo
para nao cair em maos erradas. Caso a chave usada para criptografar vaze a terceiros,
qualquer um pode acessar a sua aplicao como se estivesse logado, quebrando assim
a seguranca <br>
<h2>POSTGRES</h2>
1 - iniciar usando o comando "<b>sudo su - postgres</b>".<br> 
2 - depois "<b>psql</b>". <br>
3 - uma vez feito isso criaremos o banco de dados "<b>CREATE DATABASE knowleadge</b>".<br>
4 - caso tenha problemas com a conexao com o Postgres no linux, tente o seguinte:<br>
Inicialmente entre com o seguinte comando <b>su postgres</b> a senha deve ser a mesma informada
na hora da instalacao.
<br>
Depois: <b>psql -c "ALTER USER postgres WITH PASSWORD '[a sua senha]'" -d template1</b> 
a senha usada nesse projeto eh a 123456, que pode ser alterada no arquivo knexfile.js
o comando em questao eh toda a parte em negrito, e a <b>[a sua senha]</b> deve ser substituida
pela mesma senha do knexfile.js





