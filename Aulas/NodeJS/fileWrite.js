const {writeFile, writeFileSync} = require('fs');

const texto1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
const texto2 = `Etiam libero augue, sodales vitae felis nec, mollis efficitur nisi.`;

writeFile('arquivo1.txt',texto1,function(MensagensErro){
    if(MensagensErro){
        console.log(MensagensErro);
    }else{
        console.log('Arquivo1.txt criado');
    }
});

writeFileSync('arquivo2.txt',texto2,{encoding:'utf-8'});
console.log('arquivo2.txt criado!');