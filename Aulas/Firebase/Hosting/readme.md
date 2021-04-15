# Deploy com firebase Hosting

## Deploy no console do firebase

**Na imagem abaixo está o caminho a percorrer para começar a usar o firebase host:**

![deploy](.img/deploy_1.png)

>O Firebase Hosting permite implantar as nossas aplicações na internet de forma prática e segura. O Firebase fornece certificados SSL/TSL gratuitos (conexão segura - HTTPS) que são configurados automaticamente para as nossas aplicações Web.

>O Firebase Hosting também facilita o versionamento e trocas rápidas entre as versões da nossa aplicação. Se a última versão apresentou problemas, você pode mudar facilmente para uma versão anterior.

>O conteúdo das nossas aplicações é entregue para os usuários em alta velocidade através do armazenamento em caches em SSDs nas CDNs distribuídas ao redor do mundo.

### Ao clicar no botão

**Se você deixar o campo desmarcado, você terá um passo a menos, exceto que você usa isso de maneira comercial para integrar o projeto com o google, deixe desmarcado. Além disso aquele comando do `npm` você deve executar, no caso será instalado, ou atualizado se ja estiver instalado a mais nova versão do firebase, no caso esse pacote é instalado via npm de maneira global.**

>npm install -g firebase-tools

![deploy](.img/deploy_2.png)

**OU**

![deploy](.img/deploy_2_alternativo.png)

### Inicializando o projeto

**Aqui o firebase está te dando uma orientação, inicialmente, você usa o comando `firebase login` e loga no serviço, você pode usar o `firebase logout` caso você queira fazer login em uma outra conta e deseja deslogar primeiro.**

![deploy](.img/deploy_3.png)

**Após o ocorrido acima, você deve ver uma mensagem como essa, sim no caso o firebase vai abrir um link do navegador e nesse link aberto você se autentica, uma vez autenticado, você pode continuar.**

>`firebase login`  --> siga os passos abrirá um pop up no navegador ao qual você deve informar a conta google para continuar.

 >`firebase logout` --> fará o logout da conta.

![deploy](.img/deploy_4_login_sucesso.png)


## Inicializando a aplicação no computador   
Para começar um projeto, você deve dar o comando `firebase init`, esse comando irá fazer com que o firebase abra o wizard, no caso você verá algo semelhante a isso no seu terminal, **recomenda-se usar um diretório limpo para isso, pode ser em qualquer lugar, uma vez que depois de pronto você irá copiar os arquivos para dentro da pasta definida como `public` desse wizard. Pressione enter para continuar ou `y`.**

![deploy](.img/deploy_5_terminal_inicio.png)

>firebase init

### Que serviço você pretende usar?
**Aqui nós vamos definir o serviço a ser usado, use as `setas` para se movimentar pelo menu, `espaço` para selecionar um ítem e a tecla `enter` para continuar, nesse caso se for para usar o serviço de hosting segue o mesmo exemplo da imagem abaixo:**

![deploy](.img/deploy_6_selecione_hosting.png)

>No caso vai até o ítem `Hosting: ... `, `espaço` e `enter`.

### Selecionar um projeto ou criar um novo?

**Aqui você informa se você quer criar um projeto novo, ou carregar um projeto, no caso você pode iniciar um projeto por esse wizard se quiser. Na opção que está definida na imagem, você terá que escolher entre os projetos associados a sua conta.**

![deploy](.img/deploy_7_selecione_projeto_existente.png)


### Selecione o projeto

**Aqui você deve informar, qual projeto você gostaria de fazer hosting.**

![deploy](./.img/deploy_8_selecionando_o_projeto.png)

### Definindo uma pasta para colocar os arquivos do projeto.

**Pois bem aqui você dará o nome para a pasta ao qual será usado para o firebase fazer o versionamento e enviar ao servidor, na pasta que você definir aqui, você deve colocar todos os arquivos destinados a serem enviados ao servidor. Por padrão o nome da pasta é `public`, exceto que você defina um nome aqui, se apenas der enter, segue o padrão mesmo.**

![deploy](.img/deploy_9_public.png)


### Informando se a aplicação é Single Page APlication

**Aqui você informa se a aplicação é single page aplication, tome cuidado aqui caso você use rotas. No caso de aplicação `SPA` marque sim, caso não seja é não.**

![deploy](./.img/deploy_A_allinone.png)

### Versionamento com o git

**Se você confirmar o firebase irá versionar usando o git. Altamente recomendado o SIM.**

![deploy](.img/deploy_B_git.png)

### Concluindo

**Uma vez concluindo tudo conforme explicado acima, você deve ver a sua pasta publica com os arquivos do git e de configuração do firebase.**

![deploy](.img/deploy_C_terminado_terminal.png)


## Atualizando as referências

**Você precisará atualizar as referências da sua aplicação, ou seja aonde está `localhost` você deve informar o domínio, com https na frente, ficando `https:dominio`, ao qual o mesmo será instalado, você saberá qual é o seu domínio indo na parte do javascript que faz conexão com o firebase e copiar o campo de `authDomain` colocando https na frente, como nesse exemplo abaixo:**

    var firebaseConfig = {
        apiKey: "AIzaSyCR763EX7p4Wc12J0xjF51MdyDpVmvF7bg",
        authDomain: "todolist-e74af.firebaseapp.com",
        projectId: "todolist-e74af",
        storageBucket: "todolist-e74af.appspot.com",
        messagingSenderId: "68553181186",
        appId: "1:68553181186:web:e24b5f397cf1a79774ff1b"
    };
    firebase.initializeApp(firebaseConfig);

**Ficaria `https://todolist-e74af.firebaseapp.com` no caso de `authDomain`, esse código você pegou assim que você iniciou um projeto no console. Basta pocura pelo objeto `firebaseConfig`, segue a ilustração abaixo:**


![deploy](.img/deploy_D_atualizando_referencias.png)

**Caso você esqueça dessa parte importante o seu site pode quebrar**.

## Voltando ao console

**Clique em avançar no console, lá no site e você verá uma página como essa abaixo, caso tenha marcado a opção correspondente a `mostrar também as etapas...`. De maneira geral você nem deveria ter marcado, isso, mas se marcou e não sabe o que fazer, apenas continua no wizard.**

![deploy](.img/deploy_E_Se_voce_marcou_a_opcao.png)

### Deploy

**Agora o google vai te mostrar como fazer um deploy, conforme a imagem abaixo, apenas copie o comando e no diretório da aplicação configurada previamente, abra o terminal e cole esse comando:**

>`firebase deploy` --> subir a aplicação

![deploy](.img/deploy_F_deploy.png)

**Ao concluir o processo você deve ver uma imagem parecida com a debaixo. Ali abaixo é informado a url do projeto e na linha do `Hosting URL` é o endereço aonde está o seu site.**

![deploy](.img/deploy_G_Concluido_terminal.png)