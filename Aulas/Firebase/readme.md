# Firebase

[Documentação](https://firebase.google.com/docs/)

[Passo a passo para a criação](https://firebase.google.com/docs/build)

[Arquivo Index](./index.html)

## Indices
[1. Habilitando as autenticações](#habilitando-as-autenticações)

[2. Soluções para determinados Erros](#erros)

[3. Autenticação via E-mail](#autenticação-via-e-mail)
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
### Resolvendo erro auth/unauthorized-continue-uri

Para isso basta registrar a url na aplicação, isso se faz necessário e é um passo obrigatório, no caso por padrão adiciona apenas o **localhost**, o que pode ocorrer erros, caso esteja em localhost, uma vez que ali o `127.0.0.1` não é identificado como `localhost`, além disso se faz necessário adicionar o domínio **sem o http** em ambientes de produção. Apenas as URLS adicionadas ali tem permissão para acessar esse banco de dados, ou seja essa é uma forma de proteger a aplicação, caso alguém tente reutilizar os arquivos de configuração.

![Adicionando Site](./img/adicionando_site.png)

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

Esse método `onAuthStateChanged` é chamado sempre que o `createUserWithEmailAndPassword` ou `signInWithEmailAndPassword` é chamado, ou seja se houver uma lógica a ser implementada, o método `onAuthStateChanged` o melhor lugar para colocar. Caso o usuário esteja logado, o primeiro argumento da callback passada, conforme visto aqui `onAuthStateChanged(function(user)`, conterá dados, caso não o mesmo será nulo,se o usuário estiver sendo criado, após a sua criação essa função é chamada. Ou seja exceto que o usuário esteja desconectado esse argumento possuirá valor, o que explica esse desvio condicional funcionar tanto para acesso quanto para cadastro.

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