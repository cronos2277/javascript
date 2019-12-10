// Aqui eh configurado as opcoes do DB. Esse eh o arquivo de configuracao do knex

module.exports = {  
    client: 'postgresql',
    connection: {
      database: 'knowleadge',
      user:     'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
