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

firebase.auth().onAuthStateChanged(function(user){
    hideItem(loading);
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