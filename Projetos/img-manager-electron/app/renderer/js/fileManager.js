const fs = require('fs'),
path = require('path'),
os = require('os'),
homeDirectory = os.homedir();

function listDirectory(type = 'Directory',rootDir = homeDirectory){
    return new Promise((resolve)=>{
        fs.readdir(rootDir, (err, files) =>{
            var results = [];
            for(var index = 0; index < files.length; index++){
				var file = files[index];
				if(file[0] !== '.'){
					var filePath = rootDir + '/' + file;
					fs.stat(filePath, function(err, stat){
						if(stat && stat[`is${type}`]()){
							results.push(this.file)
						}
						if(files.length === (this.index + 1)){
							results.sort();
							resolve(results);
						}
					}.bind({index, file}))
				}
			}
        });
    });
}

var fileManager = {
    files:{},
    folders:{
        current:homeDirectory,
        select(directory = '', isTotalPath = false){
            this.current = isTotalPath 
                ? 
                    path.resolve(directory)
                :
                    path.resolve(this.current,directory);
                    return this.current;
        },
        upDirectory(){
            this.current = path.resolve(this.current,'..');
            return this.current;
        },
        list(rootDir = this.current){
            return listDirectory('Directory', rootDir);
        },
        listBreadCrumbs(rootDir = this.current){
            var folders = rootDir.split(path.sep),
                breadcrumbs = [];
            for(var i=0; folders.length;i++){
                breadcrumbs.push({
                    name: folders[i],
                    path: folders.slice(0,i+1).join(path.sep)
                });
            }
                return breadcrumbs.slice(-4);   
        }
    }
}

module.exports = fileManager;