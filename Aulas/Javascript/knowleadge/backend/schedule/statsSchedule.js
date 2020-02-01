/*
    Esse modulo implementa a funcionalidade de agendar tarefas.
    O mesmo segue o padrao do crontab.
 */
const schedule = require('node-schedule')

module.exports = app => {
     /*
            Esse metodo abaixo cria a tarefa agendada, aceita 2 paramentros.
            O primeiro eh o tempo no padrao do crontab, o segundo eh uma 
            funcao que sera executada dentro do tempo especificado no 
            primeiro parametro. Com relacao ao primeiro parametro, no
            exemplo abaixo, esta configurado para a funcao ser executado
            a cada 1 minuto, mais informacoes: https://www.npmjs.com/package/node-schedule
            Mas resumindo, o padrao funciona assim, aonde tem asterisco 
            significa zero, no caso, da esquerda para a direita:
            1st asterisco => segundos, se asterico zero
            2nd asterisco => minutos
            3rd asterisco => horas
            4th asterisco => dia do mes
            5th asterisco => mes 
            6th asterisco => dia da semana
     */
    schedule.scheduleJob('*/1 * * * *', async function () {
        //buscando o primeiro registro de id da tabela 'USERS'
        const usersCount = await app.db('users').count('id').first()
        //buscando o primeiro registro de id da tabela 'CATEGORIES'
        const categoriesCount = await app.db('categories').count('id').first()
        //buscando o primeiro registro de id da tabela 'ARTICLES'
        const articlesCount = await app.db('articles').count('id').first()
        //Tirando a funcao do modulo Stat.
        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })
        /*
            Aqui abaixo fazemos as funcoes para verificar se houve alguma 
            mudanca envolvendo um novo registro das tabelas. 
         */
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}