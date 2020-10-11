const fs = require('fs');
const path = require('path');
const { Observable } = require('rxjs');

function createPipeableOperator(callback){
    return function(source){ 
        return Observable.create(
            subs => {   
                const sub = callback(subs);
                source.subscribe({
                    next:sub.next || (value => subs.next(value)),
                    error:sub.error || (error => subs.error(error)),
                    complete:sub.complete || (() => subs.complete())
                });       
                
            }
        );        
    }
}

function readDir(folderName){
    return new Observable(subscriber =>{
        try{            
            const tmp = fs.readdirSync(`${folderName}`);            
            tmp.map(file => subscriber.next(path.join(__dirname,folderName,file)));       
            subscriber.complete();
        }catch(error){
            subscriber.error(error);
        }
    });    
}

const filterBy = pattern => createPipeableOperator(
    subs => ({
            next(text){
                if(text.endsWith(pattern)){
                    subs.next(text)
                }
            }
        })
);

function readFile(){
    return createPipeableOperator(
        subs => ({
                next(path){
                    try{
                        const content = fs.readFileSync(path,{encoding:"utf-8"});
                        subs.next(content);                         
                    }catch(e){
                        subs.error(e);
                    }
                }
            })
    );
}

function splitAll(symbol){
    return createPipeableOperator(subs =>({
        next(texts){
            texts.split(symbol).forEach(
                text => subs.next(text)
            )            
        }
    }));
}


const countElements = elements => Object.values(elements.reduce(
    (accumulator,element) => {
        const e = element.toLowerCase();
        const q = (accumulator[e])?accumulator[e].q+1:1;  
        accumulator[e] = {e,q};
        return accumulator;
    },
{}));

function removeEmpty(){
    return createPipeableOperator(subs =>({
        next(text){
            if(text.trim()){
                subs.next(text);
            }   
        }
    }));
}


const regexSymbols =  /[\d|\r|\-|\?|\-|\,|\"|_|♪|%|\[|\]|\(|\)|\{|\}|\!|\.]/igm;
const regexTag = tag => new RegExp(`\<\/?${tag}\>`,"igm");
const removeChars = arr => arr.map(element => element.split(regexSymbols).join(''));
const removeTag = name => arr => arr.map(element => element.split(regexTag(name+'.*')).join(''));
const joinArrayInString = arr => arr.join('\n');
const removeByPattern = pattern => arr => arr.filter(e => !e.includes(pattern));
const removeNumberLine = arr => arr.filter(e => isNaN(parseInt(e)));
const byWord = arr => arr.join(' ').split(' ');

const ordering = attr => arr => arr.sort((o1,o2) => o2[attr] - o1[attr]);

module.exports = {readDir,removeChars,removeTag,filterBy,readFile,joinArrayInString,splitAll,removeEmpty,removeByPattern,removeNumberLine,byWord,countElements,ordering};