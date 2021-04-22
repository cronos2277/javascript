// Trata a submissão do formulário de autenticação
todoForm.onsubmit = function (event) {
  event.preventDefault() // Evita o redirecionamento da página

  
  if (todoForm.name.value != '') {
    var file = todoForm.file.files[0] // Seleciona o primeiro aquivo da seleção de aquivos
    if (file != null) { // Verifica se o arquivo foi selecionado
      if (file.type.includes('image')) { // Verifica se o arquivo é uma imagem
        // Compõe o nome do arquivo
        var imgName = firebase.database().ref().push().key + '-' + file.name
        console.log('Nome da imagem: ',imgName)

        // Compõe o caminho do arquivo
        var imgPath = 'todoListFiles /' + firebase.auth().currentUser.uid + '/' + imgName
        console.log('Path da imagem: ',imgPath)

        // Cria uma referência de arquivo usando o caminho criado na linha acima
        var storageRef = firebase.storage().ref(imgPath)
        console.log('Objeto storage().ref()')
        console.log(storageRef)

        // Inicia o processo de upload
        storageRef.put(file)
      }
    }

    var data = {
      name: todoForm.name.value,
      nameLowerCase: todoForm.name.value.toLowerCase()
    }

    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
      console.log('Tarefa "' + data.name + '" adicionada com sucesso')
    }).catch(function (error) {
      showError('Falha ao adicionar tarefa (use no máximo 30 caracteres): ', error)
    })

    todoForm.name.value = ''
  } else {
    alert('O nome da tarefa não pode ser em branco para criar a tarefa!')
  }
}

// Exibe a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {
  ulTodoList.innerHTML = ''
  var num = dataSnapshot.numChildren()
  todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':' // Exibe na interface o número de tarefas
  dataSnapshot.forEach(function (item) { // Percorre todos os elementos
    var value = item.val()
    var li = document.createElement('li') // Cria um elemento do tipo li
    var spanLi = document.createElement('span') // Cria um elemento do tipo span
    spanLi.appendChild(document.createTextNode(value.name)) // Adiciona o elemento de texto dentro da nossa span
    spanLi.id = item.key // Define o id do spanLi como a chave da tarefa
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
  var selectedItem = document.getElementById(key)
  var confimation = confirm('Realmente deseja remover a tarefa \"' + selectedItem.innerHTML + '\"?')
  if (confimation) {
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().then(function () {
      console.log('Tarefa "' + selectedItem.innerHTML + '" removida com sucesso')
    }).catch(function (error) {
      showError('Falha ao remover tarefa: ', error)
    })
  }
}

// Atualiza tarefas
function updateTodo(key) {
  var selectedItem = document.getElementById(key)
  var newTodoName = prompt('Escolha um novo nome para a tarefa \"' + selectedItem.innerHTML + '\".', selectedItem.innerHTML)
  if (newTodoName != '') {
    var data = {
      name: newTodoName,
      nameLowerCase: newTodoName.toLowerCase()
    }

    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).then(function () {
      console.log('Tarefa "' + data.name + '" atualizada com sucesso')
    }).catch(function (error) {
      showError('Falha ao atualizar tarefa: ', error)
    })
  } else {
    alert('O nome da tarefa não pode ser em branco para atualizar a tarefa')
  }
}