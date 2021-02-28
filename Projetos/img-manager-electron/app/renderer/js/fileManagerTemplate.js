const path = require('path'),
	{ shell, remote, clipboard, nativeImage, ipcRenderer } = require('electron'),
	{ Menu } = remote,
	fileManager = require('./fileManager');

var breadCrumbListElement = document.querySelector('#breadcrumb-list');
var folderListElement = document.querySelector('#folder-list');
var fileListElement = document.querySelector('#file-list');

var fileManagerTemplate = {
    init(){
        this.startStructure();
    },
    startStructure(){
        this.folderList().then(template => folderListElement.innerHTML = template);
        this.breadcrumbList().then(template => breadCrumbListElement.innerHTML = template);
        this.imagesList().then(template => fileListElement.innerHTML = template);
    },
    folderList(rootDir = fileManager.folders.current){
        var template = '';
        return new Promise((resolve) => {
            fileManager.folders.list(rootDir)
            .then(foldersList => {
                foldersList.forEach(
                    folder => {
                        template += `
                        <li class="folder-list-item" onclick="App.fileManagerTemplate.selectFolder('${folder}')" >
                                <h1 class='folder-name'>${folder}</h1>
                            </li>
                        `;
                    }
                )
                resolve(template);
            });
        });
    },
    breadcrumbList(rootDir = fileManager.folders.current){
        var template = '';
        return new Promise((resolve) => {
            var foldersList = fileManager.folders.listBreadcrumbs(rootDir);
            foldersList.forEach(
                folder => {
                    var folderPath = (folder.path + path.sep).replace(/\\/g, '\\\\');
                    template += `
                    <li class="breadcrumb-list-item" onclick="App.fileManagerTemplate.selectFolder('${folderPath}', 'true')" >
                            <h1 class='breadcrumb-name'>${folder.name}</h1>
                        </li>
                    `;
                }
            );
            resolve(template);
        });
    },
    imagesList(rootDir = fileManager.folders.current){
        var template = '';
        return new Promise((resolve) => {
            fileManager.files.listImages(rootDir)
            .then(filesList => {
                var filesFullPath = fileManager.files.getFullPath(filesList);

                for(var i=0;i<filesList.length;i++){
                    var filePath = filesFullPath[i].replace(/\\/g,'\\\\');
                    template += `
                        <li class='file-list-item' oncontextmenu="App.fileManagerTemplate.onItemContextMenu('${filePath}')">
                            <img class='file-picture' style='background-image:url("${filePath = filesFullPath[i].replace(/\\/g,'/')}")' />
                            <h1 class='breadcrumb-name'>${filesList[i]}</h1>
                        </li>
                    `;
                }
                
                resolve(template);
            })
        });
    },
    upDirectory(){
        fileManager.folders.upDirectory();
        this.startStructure();
    },
    selectFolder(path,isTotalPath){
        fileManager.folders.select(path,isTotalPath);
        this.startStructure();
    },
    openFile(path){        
        shell.openPath(path.replace(/\\/g,'/'));
    },
    copyFile(path){
        var img = nativeImage.createFromPath(path);
        clipboard.writeImage(img);
    },
    deleteFile(path){
        shell.moveItemToTrash(path);
        fileManagerTemplate.startStructure();
    },
    onItemContextMenu(path){
		var menuTemplate = [
			{
				label: 'Abrir',
				click: this.openFile.bind(null, path)
			},
			{
				label: 'Copiar',
				click: this.copyFile.bind(null, path)
			},
			{
				label: 'Excluir',
				click: this.deleteFile.bind(null, path)
			}
		];
        console.log(Menu)
		const menu = new Menu.buildFromTemplate(menuTemplate);
		menu.popup();
	}
}

module.exports = fileManagerTemplate;