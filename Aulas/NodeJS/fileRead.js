const {readFile,readFileSync} = require('fs');

readFile('append1.txt',function(erro,dados){
    console.log('arquivo: append1.txt');
    if(erro){
        console.log(erro);
    }else{
        console.log(dados.toString());
    }
});

try{
    const buffer = readFileSync('append2.txt');
    console.log('arquivo: append2.txt');
    console.log(`Para String: ${buffer.toString()}`);
    console.log(`Para JSON: ${JSON.stringify(buffer.toJSON())}`);    
}catch(error){
    console.log(error);
}