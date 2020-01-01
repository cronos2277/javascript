/*
    Mais explicacoes no user.js
*/
const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
             /*
                o metodo del() apaga o registro retornado,
            Sintaxe: app.db('articles').where({coluna: valor}).del();
            */
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        //Converte o restultado para inteiro.
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
             /*
            o metodo limit ele limita a quantidade desse resultado,
            e aqui em especifico, isso eh definido em uma constante.
            o offset ele pula valores, por exemplo se o offset for
            igual a 1, eh ignorado o primeiro resultado e o resultado
            comeca apartir do segundo elemento encontrado.
            Inicialmente se multiplica a pagina pelo limite, entao
            se voce esta na pagina 2 e o limite eh 10, o valor do
            offset eh 20, uma vez terminada essa operacao eh 
            subtraido o limite desse produto, nesse caso como
            o limite eh 10, logo o resultado total eh 10, como
            a funcao eh offset, esses 10 primeiros resultados
            serao ignorados, assim sendo, a paginacao eh permitida,
            assim como que tendo um limite, voce nao sobrecarrega
            o cliente e o seu proprio servidor            
        */
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        /*
            o metodo raw, permite uma query mais customizada, 
            essa query esta localizado no arquvo queries.js. 
        */
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
             /*
            whereIn('categoryId',ids) => Equivalente a:
            select categoryId from categories when in (1,2,3); 
            No caso pesquisa todos os ids, que estao dentro desses 
            valores, no caso esse ids eh um array.

            orderBy('a.id','desc') => Equivalente a:
            select categoryId from categories orderBy categoryId desc;
            esse metodo ordena os dados.
        */
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}