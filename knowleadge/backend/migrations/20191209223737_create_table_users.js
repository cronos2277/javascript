/*
  Aqui uma migrations, no caso uma migration seria uma especie de 
  versionamento para banco de dados. Temos dois metodos, um sendo
  o up e o outro down, o up contem as novidades, e o down contem
  o metodo de rollback, caso precise voltar para a ultima versao
  estavel do banco de dados. 
  exports.up => modifica a estrutura de maneira a avancar para a nova versao
  exports.down => modifica a estrutura de modo a ficar parecido como era antes.
  Repare no metodo up foi tem comandos para criar a tabela, enquanto o metodo
  down ele apaga a tabela, e aqui o raciocinio eh simples, o que tinha antes
  de criar a tabela do metodo up, nada, logo o estado anterior era nao ter
  tabela alguma, entao o comando no down eh apagar os dados existentes.
  Agora se for lancado uma versao nova e for necessario mudar a estrutura,
  o codigo do up eh movido ao down e o codigo para alteracao de estrutura 
  fica no up, esse seria o raciocionio desses metodos.
  * O para chamar o metodo do up:
  knex.migrate.latest([config]); <= no arquivo js  
  knex migrate:latest <= no terminal
  ----------------------------------------------------
  * O para chamar o metodo do down:
  knex.migrate.rollback([config]); <= no arquivo js
  knex migrate:rollback <= no terminal
  ---------------------------------------------------
  Com relacao ao conteudo do config acima: const config = require('../knexfile.js');
  Esse config acima, tem o modulo do arquivo knexfile dentro dele.
  ----------------------------------------------------
  Tanto o metodo "up" como o "down" devem retornar, do contrario pode dar um erro
  dificil de pegar.
*/
exports.up = function(knex, Promise) {
    /*
        Esse metodo abaixo retorna um comando do knex
        para criar uma tabela no banco de dados, esse
        metodo ele aceita 2 parametros, o primeiro
        o nome da tabela e o segundo uma funcao, dentro da
        funcao uma callback que dentro dessa callback
        tem o passo a passo para a criacao dos atributos
        Exemplo:
        return knex.schema.createTable('users',table =>{});
        Aqui o retorno eh um metodo criador de tabela,
        a callback deve ter o passo a passo para a criacao
        de tabela. repare que o table inclui os metodos
        que vai criar a tabela com todos os atributos.
     */
  return knex.schema.createTable('users',table =>{
    /*
        table.increments('id').primary();
        esse metodo cria um id, o table eh um
        parametro passado via funcao arrow,
        recomendavel afim de evitar problema com this.
     */
    //<parametro>.increments('<nome da coluna').primary();
    //sendo o primary(), o metodo que sinaliza o primary key.
    //Equivalente a: id integer primary key;
    table.increments('id').primary();    
    table.string('name').notNull();
    //<parametro>.<tipo de dado ex: string, boolean, integer>.<atributos>
    //sendo o string que indica que o tipo de dado.
    //notNull() indica que o atributo eh nao nulo.
    //unique() indica que o atributo nao pode repetir.
    //nesse exemplo: seria o equivalente: email varchar not null unique;
    table.string('email').notNull().unique();
    table.string('password').notNull();
    //defaultTo define um valor padrao quando nao eh informado um valor.
    table.boolean('admin').notNull().defaultTo(false);
  });
};

/*
    Preste a atencao em como a funcao eh passado para o exports.down ou exports.up
    a estrutura eh o seguinte:
    exports.<up ou down> = funcao(knex, Promise) {
        sempre deve retornar algum metodo do knex, como exemplo:
        return knex.schema.dropTable('articles');
    }
 */
exports.down = function(knex, Promise) {
    /*
        Esse metodo ela deleta a tabela, no caso
        voce apenas passa o nome da tabela, lembrando
        que o metodo sempre deve retornar alguma coisa.
     */
  return knex.schema.dropTable('users');
};
