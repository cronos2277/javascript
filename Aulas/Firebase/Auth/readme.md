# Firebase

[Documentação](https://firebase.google.com/docs/)

[Passo a passo para a criação](https://firebase.google.com/docs/build)

[Arquivo Index](./index.html)

## Indices
[1. Habilitando as autenticações](#habilitando-as-autenticações)

[2. Soluções para determinados Erros](#erros)

[3. Autenticação via E-mail](#autenticação-via-e-mail)

[4. Autenticação Via Conta Google](#autenticação-via-conta-google)

[5. Autenticação via GitHub](#autenticação-via-github)

[6. Autenticação via Facebook](#autenticação-via-facebook)

[7. Formas de login com provedores](#formas-de-login-com-provedores)

[8. Gerenciando usuario cadastrado](#gerenciando-usuário)

[9. Autenticação 1 Email -> N provedores associados](#criando-uma-conta-para-cada-provedor-por-mais-que-tenham-o-mesmo-e-mail)
### Conceitos gerais sobre Provedores de autenticação
Com relação aos provedores temos o seguinte padrão: `firebase.auth.[SERVIÇO]AuthProvider`, esse `[SERVIÇO]` pode ser substituído por **Facebook**, **Google** ou qualquer outra coisa que você queira usar como provedor, esse provedor é uma classe, cuja a instancia você passa como argumento para [.signInWithRedirect()](#signInWithRedirect) ou [.signInWithPopup()](#signinwithpopup).

### Outros provedores não abordados aqui que podem ser úteis:
[PhoneAuthCredential](https://firebase.google.com/docs/reference/js/firebase.auth.PhoneAuthCredential)

[TwitterAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.TwitterAuthProvider)

### firebase.app.App
[Documentação](https://firebase.google.com/docs/reference/js/firebase.app.App)

`firebase.app.App` *=>* **Um aplicativo Firebase mantém as informações de inicialização para uma coleção de serviços. Não chame este construtor diretamente, Em vez disso, use [firebase.initializeApp()](https://firebase.google.com/docs/reference/js/firebase#initializeapp), para criar e inicializar uma instância do aplicativo Firebase.**

### firebase.initializeApp()
[Documentação](https://firebase.google.com/docs/reference/js/firebase#initializeapp)

>Cria e inicializa uma instância do aplicativo Firebase.

###### Assinatura
    initializeApp ( options :  Object ,  name ? :  string ) : App

**`options` => Opções para configurar os serviços do aplicativo.**

**`name` => Nome opcional do aplicativo para inicializar. Se nenhum nome for fornecido, o padrão é `"[DEFAULT]"`.**

### firebase.auth()
Obtém `Auth` para o aplicativo atual.
###### Assinatura
    auth ( app ? :  App ) : Auth

`firebase.auth()` => pode ser usado sem argumentois para chamar o serviço `Auth`.

`firebase.auth(app)` => Para acessar o `Auth` associado de um aplicativo específico.

[Auth Documentação](https://firebase.google.com/docs/reference/js/firebase.auth)
## Importando credenciais
[Arquivo](js/firebase.js)

    var firebaseConfig = {
        apiKey: "AIzaSyCR763EX7p4Wc12J0xjF51MdyDpVmvF7bg",
        authDomain: "todolist-e74af.firebaseapp.com",
        projectId: "todolist-e74af",
        storageBucket: "todolist-e74af.appspot.com",
        messagingSenderId: "68553181186",
        appId: "1:68553181186:web:e24b5f397cf1a79774ff1b"
    };

    firebase.initializeApp(firebaseConfig);

[Para mais informações](https://firebase.google.com/docs/web/setup)

## Habilitando as autenticações
![Sign Method](./img/sign-method.png)

Lembrando que para as autenticações funcione, você precisa habilitar, conforme demonstrado na imagem acima. Nesse exemplo da imagem apenas o e-mail está autorizado, mas você pode usar qualquer um dos outros métodos ativando-os, no caso, ativar o facebook se quiser que a aplicação aceite essa forma de cadastro e acesso, o mesmo com o google e por ai vai... 
## Implementando o core da aplicação no Javascript Vanilla.
Inicialmente, você precisará importar na página que vai usar o firebase o seguinte script: `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>`, no caso esse script é o *core* do firebase. Essa url contém algumas informações interessantes, essa parte da url é a origem `https://www.gstatic.com/firebasejs`, aqui temos a versão `/8.3.2/`, nesse caso a versão é a **8.3.2** e a ultima parte da url é exatamente o que está sendo importado, conforme visto aqui `firebasejs`. 

## Implementando o suporte a autenticação no Javascript Vanilla.
Nesse caso você precisará importar `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-auth.js"></script>`, nesse caso o script apenas se difere do outro no final da url, no caso `firebase-auth.js`, esse *import* vai permitir que você consiga usar a *api* de autenticação do *firebase*.

## Erros

    //Centralizar e traduzir erros.
    function showError(prefix,error){
        console.log(error.code);
        hideItem(loading);
        switch(error.code){
            case "auth/invalid-email":alert(prefix +" "+"E-mail inválido!");break;
            case "auth/wrong-password":alert(prefix +" "+"Senha inválida!");break;
            case "auth/weak-password":alert(prefix +" "+"Senha precisa ter pelo menos 6 caracteres!");break;
            case "auth/email-already-in-use":alert(prefix +" "+"Essa conta já foi cadastrada!");break;
            case "auth/popup-closed-by-user":alert(prefix +" "+"O popup de autenticação foi fechado antes de concluir a operação!");break;
            default:alert(prefix +" "+ error.message);
        }
    }
### Resolvendo erro auth/unauthorized-continue-uri

Para isso basta registrar a url na aplicação, isso se faz necessário e é um passo obrigatório, no caso por padrão adiciona apenas o **localhost**, o que pode ocorrer erros, caso esteja em localhost, uma vez que ali o `127.0.0.1` não é identificado como `localhost`, além disso se faz necessário adicionar o domínio **sem o http** em ambientes de produção. Apenas as URLS adicionadas ali tem permissão para acessar esse banco de dados, ou seja essa é uma forma de proteger a aplicação, caso alguém tente reutilizar os arquivos de configuração.

![Adicionando Site](./img/adicionando_site.png)

### Resolvendo auth/requires-recent-login
Esse erro é chamado quando o usuário tenta excluir conta, na mensagem desse erro está algo como `This operation is sensitive and requires recent au…ation. Log in again before retrying this request.`, que seria `Esta operação é sensível e requer a recente autenticação. Faça o login novamente antes de repetir esta solicitação.`, ou seja para excluir uma conta ou fazer qualquer operação sensível o *firebase*, exige que o usuário não esteja logado a muito tempo, para resolver tal problema, recomenda-se que o usuário faça um novo login como confirmação dessa operação.
## Autenticação via e-mail
[Arquivo auth.js](./js/auth.js)

[Instruções de como usar](https://firebase.google.com/docs/auth/web/start?hl=pt-br)

[Documentação](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
###### Código
    authForm.onsubmit = function(evento){
        evento.preventDefault();
        if(authForm.submitAuthForm.innerText == "Acessar"){
            firebase.auth().signInWithEmailAndPassword(
                authForm.email.value, 
                authForm.password.value, 
            ).then(function(user){
                console.log('Acessou com sucesso');
                console.log(user);
            }).catch(function(error){
                console.log('Falha no acesso!');
                console.log(error);
            });
        }else{
            firebase.auth().createUserWithEmailAndPassword(
                authForm.email.value, 
                authForm.password.value, 
            ).then(function(user){
                console.log('Cadastrou com sucesso');
                console.log(user);
            }).catch(function(error){
                console.log('Falha no cadastro!');
                console.log(error);
            });
        }
    }

### Explicando o objeto firebase.
O que importa é esse trecho aqui `firebase.auth().signInWithEmailAndPassword()` e este `firebase.auth().createUserWithEmailAndPassword()`. Primeiramente a origem desse objeto vem através desse import aqui `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>`, esse script cria esse objeto, conforme [visto aqui](#implementando-o-core-da-aplicação-no-javascript-vanilla).

### Explicando o método auth
Esse é o método de autenticação, você irá usar-lo muito quando for fazer autenticação no firebase,  a origem desse método é esse `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-auth.js"></script>`, conforme [visto aqui](#implementando-o-suporte-a-autenticação-no-javascript-vanilla).

### Logando com: firebase.auth().signInWithEmailAndPassword(email,senha)
Esse método usa a *api* do firebase, nesse caso isso é feito com base no e-mail do usuário e esse método basicamente verifica se as credencias registradas batem com as cadastradas no firebase, se sim retorna toda a informação do usuário, se não, retorna um erro. Esse método retorna uma *promise*:

    firebase.auth().signInWithEmailAndPassword(
        authForm.email.value, 
        authForm.password.value, 
    ).then(function(user){
        console.log('Acessou com sucesso');
        console.log(user);
    }).catch(function(error){
        console.log('Falha no acesso!');
        console.log(error);
    });

###### Assinatura    
    signInWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >

>Função assíncrona usando um email e senha. Falha com um erro, se o endereço de e-mail e a senha não corresponderem.

>Nota: A senha do usuário não é a senha usada para acessar a conta de e-mail do usuário. O endereço de e-mail serve como um identificador exclusivo para o usuário, e a senha é usada para acessar a conta do usuário em seu projeto Firebase.

#### Códigos de erro.
`auth/invalid-email` **=> Lançado se o endereço de e-mail não for válido.**

`auth/user-disabled` **=> Lançado se o usuário correspondente ao email fornecido foi desativado.**

`auth/user-not-found` **=> Lançado se não houver usuário correspondente ao email fornecido.**

`auth/wrong-password` **=> Lançado se a senha for inválida para o email fornecido, ou a conta correspondente ao e-mail não tiver um conjunto de senha.**

No caso quando ocorre um *catch* dentro do objeto lançado haverá um código e a respectiva mensagem,no caso o objeto lançado será `{code,message}`, dentro do code pode seguir um dos erros acima.

### Criando novo usuário: firebase.auth().createUserWithEmailAndPassword(email,senha)
Esse método assim como o de *signIn* também usa a api do *firebase*, porém esse é para adicionar uma nova conta, lembre-se que a senha associada a esse e-email não é necessariamente a mesma para acessar esse email, o email aqui é apenas para identificar o usuário, logo a senha não precisa ter relação com a conta.

    firebase.auth().createUserWithEmailAndPassword(
        authForm.email.value, 
        authForm.password.value, 
    ).then(function(user){
        console.log('Cadastrou com sucesso');
        console.log(user);
    }).catch(function(error){
        console.log('Falha no cadastro!');
        console.log(error);
    });

###### Assinatura
    createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >

>Cria uma nova conta de usuário associada ao endereço de e-mail especificado e senha.Na criação bem-sucedida da conta de usuário, este usuário também estará conectado ao seu aplicativo.A criação da conta de usuário pode falhar se a conta já existir ou a senha for inválida.

>Nota: O endereço de e-mail atua como um identificador exclusivo para o usuário e permite uma redefinição de senha baseada em e-mail. Esta função criará uma nova conta de usuário e definirá a senha inicial do usuário.

#### Códigos de erro.
`auth/email-already-in-use` => Lançado se já existir uma conta com o endereço de e-mail fornecido.

`auth/invalid-email` => Lançado se o endereço de e-mail não for válido.

`auth/operation-not-allowed` => Lançado se as contas de e-mail / senha não estiverem ativadas. Ativar contas de e-mail / senha no console do Firebase, sob a guia Auth.

`auth/weak-password` => Lançado se a senha não for forte o suficiente.

No caso quando ocorre um *catch* dentro do objeto lançado haverá um código e a respectiva mensagem,no caso o objeto lançado será `{code,message}`, dentro do code pode seguir um dos erros acima.

### Explicando o método firebase.auth().onAuthStateChanged(callback)

    firebase.auth().onAuthStateChanged(function(user){
        console.log(`
            Chamado assim que se usa o signInWithEmailAndPassword
            ou createUserWithEmailAndPassword.
        `);
        if(user){
            console.log('usuário autenticado');
            console.log(user);
        }else{
            console.log('usuário não autenticado');
            console.log(user);
        }
    });

Esse método `onAuthStateChanged` é chamado sempre que o `createUserWithEmailAndPassword` ou `signInWithEmailAndPassword` é chamado, ou seja se houver uma lógica a ser implementada, o método `onAuthStateChanged` o melhor lugar para colocar. Caso o usuário esteja logado, o primeiro argumento da callback passada, conforme visto aqui `onAuthStateChanged(function(user)`, conterá dados, caso não o mesmo será nulo,se o usuário estiver sendo criado, após a sua criação essa função é chamada. Ou seja exceto que o usuário esteja desconectado esse argumento possuirá valor, o que explica esse desvio condicional funcionar tanto para acesso quanto para cadastro. Esse método é chamado após a exclusão de uma conta de usuário também.

    if(user){
        console.log('usuário autenticado');
        console.log(user);
    }else{
        console.log('usuário não autenticado');
        console.log(user);
    }

###### Assinatura
    onAuthStateChanged ( nextOrObserver :  Observer < any > | ( ( a :  User | null ) => any ) ,  error ? :  ( a :  Error ) => any ,  completed ? :  firebase.Unsubscribe ) : firebase.Unsubscribe

>Adiciona um observador para alterações no estado de login do usuário. Antes de 4.0.0, Isso disparava o observador quando os usuários davam *signed in*, *signed out*, ou quando o token ID do usuário alterava-se em situações, como a expiração do token ou a mudança de senha. Depois da versão 4.0.0, O observador é apenas chamado em sign-in ou sign-out.

>Para manter o antigo comportamento, veja [firebase.auth.Auth.onIdTokenChanged](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onidtokenchanged)

### Fazendo logout: firebase.auth().signOut
[Exemplo](index.html)

    <button type="button" id="logOut" onclick="firebase.auth().signOut().then(e => console.log('logout'));">LogOut</button>

Aqui estamos definindo o logOut para um botão, nesse caso `firebase.auth().signOut().then(e => console.log('logout'));` o objeto oriundo do método *auth* também retorna um método, ao qual pode ser usado para fazer *logOut*, conforme visto aqui `.signOut().then(e => console.log('logout'));`, como uma *promise*, você define uma callback como argumento, do que deve ser feito quando essa instrução for executada, nesse caso `e => console.log('logout')` exibir uma mensagem no console do usuário e fazer o devido *logout*.

###### Assinatura
    signOut ( ) : Promise < void >

### Pegando dados de usuario logado: firebase.auth().currentUser;
O método `auth()` tem um atributo referente ao usuário atual que é `.currentUser`. Assinatura: `currentUser: User | null`, retorna o usuário se o mesmo estiver logado, ou null se o usuário não estiver logado.

### Verificando e-mail com: firebase.auth().currentUser.emailVerified
Esse atributo `emailVerified` informa se o e-mail foi verificado ou não, se o e-mail foi verificado, **true** é retornado, caso o contrário **false**.

### Pegando e-mail do usuário cadastrado: firebase.auth().currentUser.email
Com o atributo `email` você obtem o e-mail ao qual foi usado para cadastro por parte do usuário.

>Observação:  Provedores costumam ter informações em campos como `photoURL` e `displayName`, ou seja `firebase.auth().currentUser.photoURL` e `firebase.auth().currentUser.displayName`.
### Verificando E-mail com: firebase.auth().currentUser.sendEmailVerification()

    function sendEmailVerification(){
        showItem(loading);
        var user = firebase.auth().currentUser;
        console.log(user);
        user.sendEmailVerification().then(function(){
            alert('E-mail de verificação foi enviado para '+user.email+"!");
        }).catch(function(error){
            alert('Houve um erro ao enviar a mensagem de verificação');
            console.log(error);
        }).finally(function(){
            hideItem(loading)
        });
    }

Você pode usar o método `sendEmailVerification`, para enviar um e-mail para o usuário, ao qual terá um link para confirmar o e-mail cadastrado, tudo ocorre de maneira automática, nesse caso o *firebase* identifica qual é o e-mail usado e com base nisso envia um link para o e-mail cadastrado de modo a confirmar o e-mail do cadastro, como não tem nenhum template, logo o e-mail a ser enviado usa o modelo padrão, conforme ilustrado abaixo:

![Exemplo Email Padrao](./img/exemplo_email_padrao.png)

**Uma vez confirmado o cliente deve receber uma mensagem como:**

![Exemplo email confirmado](./img/exemplo_email_confirmado.png)

O método `sendEmailVerification` retorna uma *promise*, ou seja ocorre de maneira assincrona. Além disso, a confirmação de e-mail não ocorre em tempo real, ou seja, assim que o cliente clica no link, se faz necessário dar um **F5** na página. Ou seja esse método não identifica automaticamente a verificação de e-mail, no caso isso é feito a cada solicitação ao servidor, porém existe uma api que permite isso e no caso não é essa aqui.

### Configurando o template
![Teamplate Method](./img/template_method.png)

***Você pode configurar os templates indo em *authentication*, *template* e após isso você tem os templates que podem ser definidos, seja para `verificação de endereço de e-mail`, `redefinição de senha`, assim como para a `Alteração de endereço de e-mail`.***

### Traduzindo a aplicação para português usando: firebase.auth().languageCode
    firebase.auth().languageCode = "pt-BR";

**Você pode traduzir a aplicação para português passando o código de país para o atributo `.languageCode`**

![Traduzindo Email](./img/traduzido_email.png)

**Segue o exemplo de confirmação de e-mail traduzido**

![Traduzido Confirmacao](./img/traduzido_confirmacao.png)

### Adicionando Botão de redirecionamento no template de confirmação acima
Repare que a confirmação acima, apesar de ter uma tradução com uma linha de código, você pode também incrementar-lo, para isso:

    //utils configuração extra para emails
    var actionCodeSettings = {
        url:"http://127.0.0.1:5500"
    }

    var user = firebase.auth().currentUser;    

    //O Objeto vai aqui, como argumento de sendEmailVerification
    user.sendEmailVerification(actionCodeSettings).then(function(){
        alert('E-mail de verificação foi enviado para '+user.email+"!");
    }).catch(function(error){
        alert('Houve um erro ao enviar a mensagem de verificação');
        console.log(error);
    }).finally(function(){
        hideItem(loading)
    });

**Ou seja você basicamente passa um objeto, com um atributo de configuração, podendo ser esse atributo a `url`, com o atributo url o google cria um botão para a sua janela de confirmação, chamado continuar, conforme visto abaixo:**

![Verificacao com Botao](./img/verificacao_com_botao.png)

### Caso de um erro ao adicionar propriedades no método sendEmailVerification...

Se dar um erro com código `auth/unauthorized-continue-uri` verifique esses [passos aqui](#resolvendo-erro-authunauthorized-continue-uri)

### Redefinindo a senha com firebase.auth().sendPasswordResetEmail(email,options?)

    firebase.auth()
        .sendPasswordResetEmail(email,actionCodeSettings)
        .then(function(ev){
            alert('Email de redefinição de senha foi enviado a '+email+'.');
            console.log(ev);
        })
        .catch(function(){
            alert('Houve um erro ao enviar e-mail de redefinição de senha');            
        })
        .finally(function(){
            hideItem(loading);
        });

>Envia um e-mail de redefinição de senha para o endereço de e-mail fornecido.

Você deve usar o método `firebase.auth().sendPasswordResetEmail(email)` você pode usar para fazer a redefinição da senha, no endereço de e-mail que será informado nesse método irá enviar um e-mail para o usuário, solicitando a troca de senha, conforme ilustrado abaixo, lembrando que a tradução é justamente [devido a esses passos aqui](#traduzindo-a-aplicação-para-português-usando-firebaseauthlanguagecode):

###### E-mail
![Redefinindo Senha Email](./img/redefinindo_senha_email.png)
###### Redefinindo senha.
![Redefinindo Senha Confirmacao](./img/redefinindo_senha_confirmacao.png)

###### PopUp de confirmação
![Redefinindo Senha Link](./img/redefinindo_senha_link.png)
Lembrando que esse botão existe lá devido a [esses passos](#adicionando-botão-de-redirecionamento-no-template-de-confirmação-acima)
###### Assinatura
    sendPasswordResetEmail ( email :  string ,  actionCodeSettings ? :  ActionCodeSettings | null ) : Promise < void >

#### Códigos de erro.

**`auth/invalid-email` *=>* Lança se o endereço de e-mail não for válido.**

**`auth/missing-android-pkg-name` *=>* Um nome de pacote Android deve ser fornecido se o aplicativo Android for necessário para ser instalado.**

**`auth/missing-continue-uri` *=>* Uma URL deve ser fornecido na solicitação para continuar.**

**`auth/missing-ios-bundle-id` *=>* Um ID do Bundle IOS deve ser fornecido se um ID da App Store for fornecido.**

**`auth/invalid-continue-uri` *=>* O URL de continuidade fornecido na solicitação é inválido.**

**`auth/unauthorized-continue-uri` *=>* O domínio do URL da Contato não é autorizado no domínio no console do Firebase.**

**`auth/user-not-found` *=>* Lançado se não houver usuário correspondente ao endereço de e-mail**

### O argumento e opcional ActionCodeSettings
Assinatura `actionCodeSettings: ActionCodeSettings | null`.

>As configurações do código de ação.Se especificado, o `state/continue URL` será definido como o `"continueUrl"` Parâmetro no link de redefinição de senha. A página de destino de redefinição de senha padrão usará isso para exibir um link para voltar ao aplicativo se estiver instalado. A URL fornecido deve pertencer a um domínio que é vinculado ao desenvolvedor no console, Caso contrário, um erro será lançado[(Para definir essa exigência, segue os passos aqui)](#resolvendo-erro-authunauthorized-continue-uri). Redirecionamentos de aplicativos móveis só serão aplicáveis se o desenvolvedor configurar e aceitar os Termos de Condição do Firebase Dynamic Links. O nome do pacote do Android e o ID do Bundle do iOS serão respeitados somente se eles estiverem configurados no mesmo projeto de autenticação do Firebase usado.

## Autenticação via Conta Google
**Inicialmente você precisa habilitar a autenticação e além disso você precisa informar um e-mail para suporte, isso é obrigatório, conforme a imagem abaixo:**
![Google Auth](./img/google_auth.png)

[Documentação GoogleAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider)

###### Código Exemplo

    //Função que permite a autenticação pelo Google
    function signInWithGoogle(){
        showItem(loading);
        firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function(ev){
                console.log('Sucesso no Google Auth Provider');
                console.log(ev);
        })
        .catch(
            function(error){
                console.log('Houver um erro ao se conectar com o Google Auth Provider');
                console.log(error);
                hideItem(loading);
            }
        );
    }

Os dois pontos a serem analizados são esse método [.signInWithPopup](#signinwithpopup) e essa classe  `firebase.auth.GoogleAuthProvider()`, que pode ser encontrado aqui 

    showItem(loading);
        firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function(ev){
                console.log('Sucesso no Google Auth Provider');
                console.log(ev);
        })

### Provedor: GoogleAuthProvider
[Documentação](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider), você colocará uma instancia dessa classe dentro de [.signInWithRedirect()](#signInWithRedirect) ou  [.signInWithPopup()](#signinwithpopup) para que funcione e assim a aplicação possa receber e processar uma conta *Google*. Essa classe está em: `firebase.auth.GoogleAuthProvider`.


## Autenticação via GitHub
[Documentação GithubAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.GithubAuthProvider)

**Você vai precisar de dois dados oriundo do github, como `Client ID` e `Client Secrets`, conforme visto abaixo:**

![GitHub Auth](./img/github_auth.png)

### Para isso, Primeiro:
**Uma vez logado no github vai em `settings` e em opções procure por `Developer settings`.**

![az](./img/github_path_1.png)

### Depois, o segundo passo
**Selecione OAth Apps, e clique para criar uma aplicação**

![az](./img/github_path_2.png)

### Informando os dados
![az](img/github_path_3.png)

**Você deve informar o nome da aplicação, sobre dominío você pode ir as configurações da aplicação, conforme demonstrado abaixo:**

    var firebaseConfig = {
        apiKey: "AIzaSyCR763EX7p4Wc12J0xjF51MdyDpVmvF7bg",
        authDomain: "todolist-e74af.firebaseapp.com",
        projectId: "todolist-e74af",
        storageBucket: "todolist-e74af.appspot.com",
        messagingSenderId: "68553181186",
        appId: "1:68553181186:web:e24b5f397cf1a79774ff1b"
    };
    firebase.initializeApp(firebaseConfig);

**E selecionar para url esse trecho `todolist-e74af.firebaseapp.com`, que no caso vem dessa linha `authDomain: "todolist-e74af.firebaseapp.com"`.**

### Authorization callback URL
**Essa é a callback de redirecionamento para a aplicação, após a  a identificação por esse provedor, ou seja para onde que o mesmo deve ir, pois bem esse valor você pega da url informado lá no firebase, conforme circulado abaixo, apenas preencha essa valor com o circulado, copie e cole:**

![az](img/github_auth2.png)

### Concluído
**Com isso você deve ter o *Client ID* e o *Client Secret* caso precise, conforme ilustrado abaixo, seja cauteloso com isso, pois é informação sensível:**

![az](img/github_path_4.png)

### Se tudo ocorre bem...
![az](./img/github_redirect.png)

No caso aqui, foi usado o método [.signInWithRedirect()](#signInWithRedirect), logo há redirecionamento e não *popup*.

### Exemplo Github

    //Função que permite a autenticação pelo GitHub
    function signInWithGitHub(){
        firebase.auth()
        .signInWithRedirect(new firebase.auth.GithubAuthProvider())
        .then(function(ev){
                console.log('Sucesso no GitHub Auth Provider');
                console.log(ev);
        })
        .catch(
            function(error){
                console.log('Houver um erro ao se conectar com o GitHub Auth Provider');
                console.log(error);
                hideItem(loading);
            }
        );
    }

Muito parecido com o do google acima, porém a única diferença vem aqui `.signInWithRedirect(new firebase.auth.GithubAuthProvider())`, ou seja nesse caso você passa como argumento para 
[.signInWithRedirect()](#signInWithRedirect) ou [.signInWithPopup()](#signinwithpopup) uma instância de `GithubAuthProvider`, oriundo de: `.signInWithRedirect(new firebase.auth.GithubAuthProvider())`. [Documentação](https://firebase.google.com/docs/reference/js/firebase.auth.GithubAuthProvider)

Esse provedor não faz verificação de e-mail, logo é interessante criar uma exceção para isso, conforme ilustrado abaixo:

    //Mostrar elementos para usuários autenticados.
    function showUserContent(user){
    if(user?.providerData[0]?.providerId != "password"){
        hideItem(sendEmailVerificationDiv);
        emailVerified.innerText = "Verificado por provedor confiável!";
    }else{
        if(user.emailVerified){
        hideItem(sendEmailVerificationDiv);
        emailVerified.innerText = "E-mail Verificado!";
        }else{
        emailVerified.innerText = "E-mail não veficado";
        showItem(sendEmailVerificationDiv);
        }
    }
    
    userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.png';
    userName.innerText = user.displayName;
    userEmail.innerText = user.email;
    hideItem(auth);
    showItem(userContent);
    }

## Autenticação via Facebook
[Documentação FacebookAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.FacebookAuthProvider)

    //Função que permite a autenticação pelo Facebook
    function signInWithFacebook(){
        firebase.auth()
        .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        .then(function(ev){
                console.log('Sucesso no Facebook Auth Provider');
                console.log(ev);
        })
        .catch(
            function(error){
                console.log('Houver um erro ao se conectar com o Facebook Auth Provider');
                console.log(error);
                hideItem(loading);
            }
        );
    }

Assim como qualquer provedor de autenticação, você pode usar [.signInWithRedirect()](#signInWithRedirect) ou  [.signInWithPopup()](#signinwithpopup), conforme visto aqui `firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())`.
### Passo 1
**Para habilitar o log-in pelo facebook, você inicialmente deve ir ao site do [facebook devolper](https://developers.facebook.com/apps). Ao logar você deve ver uma tela como esta, ou levemente alterada, crie na opção referente a criar aplicativo.**

![FB_Path](img/facebook_path_1.png)

### Passo 2
**Como esse é apenas um simples aplicativo basta selecionar a opção marcada de criar experiências conectadas, mas repare que existe outras possibilidades de integração, o que pode ser interessante para captar leads, ou até mesmo operar na plataforma.**

![FB_Path](./img/facebook_path_2.png)

### Passo 3
**Aqui você deve informar o nome da aplicação, e um e-mail para suporte, repare que também é possível anexar uma conta de negócios a essa aplicação, ao menos até agora, pois é normal eles mudarem tudo.**

![FB_Path](img/facebook_path_3.png)

### Passo 4
**Ao clicar na opção `Login do Facebook` ou o equivalente, essa é a opção que deve ser selecionada, uma vez que o objetivo é usar o facebook para que o cliente possa se cadastrar na aplicação, repare que também os webhooks que pode ser úteis para uma aplicação que tenha uma interação mais pesada com o facebook.**

![FB_Path](img/facebook_path_4.png)

### Passo 5
**Uma vez que você entra na opção `Login do Facebook`, vai no menu lateral a esquerda e procure por configuração.**

![FB_Path](img/facebook_path_5.png)

### Passo 6A
**Aqui você deve informar a `URIs de redirecionamento do OAuth válidos`, aqui deve-se informar o link a ser redirecionado, ou seja após o cadastro, para onde a aplicação do facebook te joga, após o cadastro ou o acesso, isso você pode pegar indo no firebase, conforme ilustrado no [Passo 6B](#passo-6b).**

![FB_Path](img/facebook_path_6.png)

### Passo 6B
![FB_Path](img/facebook_path_6b.png)

### Passo 7
**Esses dados de `ID do Aplicativo` e `Chave Secreta do Aplicativo` aqui [Passo 6B](#passo-6b).**

![FB_Path](img/facebook_path_7.png)

### Exemplo com o facebook
**O facebook exige o uso do https para funcionar, logo a conexão não deve funcionar em localhost, ou seja, isso só pode ser devidamente testado em ambientes de produção.**

![FB_Path](img/facebook_path_8.png)

## Formas de Login com provedores 
### .signInWithPopup

Uso => `firebase.auth().signInWithPopup([PROVEDOR])`, devendo o `[PROVEDOR]` a ser substituído pelo provedor correspondente.

**Esse método abre uma janela pop up para que o usuário faça o cadastro, no caso toda a parte de gerenciamento e autenticação por conta do authenticator do google, também existe um outro método em contraposição é esse, que seria o [.signInWithRedirect()](#signInWithRedirect), porém esse ultimo faz um redirecionamento ao invés de abrir um pop up.**

![Google Auth PopUp](./img/google_auth_popup.png)

###### Assinatura
    signInWithPopup ( provider :  AuthProvider ) : Promise < UserCredential >

>Autentica um cliente Firebase usando um fluxo de autenticação do OAuth baseado em pop-up. Se for bem sucedido, retorna o usuário assinado junto com a credencial do provedor. Se entrar não foi bem-sucedido, retorna um objeto de erro contendo informações adicionais sobre o erro.


### Códigos de erros para signInWithPopup

`auth/account-exists-with-different-credential` *=>* **Lança se já existir uma conta com o endereço de e-mail afirmado pela credencial. Resolver isso chamando `firebase.auth.Auth.fetchSignInMethodsForEmail` em `error.email` e, em seguida, pedir ao usuário fazer login usando um dos provedores retornados. Quando o usuário estiver conectado, a credencial original recuperada do erro. Credencial pode ser vinculada ao usuário com `firebase.User.linkWithCredential` Para impedir que o usuário se inscreva novamente ao provedor original via popup ou redirecione. Se você estiver usando redirecionamentos para entrar, salve a credencial no armazenamento de sessão e recupere no redirecionar e repovoar a credencial usando por exemplo `firebase.auth.GoogleAuthProvider.credential` Dependendo do ID do provedor de credenciais e complete o link.**

`auth/auth-domain-config-required` *=>* **lança se a configuração do AuthDomain não for fornecida ao chamar `firebase.initializeApp()`. Verifique o console do Firebase para obter instruções sobre como determinar e passar esse campo.**

`auth/cancelled-popup-request` *=>* **Lança se as operações de popup sucessivas forem acionadas. Apenas uma solicitação pop-up é permitida de uma só vez.**

`auth/operation-not-allowed` *=>* **Lançado se o tipo de conta correspondente à credencial não estiver ativada. Ative o tipo de conta no console do Firebase, na guia Auth. [Veja Aqui](#autenticação-via-conta-google)**

`auth/operation-not-supported-in-this-environment` *=>* **Lançado se esta operação não for suportada no ambiente, seu aplicativo estiver sendo executado em: "location.protocol" deve ser http ou https.**

`auth/popup-blocked` *=>* **Lançado se o pop-up foi bloqueado pelo navegador, normalmente quando esta operação for acionada fora de um manipulador de clique.**

`auth/popup-closed-by-user` *=>* **Lançado se a janela pop-up estiver fechada pelo usuário sem concluir o login no provedor.**

`auth/unauthorized-domain` *=>* **Lançado se o domínio do aplicativo não estiver autorizado para operações OAuth para o seu projeto Firebase. Edite a lista de domínios autorizados do console do Firebase. [Veja aqui](#resolvendo-erro-authunauthorized-continue-uri)**

### Argumentos do Método
>O provedor para autenticar. O provedor tem que ser um provedor de oauth, se não é lançado o erro [firebase.auth.EmailAuthProvider](firebase.auth.EmailAuthProvider).

### .signInWithRedirect
>Autentica um cliente Firebase usando um fluxo de redirecionamento de página inteira. Para lidar com os resultados e erros para esta operação, consulte [firebase.auth.Auth.getRedirectResult](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#getredirectresult)

Uso => `firebase.auth().signInWithRedirect([PROVEDOR])`, devendo o `[PROVEDOR]` a ser substituído pelo provedor correspondente.
###### Assinatura
    signInWithRedirect ( provider :  AuthProvider ) : Promise < void >

#### Códigos de Erros

`auth/auth-domain-config-required` *=>* **lança se a configuração do AuthDomain não for fornecida ao chamar `firebase.initializeApp()`. Verifique o console do Firebase para obter instruções sobre como determinar e passar esse campo.**

`auth/operation-not-supported-in-this-environment` *=>* **Lançado se esta operação não for suportada no ambiente, seu aplicativo estiver sendo executado em: "location.protocol" deve ser http ou https.**

`auth/unauthorized-domain` *=>* **Lançado se o domínio do aplicativo não estiver autorizado para operações OAuth para o seu projeto Firebase. Edite a lista de domínios autorizados do console do Firebase. [Veja aqui](#resolvendo-erro-authunauthorized-continue-uri)**

#### Argumentos do Método
>O provedor para autenticar. O provedor tem que ser um provedor de oauth, se não é lançado o erro [firebase.auth.EmailAuthProvider](firebase.auth.EmailAuthProvider).


## Gerenciando Usuário

[Documentação firebase.auth().currentUser](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#currentuser)
### firebase.auth().currentUser
###### Assinatura
    currentUser: User | null

>O usuário atualmente conectado (ou nulo).

Esse atributo dentro de `firebase.auth()`, ou seja `firebase.auth().currentUser` é um atributo que contém todos os dados do usuário logado, se não houver usuário o mesmo será nulo, toda e qualquer informação de usuário que você queira editar,excluir ou resgatar, você deve usar esse atributo como base.

### Atualizando o usuário

    //Função que permite atualizar nomes de usuários.
    function updateUserName(){
        showItem(loading);
        var newUserName = prompt('Informe o novo nome de usuário: ',userName.innerText);
        if(newUserName && newUserName != ""){
            userName.innerText = newUserName;
            firebase
                .auth()
                .currentUser
                .updateProfile({displayName:newUserName})
                .then(_ => console.log("Nome Atualizado!"))            
                .catch(error => {
                    console.log('Houve um erro ao atualizar o nome');
                    console.log(error);                
                })
                .finally(_ => {
                    hideItem(loading);
                });
        }else{
            hideItem(loading);
        }
    }

**Dentro do [firebase.auth().currentUser](#firebaseauthcurrentuser), você tem um método que permite a atualização de registros no firebase, do usuário selecionado, que é `updateProfile`, esse método aceita como argumento, um objeto aonde a chave é o campo a ser alterado e o valor, será o novo valor que deverá ser persistido, conforme ilustra abaixo:**

    firebase
        .auth()
        .currentUser
        .updateProfile({displayName:newUserName})
        .then(_ => console.log("Nome Atualizado!"))            
        .catch(error => {
            console.log('Houve um erro ao atualizar o nome');
            console.log(error);                
        })
        .finally(_ => {
            hideItem(loading);
        });

**Como é de se imaginar trata-se de uma promise e aqui `.updateProfile({displayName:newUserName})` estamos alterando o display name para o conteúdo da variável `newUserName`.**

### Removendo Usuário

    //Função para remover conta de usuário
    function deleteUserAccount(){
        var confirmation = confirm("Deseja realmente exluir a conta?");
        if(confirmation){
            showItem(loading);
            firebase
                .auth()
                .currentUser
                .delete()
                .then(function(){
                    alert('Conta excluída com sucesso!');
                })
                .catch(function(error){
                    alert('Erro ao excluir conta!');
                    console.log(error);
                })
                .finally(_ => {
                    hideItem(loading);
                })
        }
    }

Funciona de forma semelhante a atualização, porém esse método que retorna uma *promise* excluí e além disso esse método não aceita o argumentos, já que funciona com base no [firebase.auth().currentUser](#firebaseauthcurrentuser), e isso é feito aqui:

    firebase
        .auth()
        .currentUser
        .delete()
        .then(function(){
            alert('Conta excluída com sucesso!');
        })
        .catch(function(error){
            alert('Erro ao excluir conta!');
            console.log(error);
        })
        .finally(_ => {
            hideItem(loading);
        })

Detalhe esse método pode lançar um erro, caso o usuário do login tenha se passado muito tempo, recomenda-se que o usuário faça um novo login e após esse login, chama o método `delete`, caso seja lançado um erro do tipo [`auth/requires-recent-login`, clique aqui para ver como resolver](#resolvendo-authrequires-recent-login).

## Criando uma conta para cada provedor, por mais que tenham o mesmo e-mail

**Para isso você deve ir em autenticação e opção `Authentication` ir na parte `uma conta por endereço de email` e alterar da opção padrão para a opção alternativa, que é `Permite a criação de varias...`, conforme a imagem abaixo:**

![auth](img/autenticacao.png)

### Na prática o que muda?
**Vamos supor que o cliente queira acessar pelo google e pelo facebook e ambos usam o mesmo e-mail, caso os passos acima não fossem executados, o usuário iria ver um erro, assim que tentasse logar com o segundo provedor desse exemplo, mas com a opção habilitado, é criado uma segunda conta para o usuário, sim uma conta com um provedor e outra com outro, porém existe forma de mesclar isso e o primeiro passo é esse.**