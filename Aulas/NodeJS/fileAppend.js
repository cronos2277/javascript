const {appendFile,appendFileSync} = require('fs');
const content1 = parseInt(Math.random() * (10 ** 9))+'\n';
const content2 = parseInt(Math.random() * (10 ** 9))+'\n';

appendFile('append1.txt',content1,function(erro){
    if(erro){
        console.log(erro);
    }else{
        console.log(`${content1} adicionado ao append1.txt`);
    }
});

appendFileSync('append2.txt',content2,{encoding:'utf-8'});
console.log(`Adicionado ${content2} ao arquivo append2.txt`);