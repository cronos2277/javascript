# Cloud Storage
[1. Criando um novo Storage](#criando-no-console)

[2. Acessando o Storage](#acessando-storage)

## Criando no console
**Inicialmente você vai no menu e clica em `Storage`, e você verá algo assim:**

![SETUP](./.img/cs_1_setup.png)

**Feito isso você pode definir aqui as regras de segurança se você desejar ou, você pode fazer isso mais a frente.**

![Regras de Segurança](.img/cs_2_setup_regras_seguranca.png)

**Após isso você deve definir a localização do servidor, cuidado para não escolher um servidor muito distante, pois isso pode aumentar a latência.**

![Servidor Região](.img/cs_3_setup_servidor_regiao.png)

**Aqui ficará os seus arquivos:**

![Files](.img/cs_files.png)

**Aqui você edita as suas regras**

### Colocando o script no arquivo HTML
Para que tudo funcione, você precisa colocar esse script no seu html `<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-storage.js"></script>`, aqui conterá todas as instruções para carregar toda a funcionalidade do Storage.

## Acessando Storage

![Storage](.img/cs_storage.png)

[Documentação](https://firebase.google.com/docs/reference/js/firebase.storage)

[Documentação UploadTask](https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask)

[Documentação UploadMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata)

###### Método Storage Assinatura
    storage ( app ? :  App ) : Storage

>Obtem o serviço de `Storage` padrão do app ou retorna um app. `firebase.storage()` pode ser chamado sem argumentos para acessar o `app` padrão de serviço de armazenamento ou como `firebase.storage(app)` para acessar o serviço de armazenamento associado a um app específico.

###### Exemplo de upload de arquivo
[todo.js](js/todo.js)

    var file = todoForm.file.files[0] // Seleciona o primeiro aquivo da seleção de aquivos

    if (file != null) { // Verifica se o arquivo foi selecionado
      if (file.type.includes('image')) { // Verifica se o arquivo é uma imagem
        // Compõe o nome do arquivo
        var imgName = firebase.database().ref().push().key + '-' + file.name
        // Compõe o caminho do arquivo
        var imgPath = 'todoListFiles /' + firebase.auth().currentUser.uid + '/' + imgName

        // Cria uma referência de arquivo usando o caminho criado na linha acima
        var storageRef = firebase.storage().ref(imgPath)
        
        // Inicia o processo de upload
        storageRef.put(file)
      }
    }

**Aqui `var imgName = firebase.database().ref().push().key` você pega uma chave criado pelo método PUSH, no caso essa expressão cria uma chave que será usado para compor o nome do arquivo, uma vez feito isso, a próxima instrução é a criação do *PATH*, conforme visto aqui: `var imgPath = 'todoListFiles /' + firebase.auth().currentUser.uid + '/' + imgName`, nesse caso será criado um path aonde `imgName` será usado para o nome do arquivo e `imgPath` para criar um caminho, conforme ilustrado abaixo:**

![CS Exemplo](./.img/cs_exemplo.png)

**Uma vez feito isso, você deve usar o método storage para fazer o upload, aqui você cria uma referência `var storageRef = firebase.storage().ref(imgPath)` com base no *PATH* e por fim você deve usar o método `put` para fazer upload, sendo `firebase.storage().ref(imgPath).put(file)`, ou seguindo a lógica do código acima:**

    // Cria uma referência de arquivo usando o caminho criado na linha acima
        var storageRef = firebase.storage().ref(imgPath)
        
    // Inicia o processo de upload
        storageRef.put(file)

### Método Put
    put ( data :  Blob | Uint8Array | ArrayBuffer ,  metadata ? :  UploadMetadata ) : UploadTask

>Carrega dados para a localização desta referência.

#### Parametros
    data: Blob | Uint8Array | ArrayBuffer
    Os dados para upload.

    Opcional metadata: UploadMetadata
    Metadados para o objeto recém-enviado.

#### Retorna UploadTask
    Um objeto que pode ser usado para monitorar e gerenciar o upload.