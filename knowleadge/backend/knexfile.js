// Update with your config settings.

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
