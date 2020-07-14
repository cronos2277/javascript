const fs = require('fs');
const read = caminhoRelativo => fs.readFileSync(`${__dirname}/${caminhoRelativo}`,{encoding:"utf-8"});
const write = (arquivo,conteudo) => fs.writeFileSync(`${__dirname}/${arquivo}`,conteudo,{encoding:"utf-8"});
module.exports.default = {read,write};
