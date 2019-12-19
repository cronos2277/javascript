module.exports = app => {
    const Stat = app.mongoose.model('Stat',{
        /*
            esse metodo, o Model ele requer dois
            parametro, sendo o primeiro o nome do 
            stat informado por string, nesse exemplo
            o 'Stat'. O segundo parametro eh um objeto
            que te a estrutura do banco de dado noSQL
            em questao, para tal se faz necessario 
            definir o nome da coluna e o tipo.
        */
        users: Number,
        categories: Number,
        articles: Number,
        createdAt:Date
    });
    const get = (req,res) =>{
        /*
            Uma vez criado a estrutura, voce ja pode
            usar os metodos do Mongo DB, como o 
            findOne por exemplo, uma vez que o mongo DB
            tem uma sintaxe muito parecido com o Javascript.
            Com relacao ao uso do metodo abaixo, temos o
            primeiro parametro vazio desse metodo que 
            eh a estrutura a ser retornada, a segunda
            seria os filtros tipo where e por fim como
            que sera organizado.
        */       
        Stat.findOne({},{},{sort:{'createdAt':-1}})
        .then(stat => res.json(stat || {
            users: 0,
            categories: 0,
            articles: 0
        }))
        .catch(err => res.send(err));
    }
    return { Stat,get }
}