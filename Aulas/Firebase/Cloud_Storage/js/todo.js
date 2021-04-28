// Trata a submissão do formulário de tarefas
todoForm.onsubmit = function (event) {
  event.preventDefault() // Evita o redirecionamento da página
  if (todoForm.name.value != '') {
    var file = todoForm.file.files[0] // Seleciona o primeiro aquivo da seleção de aquivos
    if (file != null) { // Verifica se o arquivo foi selecionado
      if (file.type.includes('image')) { // Verifica se o arquivo é uma imagem
        // Compõe o nome do arquivo
        var imgName = firebase.database().ref().push().key + '-' + file.name
        // Compõe o caminho do arquivo
        var imgPath = 'todoListFiles/' + firebase.auth().currentUser.uid + '/' + imgName
        // Cria uma referência de arquivo usando o caminho criado na linha acima
        var storageRef = firebase.storage().ref(imgPath)
        // Inicia o processo de upload
        var upload = storageRef.put(file)
        console.log("storageRef");
        console.log(storageRef);
        console.log('storageRef.put');
        console.log(upload);
        trackUpload(upload).then(function () {
          storageRef.getDownloadURL().then(function (downloadURL) {
            var data = {
              imgUrl: downloadURL,
              name: todoForm.name.value,
              nameLowerCase: todoForm.name.value.toLowerCase()
            }
  
            completeTodoCreate(data) // Completa a criação de tarefas 
          })      
        }).catch(function (error) {
          showError('Falha ao adicionar tarefa: ', error)
        })
      } else {
        alert('O arquivo selecionado precisa ser uma imagem. Tente novamente')
      }
    } else {
      var data = {
        name: todoForm.name.value,
        nameLowerCase: todoForm.name.value.toLowerCase()
      }

      completeTodoCreate(data) // Completa a criação de tarefas 
    }
  } else {
    alert('O nome da tarefa não pode ser em branco para criar a tarefa!')
  }
}

// Completa a criação de tarefas (persiste as informações no banco de dados)
function completeTodoCreate(data) {
  dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
    console.log('Tarefa "' + data.name + '" adicionada com sucesso')
  }).catch(function (error) {
    showError('Falha ao adicionar tarefa (use no máximo 30 caracteres): ', error)
  })

  todoForm.name.value = ''
  todoForm.file.value = ''
}

//Rastreia o progresso de upload e Gerencia
function trackUpload(upload){
  return new Promise(
    function(resolve,reject){
      showItem(progressFeedBack);
      upload.on('state_changed', 
        function(snapshot){ //Segundo argumento: Recebe informações, sobre o upload
          console.log(snapshot);
          var status = (snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(2) + "%";
          console.log(status)
          ProgressEvent.value = status;
        },
        function(error){//terceiro argumento: Executando quando ocorre erro.
          console.log(error);          
          hideItem(progressFeedBack);
          reject(error)
        },
        function(){ //Executado caso tudo de certo.
          console.log("Sucesso no upload");
          hideItem(progressFeedBack);
          resolve()
        })
    
        //Pausar e retomar
        var playPauseUpload = true //Estado de controle do upload (pausado ou em andamento)
        playPauseBtn.onclick = function(){ //Botao pausar/continuar de upload quando clicado.
          playPauseUpload = !playPauseUpload; //inverte o estado de controle do upload
          if(playPauseUpload){ //Se deseja retomar o upload.
            upload.resume(); //Retoma o upload
            playPauseBtn.innerText = "Pausar";
            console.log("upload retomado");
          }else{ //Se deseja pausar o upload.
            upload.pause(); //Pausar o upload
            playPauseBtn.innerText = "Continuar";
            console.log('upload pausado');
          }
        }
    
        //Cancelar
        cancelBtn.onclick = function(){ //Botão para cancelar upload clicado
          if(confirm('Deseja realmente cancelar o upload')){
            upload.cancel(); //Cancela o upload
          }
        }
  });
}

// Exibe a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {
  ulTodoList.innerHTML = ''
  var num = dataSnapshot.numChildren()
  todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':' // Exibe na interface o número de tarefas
  dataSnapshot.forEach(function (item) { // Percorre todos os elementos
    var value = item.val()
    var li = document.createElement('li') // Cria um elemento do tipo li
    li.id = item.key // Define o id do li como a chave da tarefa
    var imgLi = document.createElement('img') //cria um elemento img
    imgLi.src = value.imgUrl ? value.imgUrl : 'img/defaultTodo.png'; //Configurar origem da imagem
    imgLi.setAttribute('class','imgTodo') //classe da imagem para estilização.
    li.appendChild(imgLi); //adiciona o img dentro do LI
    var spanLi = document.createElement('span') // Cria um elemento do tipo span
    spanLi.appendChild(document.createTextNode(value.name)) // Adiciona o elemento de texto dentro da nossa span
    li.appendChild(spanLi) // Adiciona o span dentro do li    
    var liRemoveBtn = document.createElement('button') // Cria um botão para a remoção da tarefa
    liRemoveBtn.appendChild(document.createTextNode('Excluir')) // Define o texto do botão como 'Excluir'
    liRemoveBtn.setAttribute('onclick', 'removeTodo(\"' + item.key + '\")') // Configura o onclick do botão de remoção de tarefas
    liRemoveBtn.setAttribute('class', 'danger todoBtn') // Define classes de estilização para o nosso botão de remoção
    li.appendChild(liRemoveBtn) // Adiciona o botão de remoção no li
    var liUpdateBtn = document.createElement('button') // Cria um botão para a atualização da tarefa
    liUpdateBtn.appendChild(document.createTextNode('Editar')) // Define o texto do botão como 'Editar'
    liUpdateBtn.setAttribute('onclick', 'updateTodo(\"' + item.key + '\")') // Configura o onclick do botão de atualização de tarefas
    liUpdateBtn.setAttribute('class', 'alternative todoBtn') // Define classes de estilização para o nosso botão de atualização
    li.appendChild(liUpdateBtn) // Adiciona o botão de atualização no li

    ulTodoList.appendChild(li) // Adiciona o li dentro da lista de tarefas
  })
}

