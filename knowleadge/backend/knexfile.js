/*
    Aqui eh colocado as informacoes com relacao a banco de dados, como eh apenas
    um banco de dado logo todo o conteudo do objeto production foi colocado dentro
    do module.exports, voce pode criar um novo template desse indo no terminal
    e digitando knex init no diretorio da aplicao, uma vez que o knex esteja instalado
    de maneira global.
    Exemplo:
    module.exports = {    
        client: 'postgres',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : '123456',
            database : 'knowleadge',
            port:'5432',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }   

};
*/

module.exports = {    
        client: 'postgres',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : '123456',
            database : 'knowleadge',
            port:'5432',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }   

};
const db = require('./.env');