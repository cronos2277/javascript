function recursividade(array,operacoes,total = 0){    
    if(operacoes.length === 0 || array.length === 0){
        return total;
    }else{
        total = operacoes[0](array[0],total);        
        return recursividade(array.slice(1),operacoes.slice(1),total);
    }
}

const soma = (valor,total) => total += valor;

const dados = [1,2,3,4];
const operacoes = [soma,soma,soma,soma];

console.log(recursividade(dados,operacoes));