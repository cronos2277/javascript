<h1>Explicando comandos NPM </h1>
<h2>NPM</h2>
<b>npm init -y</b><br> O init cria o package.json e o -y ele cria de maneira padrao sem questionar nada<br>
<b>npm i</b><br>Comando para instalar algum modulo.<br>
<b>npm i -g</b><br>Comando para instalar de forma global, precisa ser root.<br>
<b>npm i --save</b><br>Salva o pacote instalado no package.json<br>
<b>npm i --save-dev</b><br>Salva o pacote instalado no package.json, mas como dependencia de desenvolvedor<br>
<b>node</b><br> Laucher padrao que executa o arquivo js selecionado.
<h2>NODEMON</h2>
Quando instalado, ele monitora o arquivo e toda vez que o arquivo eh alterado, exemplo de uso: nodemon "arquivo".js
<br><br>
<h2>PM2</h2>
<span>O PM2 eh um laucher mais profissional usado em ambientes de producao</span><br><br>
<b>pm2 start Arquivo.js --name nome-da-aplicacao</b><br>Executa e monitora a aplicacao usando o PM2<br>
<b>pm2 monit</b><br> Abre o monitor que exibira detalhes sobre os processos node abertos<br>
<b>pm2 status</b><br> Exibe o estatus de todos os processos node abertos em uma tabela<br>
<b>pm2 show "id do processo"</b><br> Descreve os detalhes do node processo do ID selecionado<br>
<b>pm2 restart "id do processo"</b><br>Reinicia o node do processo selecionado<br>
<b>pm2 stop "id do processo"</b><br>Paraliza o node processo selecionado<br>
<b>pm2 kill</b><br>Finaliza a aplicacao PM2 e mata todos os processos.
