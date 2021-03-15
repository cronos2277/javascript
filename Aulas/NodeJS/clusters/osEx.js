const os = require('os');
const system = {
    "Arquitetura":os.arch(),    
    "Diretorio do Usuario":os.homedir(),
    "Nome do Host":os.hostname(),
    "Plataforma":os.platform(),
    "Release":os.release(),
    'Type':os.type(),
    'Tempo Ligado':os.uptime()    
}
console.log('\nSystema');
console.log(system);

const memory = {
    "Memoria Livre":os.freemem(),
    "Memoria Total":os.totalmem()    
}

console.log('\nMemoria');
console.log(memory);

console.log('\nUser');
console.log(os.userInfo());

console.log('\nProcessadores');
console.log(os.cpus())