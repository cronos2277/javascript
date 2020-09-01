const ler = function(path_param){        
    const fs = require('fs');
    const path = require('path').join(__dirname,path_param);    
    const cb_fs = (erro,conteudo) => (!erro)?conteudo.toString():null;      
    return new Promise(function(resolve){                
        resolve(
            fs.readFileSync(path,cb_fs).toString()
            );  
    });
}

ler('texto.txt').then(console.log);