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

const countElements = elements => Object.values(elements.reduce(
    (accumulator,element) => {
        let e = element.toLowerCase();
        q = (accumulator[e])?accumulator[e].q+1:1;  
        accumulator[e] = {e,q};
        return accumulator;
    },
{}));

const regexSymbols =  /[\d|\r|\-|\?|\-|\,|\"|_|♪|%|\[|\]|\(|\)|\{|\}|\!|\.]/igm;
const regexTag = tag => new RegExp(`\<\/?${tag}\>`,"igm");
const removeChars = arr => arr.map(element => element.split(regexSymbols).join(''));
const removeTag = name => arr => arr.map(element => element.split(regexTag(name+'.*')).join(''));
const filterBy = pattern => allFiles => allFiles.filter(eachFile => eachFile.endsWith(pattern));
const readFiles = paths => Promise.all(paths.map(path => readFile(path)));
const joinArrayInString = arr => arr.join('\n');
const splitAll = str => str.split('\n');
const removeEmpty = arr => arr.filter(a => !!a.trim());
const removeByPattern = pattern => arr => arr.filter(e => !e.includes(pattern));
const removeNumberLine = arr => arr.filter(e => isNaN(parseInt(e)));
const byWord = arr => arr.join(' ').split(' ');

module.exports = {readDir,removeChars,removeTag,filterBy,readFile,readFiles,joinArrayInString,splitAll,removeEmpty,removeByPattern,removeNumberLine,byWord,countElements};