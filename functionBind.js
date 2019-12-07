let obj = {nome: 'Executado com sucesso!'}
obj.metodo = function(){console.log(this.nome)}
let resultadoBind = obj.metodo.bind(obj);
resultadoBind();
/*
  O bind ele resolve um problema envolvendo o paradigma funcional com a Orientação a objeto, resumindo toda vez que
você quiser transformar o metodo em funcao, o recomendável é usar uma função como o bind para que o this referencie
o proprio objeto como acontece nas linguagens de progrmação. Exemplo
let resultadoBind = obj.metodo; <-- Nesse caso o contexto do this é o elemento (no navegador) ou o module.global(node JS)
let resultadoBind = obj.metodo.bind(obj); <-- Agora nesse caso toda vez que usado o this dentro da classe, ao invés
de referenciar o elemento ou o module.global, o mesmo irá referenciar o objeto que for passado nesse parametro em
substituindo a referencia do this de contexto, para esse objeto que você criou. Nesse exemplo toda vez que que for
referenciado o this dentro da classe, esse será o objeto referenciado, resumindo nesse caso expecificamente.
dentro da classe: o this da classe = obj.
*/
