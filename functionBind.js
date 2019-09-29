let obj = {nome: 'Executado com sucesso!'}
obj.metodo = function(){console.log(this.nome)}
let resultadoBind = obj.metodo.bind(obj);
resultadoBind();
/*o bind referencia o this do metodo ou da funcao, para o objeto passado nesse metodo que todos os dados tipo funcao tem */
