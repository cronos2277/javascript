const {exists,existsSync,rm,rmSync} = require('fs');

exists('arquivo1.txt',function(existe){
    const msg = message => console.log(message)
    if(existe){
        rm('arquivo1.txt',erro => (erro)?msg(erro):msg('Arquivo1.txt excluido!'));
    }else{
        msg(`arquivo1.txt não existe`);
    }
});

if(existsSync('arquivo2.txt')){
    rmSync('arquivo2.txt');    
    console.log('arquivo2.txt removido!');
}else{
    console.log('arquivo2.txt não existe!');
}