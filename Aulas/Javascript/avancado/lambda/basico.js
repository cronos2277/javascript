//funcao identidade, retorna o proprio elemento.
const id = id => id;
console.log(id('ID'));

//o self tranforma se auto invoca.
const self = self => self(self);
console.log(self(id)('ID no self'));

//retorna o primeiro elemento
const primeiro = st => _ => st;
console.log(primeiro(1)(2));

//retorna o ultimo elemento
const ultimo = _ => nd => nd
console.log(ultimo(1)(2));

//inverte o primeiro com o segundo parametro.
const troca = a => b => `invertendo... primeiro: ${ultimo(a)(b)}, ultimo: ${primeiro(a)(b)}`;
console.log(troca(3)(4));