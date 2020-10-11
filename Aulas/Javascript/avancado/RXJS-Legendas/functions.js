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

function removeEmpty(){
    return createPipeableOperator(subs =>({
        next(text){
            if(text.trim()){
                subs.next(text);
            }   
        }
    }));
}

function removeNumberLine(){
    return createPipeableOperator(subs =>({
        next(text){
            if(isNaN(parseInt(text))){
                subs.next(text);
            }
        }
    }));
}
function removeChars(){
    const regexSymbols =  /[\d|\r|\-|\?|\-|\,|\"|_|♪|%|\[|\]|\(|\)|\{|\}|\!|\.]/igm;
    return createPipeableOperator(subs =>({
            next:text => subs.next(text.split(regexSymbols).join(''))                         
        }
    ));
}

function removeTag(tag = ""){  
    const regexTag = param => new RegExp(`\<\/?${param}\>`,"igm");  
    return createPipeableOperator(subs =>({
            next: element => subs.next(element.split(regexTag(tag)).join(''))                                     
        }
    ));
}

function byWord(){      
    return createPipeableOperator(subs =>({            
            next(texts){                
                texts.split(' ').forEach(
                    text => subs.next(text)
                )    
            }                                       
        }
    ));
}

function countElements(){
    return createPipeableOperator(subs =>({            
        next(elements){                
            const grouped = Object.values(elements.reduce(
                (accumulator,element) => {
                    const e = element.toLowerCase();
                    const q = (accumulator[e])?accumulator[e].q+1:1;  
                    accumulator[e] = {e,q};
                    return accumulator;
                },
            {}));
            subs.next(grouped);
        }                                       
    }
));
}

module.exports = {readDir,removeChars,removeTag,filterBy,readFile,splitAll,removeEmpty,removeNumberLine,byWord,countElements};