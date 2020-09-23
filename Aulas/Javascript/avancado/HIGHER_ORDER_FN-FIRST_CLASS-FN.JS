/*
    Higher order, esse conceito diz respeito ao fato de uma
    funcao pode retornar uma funcao e tambem de uma funcao
    pode ser usada como parametro para outra funcao.
*/
function externa(parametro,callback){
    return {parametro, callback}
}

/*
    Funcoes de primeira classe eh um conceito ao
    qual as funcoes sao tratadas como qualquer
    tipo de dado, como Integer, Boolean ou String.
    Nesse exemplo abaixo tem uma funcao arrow sendo
    colocada em uma constante
*/
const interna = parametro => parametro;

console.log(externa("parametro",interna));

