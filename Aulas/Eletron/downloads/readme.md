# Downloads
[Documentação DownloadItem](https://www.electronjs.org/docs/api/download-item)

[BrowserWindow.WebContents Documentação](https://www.electronjs.org/docs/api/web-contents)

[BrowserWindow.WebContents.session documentação](https://www.electronjs.org/docs/api/session)

[index.js](index.js)

[Main.html](main.html)

## Eventos
>`updated` É emitido enquanto o download estiver sendo atualizado. Passa um objeto event e state. “state” é uma String que indica se o download está em progresso ou parado (`“progressing”` e `“interrupted”`).

>`done` É emitido quando o download for parado. Passa um objeto event e state. “state” pode retornar uma das seguintes Strings: `“completed”`, `“cancelled”` e `“interrupted”`.

## Exemplo
###### Código

    const {BrowserWindow,app} = require('electron');
    app.on('ready',function(){
        const window = new BrowserWindow({
            width:800,
            height:600,
            center:true,
            autoHideMenuBar:true
        });
        window.loadURL(`https://github.com/cronos2277`);
        window.webContents.session.on('will-download',callbackDownload);
    });

    function callbackDownload(event,item,webContents){
        item.setSavePath(__dirname+'/'+item.getFilename());

        item.on('updated',updated_cb)
        function updated_cb(event,state){
            (state === 'progressing' && !item.isPaused()) && console.log(`Received bytes: ${item.getReceivedBytes()}`);
        }


        item.on('done',done_cb)
        function done_cb(event,state){
            (state === 'completed') && console.log('Finish!');
        }
    }

### Explicando
Uma instancia de *BrowserWindow* tem como atributo um atributo o *webContents*, que pode ser usado para ter acesso a funcionalidades do chromium embutido do *electron*, como por exemplo o console do navegador `[instancia].webContents.openDevTools();`, sendo o `[instancia]` ao objeto que receberá a instância de *BrowserWindow*, além disso existe o objeto *session*, que traz outros tipos de funcionalidades, no caso com ele você pode ter funcionalidade típica de um navegador como acessar os cookies gerados por exemplo, nesse caso esse atributo emit um evento chamado `'will-download'`, ao qual será disparado no exato momento que o usuário solicitar um download, no caso essa funcionalidade é interessante caso a aplicação tenha conexão com sites externos, ao qual você pode disponibilizar um arquivo *zip* ou *pdf* para download e no exato momento em que isso for solicitado esse evento é disparado, permitindo ao usuário controlar o que poderá ser abaixado e gerenciar o download. 

    const {BrowserWindow,app} = require('electron');
    app.on('ready',function(){
        const window = new BrowserWindow({
            width:800,
            height:600,
            center:true,
            autoHideMenuBar:true
        });
        window.loadURL(`https://github.com/cronos2277`);
        window.webContents.session.on('will-download',callbackDownload);
    });

### Callback para o evento 'will-download'
A parte que nos interessa é essa `window.webContents.session.on('will-download',[callback]);`, aonde `[callback]` deve ser substituída por uma função que vá ser executada quando esse evento ocorrer, essa função receberá três argumentos, conforme visto abaixo:

    function callbackDownload(event,item,webContents)

#### Primeiro Argumento
Com esse parametro você pode manipular o arquivo que o usuário está fazendo download.
###### Conteúdo    
    {
        preventDefault: [Function: preventDefault],
        sender: Session {
            resolveProxy: [Function: resolveProxy],
            getCacheSize: [Function: getCacheSize],
            clearCache: [Function: clearCache],
            clearStorageData: [Function: clearStorageData],
            flushStorageData: [Function: flushStorageData],
            setProxy: [Function: setProxy],
            setDownloadPath: [Function: setDownloadPath],
            enableNetworkEmulation: [Function: enableNetworkEmulation],
            disableNetworkEmulation: [Function: disableNetworkEmulation],
            setCertificateVerifyProc: [Function: setCertificateVerifyProc],
            setPermissionRequestHandler: [Function: setPermissionRequestHandler],
            setPermissionCheckHandler: [Function: setPermissionCheckHandler],
            clearHostResolverCache: [Function: clearHostResolverCache],
            clearAuthCache: [Function: clearAuthCache],
            allowNTLMCredentialsForDomains: [Function: allowNTLMCredentialsForDomains],
            isPersistent: [Function: isPersistent],
            setUserAgent: [Function: setUserAgent],
            getUserAgent: [Function: getUserAgent],
            getBlobData: [Function: getBlobData],
            downloadURL: [Function: downloadURL],
            createInterruptedDownload: [Function: createInterruptedDownload],
            setPreloads: [Function: setPreloads],
            getPreloads: [Function: getPreloads],
            loadExtension: [Function: loadExtension],
            removeExtension: [Function: removeExtension],
            getExtension: [Function: getExtension],
            getAllExtensions: [Function: getAllExtensions],
            getSpellCheckerLanguages: [Function: getSpellCheckerLanguages],
            setSpellCheckerLanguages: [Function: setSpellCheckerLanguages],
            availableSpellCheckerLanguages: [Getter],
            setSpellCheckerDictionaryDownloadURL: [Function: setSpellCheckerDictionaryDownloadURL],
            listWordsInSpellCheckerDictionary: [Function: listWordsInSpellCheckerDictionary],
            addWordToSpellCheckerDictionary: [Function: addWordToSpellCheckerDictionary],
            removeWordFromSpellCheckerDictionary: [Function: removeWordFromSpellCheckerDictionary],
            preconnect: [Function: preconnect],
            cookies: [Getter],
            netLog: [Getter],
            protocol: [Getter],
            serviceWorkers: [Getter],
            webRequest: [Getter],
            _events: [Object: null prototype] {
            'will-download': [Function: callbackDownload]
            },
            _eventsCount: 1
        }
    }

#### terceiro argumento
Nesse argumento você tem acesso ao emissor do evento se precisar.
###### Conteúdo
    EventEmitter {
        isDestroyed: [Function: isDestroyed],
        destroy: [Function: destroy],
        getBackgroundThrottling: [Function: getBackgroundThrottling],
        setBackgroundThrottling: [Function: setBackgroundThrottling],
        getProcessId: [Function: getProcessId],
        getOSProcessId: [Function: getOSProcessId],
        _getOSProcessIdForFrame: [Function: _getOSProcessIdForFrame],
        equal: [Function: equal],
        _loadURL: [Function: _loadURL],
        downloadURL: [Function: downloadURL],
        _getURL: [Function: _getURL],
        getTitle: [Function: getTitle],
        isLoading: [Function: isLoading],
        isLoadingMainFrame: [Function: isLoadingMainFrame],
        isWaitingForResponse: [Function: isWaitingForResponse],
        _stop: [Function: _stop],
        _goBack: [Function: _goBack],
        _goForward: [Function: _goForward],
        _goToOffset: [Function: _goToOffset],
        isCrashed: [Function: isCrashed],
        forcefullyCrashRenderer: [Function: forcefullyCrashRenderer],
        setUserAgent: [Function: setUserAgent],
        getUserAgent: [Function: getUserAgent],
        savePage: [Function: savePage],
        openDevTools: [Function: openDevTools],
        closeDevTools: [Function: closeDevTools],
        isDevToolsOpened: [Function: isDevToolsOpened],
        isDevToolsFocused: [Function: isDevToolsFocused],
        enableDeviceEmulation: [Function: enableDeviceEmulation],
        disableDeviceEmulation: [Function: disableDeviceEmulation],
        toggleDevTools: [Function: toggleDevTools],
        inspectElement: [Function: inspectElement],
        setIgnoreMenuShortcuts: [Function: setIgnoreMenuShortcuts],
        setAudioMuted: [Function: setAudioMuted],
        isAudioMuted: [Function: isAudioMuted],
        isCurrentlyAudible: [Function: isCurrentlyAudible],
        undo: [Function: undo],
        redo: [Function: redo],
        cut: [Function: cut],
        copy: [Function: copy],
        paste: [Function: paste],
        pasteAndMatchStyle: [Function: pasteAndMatchStyle],
        delete: [Function: delete],
        selectAll: [Function: selectAll],
        unselect: [Function: unselect],
        replace: [Function: replace],
        replaceMisspelling: [Function: replaceMisspelling],
        findInPage: [Function: findInPage],
        stopFindInPage: [Function: stopFindInPage],
        focus: [Function: focus],
        isFocused: [Function: isFocused],
        tabTraverse: [Function: tabTraverse],
        _send: [Function: _send],
        _postMessage: [Function: _postMessage],
        _sendToFrame: [Function: _sendToFrame],
        sendInputEvent: [Function: sendInputEvent],
        beginFrameSubscription: [Function: beginFrameSubscription],
        endFrameSubscription: [Function: endFrameSubscription],
        startDrag: [Function: startDrag],
        attachToIframe: [Function: attachToIframe],
        detachFromOuterFrame: [Function: detachFromOuterFrame],
        isOffscreen: [Function: isOffscreen],
        startPainting: [Function: startPainting],
        stopPainting: [Function: stopPainting],
        isPainting: [Function: isPainting],
        setFrameRate: [Function: setFrameRate],
        getFrameRate: [Function: getFrameRate],
        invalidate: [Function: invalidate],
        setZoomLevel: [Function: setZoomLevel],
        getZoomLevel: [Function: getZoomLevel],
        setZoomFactor: [Function: setZoomFactor],
        getZoomFactor: [Function: getZoomFactor],
        getType: [Function: getType],
        _getPreloadPaths: [Function: _getPreloadPaths],
        getWebPreferences: [Function: getWebPreferences],
        getLastWebPreferences: [Function: getLastWebPreferences],
        getOwnerBrowserWindow: [Function: getOwnerBrowserWindow],
        inspectServiceWorker: [Function: inspectServiceWorker],
        inspectSharedWorker: [Function: inspectSharedWorker],
        inspectSharedWorkerById: [Function: inspectSharedWorkerById],
        getAllSharedWorkers: [Function: getAllSharedWorkers],
        _print: [Function: _print],
        _getPrinters: [Function: _getPrinters],
        _printToPDF: [Function: _printToPDF],
        addWorkSpace: [Function: addWorkSpace],
        removeWorkSpace: [Function: removeWorkSpace],
        showDefinitionForSelection: [Function: showDefinitionForSelection],
        copyImageAt: [Function: copyImageAt],
        capturePage: [Function: capturePage],
        setEmbedder: [Function: setEmbedder],
        setDevToolsWebContents: [Function: setDevToolsWebContents],
        getNativeView: [Function: getNativeView],
        incrementCapturerCount: [Function: incrementCapturerCount],
        decrementCapturerCount: [Function: decrementCapturerCount],
        isBeingCaptured: [Function: isBeingCaptured],
        setWebRTCIPHandlingPolicy: [Function: setWebRTCIPHandlingPolicy],
        getWebRTCIPHandlingPolicy: [Function: getWebRTCIPHandlingPolicy],
        _grantOriginAccess: [Function: _grantOriginAccess],
        takeHeapSnapshot: [Function: takeHeapSnapshot],
        id: 1,
        session: [Getter],
        hostWebContents: [Getter],
        devToolsWebContents: [Getter],
        debugger: [Getter],
        _initiallyShown: [Getter],
        _events: [Object: null prototype] {
            'navigation-entry-committed': [Function],
            '-ipc-message': [Function],
            '-ipc-invoke': [Function],
            '-ipc-message-sync': [Function],
            '-ipc-ports': [Function],
            'pepper-context-menu': [Function],
            crashed: [Function],
            'render-process-gone': [Function],
            'devtools-reload-page': [Function],
            '-new-window': [Function],
            '-add-new-contents': [Function],
            login: [Function],
            'ready-to-show': [Function]
        },
        _eventsCount: 13,
        loadURL: [Function: bound loadURL],
        getURL: [Function: bound getURL],
        stop: [Function: bound stop],
        reload: [Function: bound reload],
        reloadIgnoringCache: [Function: bound reloadIgnoringCache],
        canGoBack: [Function: bound canGoBack],
        canGoForward: [Function: bound canGoForward],
        canGoToIndex: [Function: bound canGoToIndex],
        canGoToOffset: [Function: bound canGoToOffset],
        clearHistory: [Function: bound clearHistory],
        goBack: [Function: bound goBack],
        goForward: [Function: bound goForward],
        goToIndex: [Function: bound goToIndex],
        goToOffset: [Function: bound goToOffset],
        getActiveIndex: [Function: bound getActiveIndex],
        length: [Function: bound length],
        _maxListeners: 0,
        browserWindowOptions: { width: 800, height: 600, center: true, autoHideMenuBar: true }
        }

#### Por fim o segundo argumento
[Documentação](https://www.electronjs.org/docs/api/download-item). Através desse argumento você pode manipular o download
###### Conteúdo
    DownloadItem {
        pause: [Function: pause],
        isPaused: [Function: isPaused],
        resume: [Function: resume],
        canResume: [Function: canResume],
        cancel: [Function: cancel],
        getReceivedBytes: [Function: getReceivedBytes],
        getTotalBytes: [Function: getTotalBytes],
        getMimeType: [Function: getMimeType],
        hasUserGesture: [Function: hasUserGesture],
        getFilename: [Function: getFilename],
        getContentDisposition: [Function: getContentDisposition],
        getURL: [Function: getURL],
        getURLChain: [Function: getURLChain],
        getState: [Function: getState],
        isDone: [Function: isDone],
        setSavePath: [Function: setSavePath],
        getSavePath: [Function: getSavePath],
        savePath: [Getter/Setter],
        setSaveDialogOptions: [Function: setSaveDialogOptions],
        getSaveDialogOptions: [Function: getSaveDialogOptions],
        getLastModifiedTime: [Function: getLastModifiedTime],
        getETag: [Function: getETag],
        getStartTime: [Function: getStartTime]
    }

##### Principais Métodos
`setSavePath(path)` => **Faz o download do arquivo no caminho indicado.**

`getSavePath()` => **Retorna o caminho em que o arquivo será salvo.**

`pause()` => **Pausa o download.**

`isPaused()` => **Indica se o download está pausado.**

`resume()` => **Retornar o download pausado.**

`canResume()` => **Indica se o download pode continuar depois de ser pausado.**

`cancel()` => **Cancela o download.**

`getURL()` => **Retorna a URL de origem do arquivo que está sendo baixado.**

`getFilename()` => **Retorna o nome do arquivo a ser baixado.**

`getState()` => **Retorna o estado atual do download. Os valores podem ser `“progressing”`, `“completed”`, `“cancelled”` ou `“interrupted”`.**

#### Eventos interno da callback
Acima analisamos o conteúdo do argumento que a callback recebe, nesse caso a callback **callbackDownload**, ao qual no segundo argumento existem dois métodos que pode ser melhor usados.
###### Código

    function callbackDownload(event,item,webContents){
        console.log('primeiro argumento');
        console.log(event);
        console.log('segundo argumento')
        console.log(item)
        console.log('terceiro argumento');
        console.log(webContents);
        item.setSavePath(__dirname+'/'+item.getFilename());

        item.on('updated',updated_cb)
        function updated_cb(event,state){
            (state === 'progressing' && !item.isPaused()) && console.log(`Received bytes: ${item.getReceivedBytes()}`);
        }    

        item.on('done',done_cb)
        function done_cb(event,state){
            (state === 'completed') && console.log('Finish!');
        }
    }

##### Setando diretório para download
Essa método oriundo do segundo argumento `item.setSavePath(__dirname+'/'+item.getFilename());`, permite com que você manipule o local que deve ser salvo, nesse caso qualquer download feito pelo usuário é salvo nesse diretório, que no caso é o diretório corrente, além disso com base no método `getFilename` permite que conservamos o nome original do arquivo.

##### Monitorando enquanto o download acontece
###### Código no evento 'updated'
    item.on('updated',updated_cb);

    function updated_cb(event,state){
        (state === 'progressing' && !item.isPaused()) && console.log(`Received bytes: ${item.getReceivedBytes()}`);
    }        

###### Explicando
Você pode passar uma callback para o evento de `updated`, caso queira criar uma barra de status de download para o usuário por exemplo, aqui você manipula as coisas na hora que acontece, a callback aceita dois argumentos e o segundo é o status do download, no caso acima se o download estiver acontecendo `(state === 'progressing' && !item.isPaused())`, ou seja se essa expressão for verdadeira, então faça isso ``console.log(`Received bytes: ${item.getReceivedBytes()}`);`` , tendo um *output* como este: 

    Received bytes: 0
    Received bytes: 1487408
    Received bytes: 1487408
    Received bytes: 1487408
    Received bytes: 1487408

###### Código no evento 'done'
    item.on('done',done_cb);

    function done_cb(event,state){
        (state === 'completed') && console.log('Finish!');
    }

###### Agora o 'done
Aqui é quando o download é concluído, quando o mesmo é concluído o evento `done` é disparado, podendo atribuir uma callback, conforme ilustrado acima, no caso se `(state === 'completed')` então faça `console.log('Finish!');`, tendo como *output*:

    Finish!
    
###### Resumindo:
>`updated` É emitido enquanto o download estiver sendo atualizado. Passa um objeto event e state. “state” é uma String que indica se o download está em progresso ou parado (“progressing” e “interrupted”).

>`done` É emitido quando o download for parado. Passa um objeto event e state. “state” pode retornar uma das seguintes Strings: “completed”, “cancelled” e “interrupted”.