const fs = require('fs');
const path = require('path');
function readDir(folderName){
    return new Promise((resolve,reject)=>{
        try{
            let tmp = fs.readdirSync(`${folderName}`);
            files = tmp.map(file => path.join(__dirname,folderName,file));
            resolve(files);    
        }catch(error){
            reject(error);
        }
    });    
}

function readFile(path){
    return new Promise((resolve,reject) => {
        try{
            const content = fs.readFileSync(path,{encoding:'utf-8'});            
            resolve(content.toString());
        }catch(error){
            reject(error);
        }
    });
}

const filterBy = (allFiles,pattern) => allFiles.filter(eachFile => eachFile.endsWith(pattern));
const readFiles = paths => Promise.all(paths.map(path => readFile(path)));
const joinArrayInString = arr => arr.join('\n');
const splitAll = str => str.split('\n');
const removeEmpty = arr => arr.filter(a => !!a.trim());
const removeByPattern = (arr,pattern) => arr.filter(e => !e.includes(pattern));
const removeNumberLine = arr => arr.filter(e => isNaN(parseInt(e)));

module.exports = {readDir,filterBy,readFile,readFiles,joinArrayInString,splitAll,removeEmpty,removeByPattern,removeNumberLine};