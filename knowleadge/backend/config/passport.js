/*
    O token aqui funciona com base no jwt,
    para mais informacoes a respeito:
    https://www.devmedia.com.br/como-o-jwt-funciona/40265

*/
const { authSecret } = require('../.env'); //o arquivo para autenticacao.
const passport = require('passport'); //O Passport faz autenticacao, mas nao apenas de JWT
const passportJwt = require('passport-jwt'); //faz a leitura do JWT.
const {Strategy, ExtractJwt} = passportJwt; //A Estrategia e o Extrato JWT.
module.exports = app => {
    //Parametros necessarios para a criacao da estrategia.
    //secretOrKey => eh a chave que sera usada.
    /*
        ExtractJwt.fromAuthHeaderAsBearerToken()
        ele ira procurar no cabecario da requisicao o token
        e retornar ao atributo o token. Aqui pegamos o token
        que o usuario esta usando.
    */
    const params = { 
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params,(payload,done)=>{
        app.db('users').where({id: payload.id}).first()
        /* .then(user => done(parametroDeErro,retornoAoUsuario)) */
        .then(user => done(null,user ? {...payload} : false))
        /* .catch(err => done(erro,retornoAoUsuario)); */
        .catch(err => done(err,false));
    });
    passport.use(strategy);
    return{
        authenticate: () => passport.authenticate('jwt',{session:false})
    }
}