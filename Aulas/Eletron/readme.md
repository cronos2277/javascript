# Eletron

## Instalação
Para instalar o Eletron de maneira global `npm install -g electron`, requer que o nodejs esteja instalado também.

## Executando
Dentro do `"start"` você tem o comando para iniciar a janela, no caso você usa o `electron [diretório]`, deve-se ter no diretório ao menos dois arquivos, o primero o `package.json` e o segundo o `main.js`, caso esse ultimo não estiver presente o electron irá procurar por `index.js`.

## Documentação Oficial
[DOCUMENTAÇÃO OFICIAL](https://www.electronjs.org/docs)

[SITE OFICIAL](https://www.electronjs.org/)

## Dicas
Segue uma dica de segurança do Electron: [site](https://www.electronjs.org/docs/tutorial/security)


## Exemplos
1. [Basico](basico)
2. [Janelas](janelas)
3. [Gravando a Tela](gravadorTela)
4. [GUI](gui)
5. [Arquivos e Midia](arquivos_media)
6. [Downloads](downloads)

## Empacotamento
Para empacotar, inicialmente precisa ter o eletron no arquivo package.json `npm install electron` e claro o *electron-packager* `npm install electron-builder` para cada sistema operacional:, com o **electron-builder** e o comando **electron-packager** você pode criar o executável.

### Documentações
[Application Distribution](https://www.electronjs.org/docs/tutorial/application-distribution)

[Electron packager](https://electron.github.io/electron-packager/master/)

[Criando instalador no Windows](https://github.com/electron/windows-installer)
###### No arquivo package.json em 'scripts'
**Para funcionar precisa instalar o *electron-packager* `npm i electron-packager`.**

    "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64  --prune=true --icon=assets/icons/mac/icon.icns --out=release-builds"

    "package-win": "electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32  --prune=true --icon=assets/icons/win/icon.ico --out=release-builds "

    "package-linux" : "electron-packager . --overwrite --platform=linux --arch=x64  --prune=true --icon=assets/icons/png/1024x1024.png --out=release-builds"

`--icon` => o ícone a ser usado.

`--plataform` => Plataforma a ser instalado, **win32** windows, *linux*, e **darwin** para Macos.

`arch` => Arquitetura da aplicação, por exemplo: **x64** 64 bits e por ai vai...

`out` => é o nome do diretório onde a aplicação empacotada será publicada.

#### asar
>`--asar` => Se deseja empacotar o código-fonte do aplicativo em um arquivo, usando o formato de arquivo do Electron. Os motivos pelos quais você pode desejar habilitar esse recurso são descritos em um tutorial de pacote de aplicativos na documentação do Electron. Quando o valor é `true`, ele passa a configuração padrão para o módulo asar.Os valores de configuração podem ser personalizados quando o valor é um objeto.As subopções suportadas incluem, mas não estão limitadas a:

>`ordering (string)`: um caminho para um arquivo de pedido para empacotamento de arquivos.Uma explicação pode ser encontrada no rastreador de problemas Atom.

>`unpack (string):` Uma expressão glob, quando especificada, descompacta o arquivo com nomes correspondentes para o diretório app.asar.unpacked.

>`unpackDir (string)`: Descompacta o dir para o diretório app.asar.unpacked cujos nomes ou padrões correspondem exatamente a esta string.O asar.unpackDir é relativo a dir. O padrão é `false`.

#### prune
>Percorre a árvore de dependência node_modules para remover todos os pacotes especificados na seção devDependencies de `package.json` do aplicativo Electron gerado. O padrão é `true`.

#### overwrite
>Substituir um diretório de saída já existente para uma determinada plataforma (`true`), ou pular a recriação (` false`). O padrão é `false`.

#### Mais opções
[Documentação](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html)
###### Executando os scripts
    $ npm run package-mac
    $ npm run package-win
    $ npm run package-linux

###### Para instalar o builder de maneira global
    npm install electron-builder -g


### Windows Installer
    $ npm install --save-dev electron-winstaller

>arquivo para colocarmos o código de criação do instalador. Vamos dar o nome de “createWinInstaller.js”. Nele executaremos o “electron-winstaller” com algumas configurações:

    var electronInstaller = require('electron-winstaller');
    resultPromise = electronInstaller.createWindowsInstaller({
        appDirectory: './release-builds/My Electron App-win32-ia32',
        outputDirectory: './release-builds/wininstaller64',
        authors: 'My App Inc.',
        exe: 'My Electron App.exe'
    });
    resultPromise.then(() => console.log("Success"), (e) => console.log(`Error: ${e.message}`));

`authors` => Autor do programa.

`exe` => nome para o executável.

`appDirectory` => Diretório aonde está o *app*.

`outputDirectory` => diretório de saída do instalador, ou seja aonde ficará o arquivo final.

>Também teremos que lidar com eventos do Squirrel. Podemos colocar o seguinte código no início do “main.js”:

        if (handleSquirrelEvent()) {
        return;
        }

        function handleSquirrelEvent() {
        if (process.argv.length === 1) {
            return false;
        }

        const ChildProcess = require('child_process');
        const path = require('path');

        const appFolder = path.resolve(process.execPath, '..');
        const rootAtomFolder = path.resolve(appFolder, '..');
        const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
        const exeName = path.basename(process.execPath);

        const spawn = function(command, args) {
            let spawnedProcess, error;

            try {
            spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
            } catch (error) {}

            return spawnedProcess;
        };

        const spawnUpdate = function(args) {
            return spawn(updateDotExe, args);
        };

        const squirrelEvent = process.argv[1];
        switch (squirrelEvent) {
            case '--squirrel-install':
            case '--squirrel-updated':
            // opcionalmente faz coisas como:
            // - adicionar o executavel ao PATH
            // - inserir registros de coisas como arquivos associados

            // instala atalhos no menu e na area de trabalho
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

            case '--squirrel-uninstall':
            // desfaz qualquer coisa feita no --squirrel-install e no
            // --squirrel-updated

            // remove atalhos do menu e da area de trabalho
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

            case '--squirrel-obsolete':
            // executado quando uma versao antiga esta saindo antes de
            // atualizar para a nova versao
            app.quit();
            return true;
        }
    };

### Arquivos com inicialização no sistema
>Para isso, podemos usar o “auto-launch”. Ele permite a inicialização de qualquer aplicação ou executável no Logon. Para instalar no projeto, execute o comando:
    $ npm install auto-launch

#### Adiciona o seguinte código na aplicação

    var AutoLaunch = require('auto-launch');
    var myAutoLauncher = new AutoLaunch({
        name: 'MyElectronApp'
    });

    // habilita a inicialização automática
        myAutoLauncher.enable();
    // desabilita a inicialização automática
        myAutoLauncher.disable();