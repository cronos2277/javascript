// Trata a submissão do formulário de autenticação
todoForm.onsubmit = function (event) {
  event.preventDefault() // Evita o redirecionamento da página
  if (todoForm.name.value != '') {
    var data = {
      name: todoForm.name.value
    }

    const uid = firebase.auth().currentUser.uid; 
    dbRefUsers.child(uid).push(data).then(function (e) {
      console.log('Tarefa "' + data.name + '" adicionada com sucesso');
      console.log(e);
    })
    .catch(function(error){
      console.log("Erro no PUSH");
      console.log(error);
    });
  } else {
    alert('O nome da tarefa não pode ser em branco para criar a tarefa!')
  }
}