/*
    Se o usuario for um adminstrador logado, eh retornado
    a funcao middleware, que esse modulo aceita como
    parametro, se nao o mesmo acusa um erro.
*/
module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin) {
            middleware(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}