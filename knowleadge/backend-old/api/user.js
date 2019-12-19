/*
    Esse modulo ele permite a criptografia dos dados e sera usado para criptografar a senha.
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = app =>{
    /*
        Aqui eh usado o operador destructor do atributo criado pela funcao
        que consign(), com base no arquivo validator da pasta app. 
     */
    const {existsOrError, notExistsOrError, equalsOrError } = app.api.validator;
    const encryptPassword = password => {
        /*
            Aqui a senha eh salgada, eh aqui que a criptografia acontece 
            o 10 passado como parametro eh a quantidade de segundos que leva
            para alterar a criptografia, por mais que a senha seja exatamente
            a mesma, o hash sera diferente e como foi passado o parametro como
            10, esse hash sera alterado a cada 10 segundos. Esse valor sera usado
            como parametro para a funcao abaixo.
         */
        const salt = bcrypt.genSaltSync(10);
        /*
            o metodo abaixo precisa de 2 parametros, o primeiro eh a senha que o
            usuario informada pelo cliente, sendo o segundo parametro o valor 
            gerado pelo metodo acima.
         */
        return bcrypt.hashSync(password, salt);
    }
    //Metodo assincrono.
    const save = async (req,res) =>{
        /*
            Operador Spread, aqui basicamente transforma em variavel
            todas os metodos desse objeto.
         */
        const user = {...req.body};
        if(req.params.id){
            user.id = req.params.id;            
        }
        
        try{
            existsOrError(user.name,"Nome não informado!");
            existsOrError(user.email,"Email Não informado");
            existsOrError(user.password,"Senha não informada");
            existsOrError(user.confirmPassword,"Confirmação de senha invalida!");
            equalsOrError(user.password,user.confirmPassword,"Senhas não conferem!");
            const userFromDB = await app.db('users').where({email: user.email}).first();
            if(!user.id){
                notExistsOrError(userFromDB, "Usuário ja cadastrado!");
            }  

        }catch(msg){
            //Em caso de erro retorna o estatus 400 e a mensagem de erro.
            return res.status(400).send(msg);
        }
        //Aqui eh chamado aquela funcao de encriptar password da funcao acima.
        user.password = encryptPassword(user.password);
        //o delete apaga a variavel da memoria, nesse caso a Confirmação de senha, que nao vai ao BD.
        delete user.confirmPassword;
                
        if(user.id){
            /*
                <parametro do consign>.<o banco de dado atribuido no index.js>('<Nome da tabela criada no knex>')
                .update(<Objeto sendo no padrao {atributoDaTabela:valor}) //Metodo para atualizacao
                .where({<Objeto sendo no padrao {atributoDaTabela:valor}) //Metodo para consulta, no caso aqui por ID
                .then(_=>res.status(204).send()) //Caso de certo retorna o status 204 sem mensagem.
                .catch(err => res.status(500).send(err)); //caso de erro retorna status 500 com a mensagem de erro.
             */
            app.db('users').update(user)
            .where({id: user.id})
            .whereNull('deletedAt') /* Apenas se esse campo estiver nulo */
            .then(_=>res.status(204).send())
            .catch(err => res.status(500).send(err));
        }else{
            /*
                <parametro do consign>.<o banco de dado atribuido no index.js>('<Nome da tabela criada no knex>')
                .insert(<Objeto sendo no padrao {atributoDaTabela:valor})// Metodo para criacao, diferente do update, esse cria um novo registro.
                .then(_=>res.status(204).send()) //Caso de certo retorna o status 204 sem mensagem.
                .catch(err => res.status(500).send(err)); //caso de erro retorna status 500 com a mensagem de erro.
             
             */
            app.db('users').insert(user).then(_=>res.status(204).send())
            .catch(err => res.status(500).send(err));
        }
    }
    const get = (req,res) =>{
        /*
            O metodo abaixo faz a leitura no banco de dados, exemplo:
            <metodo do consign>.<o banco de dado atribuido no index.js>('<Nome da tabela criada no knex>')
            .select('<campo1>','<campo2>','<campo3>','<campo4>') //metodo de selecao
            .then(users => res.json(users)) //callback de resposta para o cliente.
            .catch(err => res.status(500).send(err)); //callback de resposta caso tenha algum erro.
         */
        app.db('users').select('id','name','email','admin')
        .whereNull('deletedAt') /* Apenas se esse campo estiver nulo */
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err));
    }
    const getById = (req,res) =>{
        app.db('users').select('id','name','email','admin')
        .where({id: req.params.id})
        .whereNull('deletedAt') /* Apenas se esse campo estiver nulo */
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
    }

    const remove = async (req,res) =>{
        try{
            const articles = await app.db('articles')
            .where({userId:req.params.id})
            notExistsOrError(articles, "Usuario Possui artigos.");
            const rowsUpdated = await app.db('users').update(
                {deletedAt:new Date()}
            ).where({id: req.params.id});
            existsOrError(rowsUpdated,'Usuario nao foi encontrado');
            res.status(204).send();
        }catch(msg){
            res.status(400).send(msg);
        }
    }

    return {save,get,getById, remove}
}
/*
    Aqui eh exportado o save com o nome para fora chamado save,
    seria algo do tipo: return {save: save,get: get, getById: getById} E essa variavel app
    tambem contem a estrutura do consign, uma vez que o mesmo eh
    carregado na inicializacao.
*/
