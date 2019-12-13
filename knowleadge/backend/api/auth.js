const {authSecret} = require('../.env');
const jtw = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
module.exports = app =>{
    const signin = async (req,res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe o usuario e senha!');
        }
        const user = await app.db('users')
        .where({email: req.body.email}).first();
        if(!user){
            return res.status(400).send('Usuario nao encontrado');
        }
        const isMatch = bcrypt.compareSync(req.body.password,user.password)
        if(!isMatch){
            return res.status(401).send('Email/Senha invalidos!');
        }
        //Date.now() pega a hora atual, em milisegundos sendo o marco zero 1/1/1970
        //Math.floor() arredonda a data para o primeiro inteiro menor,
        // se for 1,9 por exemplo vira 1, ou seja tranforma em inteiro menor e mais proximo.
        //A divisao por 1000 eh para pegar o valor em segundos
        const now = Math.floor(Date.now()/1000); 
        const payload = { //criando token.
            //Dados do usuario para criacao do token, uma vez que o login esteja tudo certo.
            id: user.id,
            name: user.name,
            email:user.email,
            admin:user.admin,
            /*  [OBRIGATORIO]
                iat (usued at): Aqui voce informa a hora que foi emitido 
                seguindo aquele mesmo padrao para a criacao do now ali
                em cima, passar a data em segundos, ou seja de um Date.now(),
                divide por mil e arrendonda para o inteiro mais proximo, uma
                vez que o iat trabalha com segundos. Esse campo corresponde
                a data e hora que o token foi criado, ou seja assim que o 
                usuario logar, esse registro ficara aqui.    
            */
            iat: now,
            /*  [OBRIGATORIO]
                exp (expiration): Aqui lidaremos com a expiracao, no caso
                o padrao eh voce passar o tempo que o usuario logou + a 
                quantidade de tempo maxima que ele pode ficar logado, uma
                vez expirado o usuario tera que fazer um novo login.
            */
            exp: now + (60 * 60 * 24 * 3) 
        };
        res.json({
            ...payload, 
            token: jtw.encode(payload, authSecret)
        });
        
    }
    const validateToken = async(req,res) =>{
        const userData = req.body || null;
        try{
            if(userData){
                const token = jwt.decode(userData.token,authSecret);
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true);
                }
            }
        }catch(msg){
            //problema com token.

        }
        res.send(false);
    }
    return { signin, validateToken }
}