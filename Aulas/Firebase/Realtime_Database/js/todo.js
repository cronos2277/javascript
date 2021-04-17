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

//exibe a lista de tarefas do usuário
function fillTodoList(dataSnapShot){
  ulTodoList.innerText = '';
  var num = dataSnapShot.numChildren();  
  //Exibe o numero de tarefas  
  todoCount.innerText = `${num} ${(num > 1)?'tarefas':'tarefa'+':'}`;
  dataSnapShot.forEach(function(item,index){ //Percorre todas as tarefas
    var value = item.val();    
    var li = document.createElement('li');
    var spanLi = document.createElement('span');
    spanLi.appendChild(document.createTextNode(value.name));
    li.appendChild(spanLi);
    ulTodoList.appendChild(li);
    spanLi.id = item.key;
    var liRemoveBtn = document.createElement('button');
    liRemoveBtn.appendChild(document.createTextNode('Excluir'));
    liRemoveBtn.setAttribute('onclick',`removeTodo('${item.key}','${value.name}')`);
    liRemoveBtn.setAttribute('class','danger todoBtn');
    li.appendChild(liRemoveBtn);
    console.log('Tarefa:',index);
    console.log(item);
  });
}

//Remove tarefas
function removeTodo(key,name){
  var confirmation = confirm(`Deseja remover  a tarefa "${name}"?`);
  if(confirmation){
    dbRefUsers
      .child(firebase.auth().currentUser.uid)
      .child(key)
      .remove()
      .then(() => console.log(`removendo ${key}...`))      
      .catch(error => console.log(error));
  }
}