# Exemplo Básico

## Código Mínimo
### package.json
[package.json](package.json)

    {
        "name": "Titulo",
        "version": "1.0.0",
        "description": "Exemplos básicos envolvendo Eletron",
        "main": "main.js",
        "scripts": {
            "start": "electron ."
        },
        "author": "cronos2277",
        "license": "GPL-3.0"
    }

O valor informado na propriedade name é exibido como título da Janela.

### Main.js
[main.js](main.js)

    const { app, BrowserWindow } = require('electron');

    function callback(){
        win = new BrowserWindow({width: 800, height: 600});
    }

    app.on('ready', callback);

### Como funciona
Inicialmente você precisa importar dois objetos da biblioteca *'electron'*, como visto aqui `const { app, BrowserWindow } = require('electron');`. O primeiro objeto é o **app**, esse objeto é um *listener* e esse objeto ativa uma callback de acordo com o evento que é emitido pelo usuário quando interage com a janela. O segundo objeto `BrowserWindow`, é o objeto que renderiza a janela, seria algo semelhante ao **JFRAME** se fosse compararmos com o Java.

#### Objeto BrowserWindow
Para criar uma janela, você deve instanciar um `BrowserWindow` e passar no mínimo um objeto que contenha *width* e *height*, como visto aqui `{width: 800, height: 600}`.

#### Objeto app
Nesse objeto está os listeners, no caso existe um método ali dentro que aceita uma *string* e coloca uma callback no evento que foi informado, o primeiro argumento dessa função você informa o evento e no segundo a callback que será disparada, quando o evento for emitido. Esse evento `close`, ele faz com que a janela seja completamente fechada `win.on('closed', ()=>{[instancia de BrowserWindow] = null;});`, no caso você deve usar isso se quiser uma garantia de que a aplicação não vai rodar em segundo plano.

##### No Mac

    app.on('window-all-closed', ()=>{
        if(process.platform !== 'darwin'){
            app.quit();
        }
    })

**“window-all-closed”** é um evento disparado quando todas as janelas da aplicação são fechadas. No caso esse código acima faz com que a janela seja fechada e não rode em segundo plano no MacOs, aqui é feito a verificação se é mac `process.platform !== 'darwin'`, uma vez que o mac tem o núcleo darwin e uma vez que seja, executa-se o `app.quit();`

###### reaproveitamento de janelas

    app.on('activate', ()=>{
        if(app == null){
        callback();
        }
    })

**“activate”** indica-se que outra janela seja criada caso não possua alguma janela aberta. No Mac OS X é comum recriar uma janela, quando o ícone da barra de tarefas é clicada e não há janelas abertas.

## Parte Gráfica da Interface com HTML
### Arquivo index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Electrom aplication</title>
    </head>
    <body>
        Olá Mundo
    </body>
    </html>

### Main.js
    function callback(){
        win = new BrowserWindow({width: 800, height: 600});
        win.on('closed', ()=>{win = null;});
        const paginaHtml = `file://${__dirname}/index.html`;
        win.loadURL(paginaHtml);
    }

### Explicando
Para criar a interface você usa uma página HTML, no caso o método que fará isso será o `.loadURL`, nesse você informa a url que será usada como interface, nesse caso `file://${__dirname}/index.html`, lembre-se que o Eletron usa um cromium básico, logo isso é aberto em um navegador por isso o `file://`, pois quando se abre um arquivo html local os navegadores acessam usando esse endereço, como está em um template string esse valor deve ser interpolado para retornar o diretório atual, `${__dirname}` por fim o arquivo a ser aberto `index.html`, conforme visto aqui `const paginaHtml = "file://${__dirname}/index.html"` e executado aqui `win.loadURL(paginaHtml);`. repare também que o nome da janela informado no *package.json* será substituído por esse `<title>Electrom aplication</title>`, como o electron ele cria a interface com base no navegador chromium, logo o browser consegue renderizar o HTML, como qualquer outro browser e dessa forma a interface é criada usando componentes web.

### Habilitando o console
Como se trata de um navegador, também é possível habilitar o console, usando a seguinte forma `win.webContents.openDevTools();`, ficando assim:

    function callback(){
        win = new BrowserWindow({width: 800, height: 600});
        win.on('closed', ()=>{win = null;});
        const paginaHtml = `file://${__dirname}/index.html`;
        win.loadURL(paginaHtml);
        win.webContents.openDevTools(); //Linha adicionada
    }

    app.on('ready', callback);

Logo com essa linha já inicia com o console aberto contendo todas as abas que teria no chromium.

## Integrando o node JS na aplicação
Por padrão desde a versão 5, o nodejs mão permite uma integração com o node js, mas essa integração pode ser ativada, passando certas propriedades para o objeto `BrowserWindow`, no entanto isso é desaconselhável, uma vez que um javascript remoto poderia ter acesso ao hardware, uma vez que o nodejs tem tal acesso.

    win = new BrowserWindow({width: 800, height: 600,  
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }

Para isso basta colocar o atributo `webPreferences` e dentro desse atributo setar dois atributos internos dele para true `{nodeIntegration: true,nodeIntegrationInWorker: true}`

## Processando arquivo externo e inline

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">    
        <title>Electrom aplication</title>
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" 
            rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" 
            crossorigin="anonymous">
            <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" 
            crossorigin="anonymous">
        </script>
        
        <script>
            console.log('Acessando objeto process do nodejs')
            console.log(process)
        </script>

        <style>
            body{
                background-color: lightgray;
            }
        </style>
    </head>
    <body>
        <h1 class="display-1">Olá Mundo</h1>
        <p class="jumbotron">Abrir servidor da porta 3000 criado.</p>
    </body>
    </html>

Como visto é perfeitamente possível acessar javascript inline e externo assim como css interno e externo, no caso é usado o bootstrap e também ter acesso ao node caso seja feita [essa ativação](#integrando-o-node-js-na-aplicação), no caso os componentes são renderizados com o bootstrap e o nodejs não está ativo por padrão e não é recomendado habilitar-lo.