# Firebase

[Documentação](https://firebase.google.com/docs/)

[Passo a passo para a criação](https://firebase.google.com/docs/build)

[Arquivo Index](./index.html)

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

## Implementando o core da aplicação no Javascript Vanilla.
Inicialmente, você precisará importar na página que vai usar o firebase o seguinte script: `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>`, no caso esse script é o *core* do firebase. Essa url contém algumas informações interessantes, essa parte da url é a origem `https://www.gstatic.com/firebasejs`, aqui temos a versão `/8.3.2/`, nesse caso a versão é a **8.3.2** e a ultima parte da url é exatamente o que está sendo importado, conforme visto aqui `firebasejs`. 

## Implementando o suporte a autenticação no Javascript Vanilla.
Nesse caso você precisará importar `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-auth.js"></script>`, nesse caso o script apenas se difere do outro no final da url, no caso `firebase-auth.js`, esse *import* vai permitir que você consiga usar a *api* de autenticação do *firebase*.

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

### Explicando o método .signInWithEmailAndPassword(email,senha)
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

###### Estrutura    
    signInWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >

>Função assíncrona usando um email e senha. Falha com um erro, se o endereço de e-mail e a senha não corresponderem.

>Nota: A senha do usuário não é a senha usada para acessar a conta de e-mail do usuário. O endereço de e-mail serve como um identificador exclusivo para o usuário, e a senha é usada para acessar a conta do usuário em seu projeto Firebase.

#### Códigos de erro.
`auth/invalid-email` **=> Lançado se o endereço de e-mail não for válido.**

`auth/user-disabled` **=> Lançado se o usuário correspondente ao email fornecido foi desativado.**

`auth/user-not-found` **=> Lançado se não houver usuário correspondente ao email fornecido.**

`auth/wrong-password` **=> Lançado se a senha for inválida para o email fornecido, ou a conta correspondente ao e-mail não tiver um conjunto de senha.**

No caso quando ocorre um *catch* dentro do objeto lançado haverá um código e a respectiva mensagem,no caso o objeto lançado será `{code,message}`, dentro do code pode seguir um dos erros acima.

### Explicando o método .createUserWithEmailAndPassword(email,senha)
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

###### Estrutura
    createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >

>Cria uma nova conta de usuário associada ao endereço de e-mail especificado e senha.Na criação bem-sucedida da conta de usuário, este usuário também estará conectado ao seu aplicativo.A criação da conta de usuário pode falhar se a conta já existir ou a senha for inválida.

>Nota: O endereço de e-mail atua como um identificador exclusivo para o usuário e permite uma redefinição de senha baseada em e-mail. Esta função criará uma nova conta de usuário e definirá a senha inicial do usuário.

#### Códigos de erro.
`auth/email-already-in-use` => Lançado se já existir uma conta com o endereço de e-mail fornecido.

`auth/invalid-email` => Lançado se o endereço de e-mail não for válido.

`auth/operation-not-allowed` => Lançado se as contas de e-mail / senha não estiverem ativadas. Ativar contas de e-mail / senha no console do Firebase, sob a guia Auth.

`auth/weak-password` => Lançado se a senha não for forte o suficiente.

No caso quando ocorre um *catch* dentro do objeto lançado haverá um código e a respectiva mensagem,no caso o objeto lançado será `{code,message}`, dentro do code pode seguir um dos erros acima.