// Remove tarefas 
function removeTodo(key) {
 var todoName = document.querySelector('#' + key + ' > span');
 var todoImg = document.querySelector('#' + key + ' > img');
  var confimation = confirm('Realmente deseja remover a tarefa \"' + todoName.innerHTML + '\"?')
  if (confimation) {
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().then(function () {
      console.log('Tarefa "' + todoName.innerHTML + '" removida com sucesso');
      removeFile(todoImg.src);
    }).catch(function (error) {
      showError('Falha ao remover tarefa: ', error)
    })
  }
}

//Remove arquivos
function removeFile(imgUrl){
  console.log('imagem a ser removida: '+imgUrl);
  var result = imgUrl.indexOf('img/defaultTodo.png'); //Verifica se a url é a imagem padrão, retornando -1 se for.
  if(result == -1){ //Caso não seja e -1 seja retornado...
    firebase
      .storage()
      .refFromURL(imgUrl)
      .delete()
      .then(function(){
        console.log('Arquivo removido com sucesso!');
      }).catch(function(error){
        console.log('falha ao remover arquivo');
        console.log(error);
      });
  }else{
    console.log('Como a imagem era a padrão, a remoção não foi necessária');
  }
}

var updateTodoKey = null;

// Prepara a atualização de tarefas
var updateTodoKey = null
function updateTodo(key) {
  updateTodoKey = key // Atribui o conteúdo de key dentro de uma variável global
  var todoName = document.querySelector('#' + key + ' > span')
  // Altera o título do formulário de tarefas
  todoFormTitle.innerHTML = '<strong>Editar a tarefa:</strong> ' + todoName.innerHTML
  // Altera o texto da entrada de nome (coloca o nome da tarefa a ser atualizada)
  todoForm.name.value = todoName.innerHTML
  hideItem(todoForm.submitTodoForm)
  showItem(cancelUpdateTodo)
}

// Restaura o estado inicial do formulário de tarefas
function resetTodoForm() {
  todoFormTitle.innerHTML = 'Adicionar tarefa:'
  hideItem(cancelUpdateTodo)
  todoForm.submitTodoForm.style.display = 'initial'
  todoForm.name.value = ''
  todoForm.file.value = ''
}

// Confima a atualização de tarefas
function confirmTodoUpdate() {
  hideItem(cancelUpdateTodo)
  if (todoForm.name.value != '') {
    var todoImg = document.querySelector('#' + updateTodoKey + ' > img')
    var file = todoForm.file.files[0] // Seleciona o primeiro aquivo da seleção de aquivos
    if (file != null) { // Verifica se o arquivo foi selecionado
      if (file.type.includes('image')) { // Verifica se o arquivo é uma imagem
        // Compõe o nome do arquivo
        var imgName = firebase.database().ref().push().updateTodoKey + '-' + file.name
        // Compõe o caminho do arquivo
        var imgPath = 'todoListFiles/' + firebase.auth().currentUser.uid + '/' + imgName
        // Cria uma referência de arquivo usando o caminho criado na linha acima
        var storageRef = firebase.storage().ref(imgPath)
        // Inicia o processo de upload
        var upload = storageRef.put(file)

        trackUpload(upload).then(function () {
          storageRef.getDownloadURL().then(function (downloadURL) {
            var data = {
              imgUrl: downloadURL,
              name: todoForm.name.value,
              nameLowerCase: todoForm.name.value.toLowerCase()
            }          
            console.log("Download URL:",downloadURL);
            completeTodoUpdate(data, todoImg.src) // Completa a atualização de tarefas
          })
        }).catch(function (error) {
          showError('Falha ao atualizar tarefa: ', error)
        })
      } else {
        alert('O arquivo selecionado precisa ser uma imagem!')
      }
    } else { // Nenhuma imagem selecionada...
      var data = {
        name: todoForm.name.value,
        nameLowerCase: todoForm.name.value.toLowerCase()
      }

      completeTodoUpdate(data) // Completa a atualização de tarefas
    }
  } else {
    alert('O nome da tarefa não pode ser vazio!')
  }
}

 // Completa a atualização de tarefas (persiste as informações no banco de dados)
function completeTodoUpdate(data, imgUrl) {
  dbRefUsers.child(firebase.auth().currentUser.uid).child(updateTodoKey).update(data).then(function () {
    console.log('Tarefa "' + data.name + '" atualizada com sucesso')
    if (imgUrl) {
      removeFile(imgUrl) // Remove a imagem antiga
    }
  }).catch(function (error) {
    showError('Falha ao atualizar tarefa: ', error)
  })

  resetTodoForm() // Restaura o estado inicial do formulário de tarefas
}