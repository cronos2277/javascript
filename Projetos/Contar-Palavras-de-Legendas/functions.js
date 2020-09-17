const fs = require('fs');
const path = require('path');
function readDir(folderName){
    return new Promise((resolve,reject)=>{
        try{
            let tmp = fs.readdirSync(`${folderName}`);
            files = tmp.map(file => path.join(__dirname,file));
            resolve(files);    
        }catch(error){
            reject(error);
        }
    });    
}

const filterBy = (allFiles,pattern) => allFiles.filter(eachFile => eachFile.endsWith(pattern));


module.exports = {readDir,filterBy};