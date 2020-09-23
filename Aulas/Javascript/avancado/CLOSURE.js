/*
    Clousure eh um conceito ao qual a funcao permite lembrar do
    contexto lexico ao qual ela foi declarada. ou seja ela lembra
    das variaveis que foram declaradas, no caso o valor de a,b,c
    sao pegos na hora da criacao da funcao, ignorando assim os 
    novos valores negativos atribuidos a esse, mas como o valor
    d nao eh declarado dentro da funcao ele eh pego, a caracteristica
    da funcao nesse exemplo lembrar do valor de a,b,c e usar o valor
    mais interno eh a aplicacao do conceito de clousure. 
*/
const d = 4;
function externo(){
    const a = 1;
    interno();
    function interno(){
        const b = 2;
        intimo();
        function intimo(){
            const c = 3;
            console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
        }
    }
}

const a = -1; 
const b = -2;
const c = -3;
externo();