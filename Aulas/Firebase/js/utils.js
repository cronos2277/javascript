// Defindo referências para elementos da página
var authForm = document.getElementById('authForm');
var authFormTitle = document.getElementById('authFormTitle');
var register = document.getElementById('register');
var access = document.getElementById('access');
var loading = document.getElementById('loading');
var auth = document.getElementById('auth');
var userContent = document.getElementById('userContent');
var userEmail = document.getElementById('userEmail');
var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv');
var emailVerified = document.getElementById('emailVerified');
var passwordReset = document.getElementById('passwordReset');
var userImg = document.getElementById('userImg');
var userName = document.getElementById('userName');


// Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta';
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar';
  hideItem(register);
  hideItem(passwordReset);
  showItem(access);
}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar';
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar';
  hideItem(access);
  showItem(register);
  showItem(passwordReset);
}

// Simpplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block';
}

// Simpplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none';
}

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

//Mostra conteúdos para usuários não autenticados
function showAuth(){
  hideItem(userContent);
  showItem(auth);
}

//utils configuração extra para emails
var actionCodeSettings = {
  url:"http://127.0.0.1:5500"
}

