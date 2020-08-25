import { Model } from './command.model';
import { ActionReducerMap, createSelector } from '@ngrx/store';
/*
    Voce pode associar mais de um dado usando o as,
    No caso estamos dizendo, pegue todos os Objetos,
    funcoes, arrays e etc e os assimile a variavel
    fromReducer.
*/
import * as fromReducer from './command.reducer';
/*
    Aqui temos um template que sera usado para manipular
    o estado, no caso esse template sera o molde que o 
    ActionReducerMap usara para manipular os estados.
    Repare que o objeto do tipo ActionReducerMap vai
    exigir um reducer para preencher um objeto desse,
    logo se faz necessario ter um reducer para tal.
    Quando for montar o reducer, lembre-se:
    O primeiro parametro eh o state e deve ser um array
    do tipo do mesmo objeto informado aqui, no caso
    um Model[] e o segundo deve ser o formato da sua
    action, bom esse segundo parametro deve ser do tipo
    da action que voce fez, o ActionReducerMap nao
    vai analizar isso e por fim a funcao deve retornar
    algo, no caso deve retornar o mesmo array do tipo
    do objeto abaixo, no caso um Model[], o primeiro
    argumento do reduce e o retorno do reduce, devem
    obrigatoriamente ser do mesmo tipo informado abaixo,
    alem disso essa funcao deve ser pura e nao modificar
    o array original.
*/
export interface CmdState{
    model:Model[];
}

/*
    Aqui temos o nosso gerenciador de estado o ActionReducerMap,
nesse caso ele exige que seja passado uma interface dentro
do seu diamante e tambem exige que voce implemente o dado
modelo e o carrgue usando alguma funcao reducer, no caso
o nosso gerenciador de estado manipula os dados com base no retorno
do reducer, lembrando sempre que o reducer eh uma funcao pura,
e o ActionReducerMap requer a implementacao do array que voce
definiu na interface modelo e claro um reducer, cujo o primeiro
argumento e o retorno sejam do mesmo tipo do modelo.
Depois disso voce devera coloca-lo no imports do app.module ou
de algum componente.
*/
export const CmdReducers:ActionReducerMap<CmdState> = {
    model:fromReducer.reducer
}

/*
    Voce tambem pode criar seletores customizaveis, no caso esse
    seletor retorna a quantidade de registro que existe.
    Esse seletor ele sera acessado com o metodo .select()
    da instancia storage da classe de componente.
*/
export const count:(param:CmdState)=>number = (state:CmdState) => (state.model)?state.model.length:0;

//Voce pode tambem usar um seletor como parametro de outro seletor, como no exemplo abaixo.

export const last = createSelector(count, //O seletor recebe como parametro o seletor count acima.
    function(count){ //Aqui usamos esse mesmo count como parametro de funcao.
        return `We have ${count} register(s)`;  //Aqui nos temos o resultado da funcao usando os dados do count.
    }
)
