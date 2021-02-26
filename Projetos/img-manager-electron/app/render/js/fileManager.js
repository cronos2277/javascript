const fs = require('fs'),
path = require('path'),
os = require('os'),
homeDirectory = os.homedir();

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
        list(){

        },
        listBreadCrumbs(){

        }
    }
}

module.exports = fileManager;