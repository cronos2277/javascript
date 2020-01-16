const Pessoa = require("./pessoa");
const css = require('./teste.css');
const atendente = new Pessoa;
console.log(atendente.cumprimentar());
/*Os css devem ser importados aqui, se tentar pelo webpack.config.js, vai dar erro.
  Isso tambem vale para qualquer arquivo diferente dos arquivos javascript.
 */
