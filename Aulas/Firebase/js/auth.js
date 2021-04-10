
firebase.auth().languageCode = "pt-BR";

// Função que trata a submissão do formulário de autenticação.
authForm.onsubmit = function(evento){
    showItem(loading);
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
            hideItem(loading);
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
            hideItem(loading);
        });
    }
    
}

//Centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function(user){
    hideItem(loading);
    console.log(`
        Chamado assim que se usa o signInWithEmailAndPassword
        ou createUserWithEmailAndPassword.
    `);
    if(user){
        console.log('usuário autenticado');
        console.log(user);
        showUserContent(user);
    }else{
        console.log('usuário não autenticado');
        console.log(user);
        showAuth();
    }
});

//permite o logout
function signOut(){
    firebase.auth().signOut().catch(function(error){
        console.log('falha ao sair da conta');
        console.log(error);
    });
}

//Funcao que permite ao usuário fazer a verificação de e-mail
function sendEmailVerification(){
    showItem(loading);
    var user = firebase.auth().currentUser;
    console.log(user);
    user.sendEmailVerification(actionCodeSettings).then(function(){
        alert('E-mail de verificação foi enviado para '+user.email+"!");
    }).catch(function(error){
        alert('Houve um erro ao enviar a mensagem de verificação');
        console.log(error);
    }).finally(function(){
        hideItem(loading)
    });
}

//Função que permite o usuário alterar senha
function sendPasswordResetEmail(){
    var email = prompt( 
        `Redefinir Senha! 
        Informe o seu endereço de e-mail.`,
        authForm.email.value
    );

    if(email){
        showItem(loading);
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
    }else{
        alert('É preciso informar um e-mail válido!');
    }
}

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