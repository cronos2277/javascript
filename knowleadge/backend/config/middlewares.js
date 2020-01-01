const bodyParser = require('body-parser') //Modulo Body Parser
const cors = require('cors') //Modulo CORS.

module.exports = app => {
    app.use(bodyParser.json()) //Implementando body-parser
    app.use(cors()) //Implementando cors.
}
/*
 *  Sobre o Modulo cors
    De forma básica, a inserção do `Access-Control-Allow-Origin` resolve o problema. 
    Mas nem sempre. Alguns frameworks fazem uso do request PRE-FLIGHT.
    Se o request tem implicações nos dados do usuário, normalmente esses frameworks 
    fazem um request anterior ao request original solicitado pela aplicação para garantir 
    que é seguro fazer esse tipo de solicitação. Sempre que um request não for `GET`, `POST` ou `HEAD`,
    ou se o request for do tipo `POST` mas o content-type for diferente de `application/x-www-form-urlencoded`,
    `application/x-www-form-urlencoded`, `multipart/form-data`, ou `text/plain` ou ainda
    se seu request tiver headers customizados, um request do tipo preflight é feito.
    CORS é uma funcionalidade de SEGURANÇA dos navegadores. Portanto, lembre-se que a configuração da sua API 
    deve ser feita com cuidado de forma a não comprometer a segurança.
 */
