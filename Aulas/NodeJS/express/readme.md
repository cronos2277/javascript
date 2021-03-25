# Express
Para instalar `npm i express`, segue a [documentação](https://expressjs.com/pt-br/).

1. [Exemplo Básico](#exemplo-básicos-com-express)
2. [Body Parser](#body-parser)
3. [Cadeia de Middlewares](#cadeias-de-middleware)
4. [Router](#router)
5. [CORS](#cors)
6. [Express Singleton](#para-concluir-de-maneira-geral)

## Exemplo básicos com Express
[Express1.js](express1.js)

[Request documentação](https://expressjs.com/pt-br/api.html#req)

[Response documentação](https://expressjs.com/pt-br/api.html#res)

[Body-Parser e outros Middlewares para uso do Express](https://expressjs.com/en/resources/middleware/body-parser.html)
### Requisição na raiz usando o método GET na porta 5001

    const express = require('express');
    const app = express();

    app.get('/',function(request,response){
        response.send('<h1>Exemplo com Express Basico</h1>');
    }).listen(5001);

Aqui você importa o express ao seu projeto `const express = require('express');`, porém nesse caso estamos usando como função esse objeto importado, conforme visto aqui `const app = express();`, é com base nesse objeto que foi pego através da função `express()` que começa toda a lógica. Lembrando que o *express* seria uma espécie de módulo *HTTP* mais avançado, logo devemos definir uma porta para que possa ouvir também: `.listen(5001);`, recomenda-se sempre colocar o *listen* na rota mais genérica de todas.

#### Explicando o método GET
###### Código
    app.get('/',function(request,response){
        response.send('<h1>Exemplo com Express Basico</h1>');
    }).listen(5001);

##### Explicando GET
O método *get* está presente dentro do objeto, assim como todos os verbos *http*, de todo modo os métodos aceitam dois argumentos, o primeiro é o Path ao qual a callback passada como segundo argumento irá atender. Essa callback tem três argumentos, o primeiro para tratar os dados do usuário *request*, segundo os recursos do servidor *response* e por fim o *next*, que foi omitido, sem grandes problemas aqui, devido ao fato de ter apenas uma única rota, o next foi omitido, mas pode haver efeitos colaterais se isso for feito em roteamento mais complexo. [Request mais informações](https://expressjs.com/pt-br/api.html#req), [Response mais informações](https://expressjs.com/pt-br/api.html#res). [Mais inforações sobre o método GET](https://expressjs.com/pt-br/4x/api.html#app.get.method).

### Outros métodos na porta 5002
[express2](express2.js)

    const express = require('express');
    const app = express();
    const port = 5002;

    app.get('/',function(req,res,next){    
        res.write('<h1>Abra o console para entender o exemplo</h1>');
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'POST'}).then(console.log);">POST</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PUT'}).then(console.log);">PUT</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'DELETE'}).then(console.log);">DELETE</button>`);
        next();
    }).listen(port)

    app.post('/',function(req,res,next){
        console.log('Requisicao POST');
        res.sendStatus(201);
        next();
    });

    app.put('/',function(req,res,next){
        console.log('Requisicao PUT');
        res.sendStatus(202);
        next();
    });

    app.delete('/',function(req,res,next){
        console.log('Requisicao DELETE');
        res.sendStatus(204);
        next();
    });

Assim como temos com o *GET* existe com outros métodos também, no caso seria `app.[verbo HTTP]()`, devendo `[verbo HTTP]` a ser substituído pelo verbo *HTTP* correspondente.  

#### método: send, sendStatus, write do response
O `send` de `response.send` deve ser usado quando você quer enviar uma única resposta ao cliente, ao ser usado o conteúdo dentro dos parentes é enviado ao cliente e após isso a comunicação é encerrada. O método `sendStatus` envia um status ao cliente, ou seja um código *HTTP*, interessante para uma requisicição tipo delete, ao qual não há dados a ser enviado, mas se faz necessário informar que a requisição deu certo.

    app.delete('/',function(req,res,next){
        console.log('Requisicao DELETE');
        res.sendStatus(204);
        next();
    });

Por fim o *write* permite que você envie várias informações ao cliente de maneira parcial, sem o incomodo do método *send* que encerra a conexão e serve para fazer um envio único, segue o exemplo do write:

    app.get('/',function(req,res,next){    
        res.write('<h1>Abra o console para entender o exemplo</h1>');
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'POST'}).then(console.log);">POST</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PUT'}).then(console.log);">PUT</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'DELETE'}).then(console.log);">DELETE</button>`);
        next();
    }).listen(port)

### Trabalhando com Parametros na porta 5003
[express3.js](express3.js)

    const express = require('express');
    const app = express();
    const port = 5002;

    app.get('/:id', (req,res,nex) => res.send(`<h1>com Parametros: ${req.params.id} </h1>`));
    app.get('/', (req,res,nex) => res.send('<h1>Sem parametros </h1>')).listen(port);

    console.log('executando');

No caso você pode tratar rotas com parametros, informando na url com 2 pontos aonde estará o parametro, como aqui `'/:id'`, que significa que ao acessar a rota principal passando argumento, será a callback registrada aqui, que irá tratar essa requisição. Dentro do objeto *request*, que é o primeiro argumento da callback que trata qualquer requisição, tem um array que funciona de maneira semelhante ao `$_GET` ao do PHP, seu nome é `params`, como nesse exemplo aqui `req.params.id`, no caso esse parametro **id**, passado aqui `'/:id'` é resgatado aqui `req.params.id`, se por exemplo o nome do argumento for *arg*, no exemplo `'/:arg'`, no caso para recuperar o valor passado ali `req.params.arg`. Para resumir: `'/:[parametro]'` => `req.params.[parametro]`.

### Suporte a expressão regular
[express4.js](express4.js)

    const express = require('express');
    const app = express();

    app.get('/ab?cd', (req,res,next) => res.send('YES OK!'));
    app.get('/', (req,res,next) => res.send('NOT OK!')).listen(5004);

*Aqui estão alguns exemplos de caminhos de rota baseados em padrões de sequência, este caminho de rota irá corresponder ao acd e abcd.*

### Middleware para carregar arquivos dentro de uma pasta
[express_middleware](express_middleware.js)

    const express = require('express');
    const app = express();

    function fn(arg = "Raiz"){
        let str = `
            
        <p>
            <a href="http://localhost:5000/index1.html">index1.html</a>
        </p>
        <p>
            <a href="http://localhost:5000/index2.html">index2.html</a>
        </p>        
        `;
        str += `<p>${arg}</p>`;
        return str;
    }

    app.use(express.static('use'));
    app.get('/:p?', (req,resp) => resp.send(fn(req.params.p)))
    .listen(5000);

#### O método USE
O método *USE* é uma forma de implementar *middleware*, conforme visto aqui `app.use(express.static('use'));`, então dentro do método *use* você passa uma função e essa função irá fazer o processamento dentro do express, nesse caso é passado o `express.static('use')`, que basicamente pega a pasta *use* e cria uma rota para cada arquivo la dentro, você pode ver um exemplo disso, você pode perceber que os dois arquivos *html* dessa pasta [use](./use/), confore analisado acima, então o middleware *static*, cria uma rota para cada arquivo, lembrando que essa pasta está na raiz, uma vez que não é informado o path. [Para Mais informações](#use)

#### Parametros opcionais
Você pode informar que um parametro é opcional usando um interrogação, conforme visto aqui `'/:p?'`, no caso o interrogação diz que a rota pode ou não ter o parametro `:p`.

### Método Route
[express5.js](express5.js)

    const express = require('express');
    const app = express();
    const port = 5005;

    app.route('/')
        .get(function(req,res,next){        
            res.write(`
                <button onclick="fetch('http://localhost:${port}/',{method:'POST'})
                .then(console.log)">POST</button>`
            );        

            res.write(`
                <button onclick="fetch('http://localhost:${port}/',{method:'PUT'})
                .then(console.log)">PUT</button>`
            );

            res.write(`
                <button onclick="fetch('http://localhost:${port}/',{method:'DELETE'})
                .then(console.log)">DELETE</button>`
            );
            next();        
        })
    .post((req,res) => res.sendStatus(201))
    .put((req,res) => res.sendStatus(202))
    .delete((req,res) => res.sendStatus(204));

    app.listen(port, () => console.log('Escutando'));

#### Explicando o método route
Você pode fazer encadeamento usando o *route* `app.route('/')`, nesse método você passa argumento a rota a ser analizada, podendo executar o método encadeado de acordo com a requisição solicitada.

#### Executando o listen
    app.listen(port, () => console.log('Escutando'));

Você pode chamar o método *listen* não encadendo com nenhum método e além disso passar uma callback para que seja executado, assim que o express começar a ouvir requisições nessa porta.

### Outro uso para o GET e o SET
[express6](./express6.js)

    const express = require('express');
    const app = express();

    app.set('variavel',`Valor randomico ${Math.random()}`);
    app.get('/',(req,res) => res.send(app.get('variavel')));
    app.listen(5006, () => console.log('Ouvindo... '));
#### SET
Dessa forma você define uma variável a ser usado no lado do cliente da requisição ``app.set('variavel',`Valor randomico ${Math.random()}`);``, aqui você define no esquema *chave-valor*, o primeiro argumento é a chave, que no caso é a **variavel** e o segundo argumento o valor.

#### GET
Aqui você pode ver o duplo papel do *GET* `app.get('/',(req,res) => res.send(app.get('variavel')));`. O *GET* pode ser usado tanto para definir rotas, como para resgatar valores de variáveis, no caso, aqui é pego o valor de **variavel** `app.get('variavel')` e aqui para definir rotas `app.get('/',(req,res) => res.send(app.get('variavel')));`, no caso o método valia o conteúdo da string e retorna um valor quando a `/` está ausente e quando presente cria-se uma nova rota.

### Outro uso para o SET
[express7.js](express7.js)

    const express = require('express');
    const app = express();

    app.set('views','./');
    app.set('view engine','jade');

    app.get('/', (req,res) => res.render('index',{a:1,b:2}));

    app.listen(5007, () => console.log('Escutando...'));

Assim como o *set* pode ser usado para criar uma variável, pode ser usado também para modificar elas, nesse caso `app.set('views','./');`, estamos definindo uma pasta para *views*, nesse caso o express vai entender o diretório passado como parametro como uma pasta de view a ser usado. Após isso, temos `app.set('view engine','jade');` que define o `view engine` para o *jade*, nesse caso o express irá procurar por arquivos *jade* nesse diretório. Um arquivo *jade* seria uma espécie de HTML dinâmico e com suporte a recursos das linguagens de programação,  e que se caracteriza pela sua sintaxe semelhante ao do *PYTHON*, segue um exemplo abaixo:
[index.jade](./index.jade)

    html 
    head 
        title Exemplo com o JADE
    body 
        h1 Exemplo com JADE
        p=a
        p=b        

Então no caso quando for solicitado uma determinada rota, como visto aqui `app.get('/', (req,res) => res.render('index',{a:1,b:2}));`, será carregado esse arquivo acima, mas basta deixar claro, que nesse caso se usa o método *render* do express e não a *write*.

#### Método Render
Esse método está dentro do objeto response da callback passada de argumento para as rotas e ele basicamente trabalha com dois argumentos, sendo o primeiro o arquivo, que ele deve carregar, ao qual ele infere a extensão graças a essas linhas:

    app.set('views','./');
    app.set('view engine','jade');

Logo com base nelas, sabe-se que o *index* aqui `res.render('index',{a:1,b:2}))` está dentro de *views* e possuí a extensão *jade*. Já o segundo argumento são os parametros, que podem ser passados nesse caso para o arquivo jade usar, ao qual o esse objeto `{a:1,b:2}`, os seus valores, são usados aqui:

    p=a
    p=b    

## Body-Parser
[Documentação completa](https://expressjs.com/en/resources/middleware/body-parser.html)

Inicalmente você precisa importar o *body-parser* para a sua aplicação, conforme visto aqui `const body = require('body-parser');`

[Body Parser com JSON](bodyParserJson.js)

    const body = require('body-parser');
    const express = require('express');
    const app = express();

    app.use(body.json());
    app.use(body.urlencoded({extended:true}))

    app.route('/')
        .get(function(req,res,next){
            res.write(`
                <html>
                    <body>
                        <form method='POST' action='/'>
                            <input name='valor' />
                            <input type='submit' value='enviar' />
                        </form>
                    </body>
                </html>
            `);
        })
        .post(function(req,res,next){
            res.send(req.body);
            next();
        });

    app.listen(5010, () => console.log('Ouvindo o body parser json'));

O módulo *body-parser* é um módulo que pode ser usado como um *middleware* para o *express*, tudo que você precisa fazer é importar ele a instancia do *express*, conforme visto abaixo:

    app.use(body.json());
    app.use(body.urlencoded({extended:true}))

### Opções que pode ser usado no método JSON do body-parser
Retorna o middleware que apenas analisa o "JSON" e só olha para solicitações onde o cabeçalho *Content-Type* corresponde à opção Tipo.Este analisador aceita qualquer codificação Unicode do corpo e suporta a inflação automática de codificações "gzip" e de deflate.
Um novo objeto de corpo contendo os dados analisados é preenchido no objeto de solicitação após o middleware(i.e. req.body). Qualquer uma dessas opções deve ser colocado dentro no método, por exemplo: `body.json({inflate:false})`

#### inflate
Quando definido para `true`, Em seguida, os corpos deflacionados (compactados) serão inflados; quando `false`, corpos deflacionados são rejeitados. Padrão `true`.

#### limit
Controla o tamanho do corpo de solicitação máxima.Se isso for um número, o valor especifica o número de bytes;Se for uma string, o valor é passado para a biblioteca Bytes para analisar. Padrão '100kb'.

#### reviver
A opção Reviver é passada diretamente para `JSON.parse` Como o segundo argumento. Você pode encontrar mais informações sobre este argumento na documentação do MDN sobre `JSON.parse`.

#### strict
Quando definido para `true`, só aceitará matrizes e objetos; Quando `false` aceitará qualquer coisa `JSON.parse` aceita. Padrão `true`.

#### type
A opção Tipo é usada para determinar qual tipo de mídia o middleware irá analisar. Esta opção pode ser uma string, matriz de strings ou uma função. Se não for uma função, o tipo opção será passada diretamente para a biblioteca do tipo e isso pode ser um nome de extensão (como json), um tipo mime (como application/json), ou um tipo mime com um curinga (como */* ou */json). Se uma função, a opção Tipo é chamada de `fn(req)` e o pedido é analisado se retornar um valor verdadeiro. Padrão application/json.

#### verify
A opção de verificação, se `true`, é chamada de verificação(req, res, buf, encoding), onde buf é um Buffer do corpo de pedido bruto e codificação é a codificação da solicitação. A análise pode ser abortada jogando um erro.

### Opções para o método urlencoded
#### Opção extended
A opção estendida permite escolher entre analisar o *URL-encoded* dados com a biblioteca de *querystring* (quando false) ou o *qs library* (quando true). The **“extended”** A sintaxe permite que objetos ricos e matrizes sejam codificados no formato `URL-encoded`, Permitindo um objeto como *JSON* experiência com `URL-encoded`. Para mais informações, por favor veja: *qs library*.

Padrão `true`. Por favor, pesquise a diferença entre `qs` e `querystring` e escolha a configuração apropriada.

### Para concluir
**Você precisa implementar o middleware:**

    app.use(body.json());

**Após isso você deve implementar o *urlencoded* caso você queria usar o body-parser para tratar requisições:**

    app.use(body.urlencoded({extended:true}))

**Por fim você pode usar o objeto *body*, graças a implementação acima, funcionará perfeitamente, do contrario, isso não irá funcionar:**

    .post(function(req,res,next){
        res.send(req.body);
        next();
    });

## Cadeias de Middleware
###### Código
    const express = require('express');
    const app = express();
    const port = 5011;
    const li = txt => `<li>${txt}</li>`;

    app.all('/', (req,res,next) => {
        console.log('CB1');
        res.writeHead(200, {         
            'Content-Type': 'text/html'
        });
        res.write('<ol style="margin:5px;font-size:48px;">');    
        next();
        //Depois do next, nao envie nada ao cliente...
        console.log('Numero aleatorio: '+Math.random());
        //res.write('vai dar ruim se descomentar');
    });

    app.all('/',function(req,res,next){
        console.log('CB2');
        res.write(li('Primeira callback'));    
        next();        
    });

    app.all('/',function(req,res,next){
        console.log('CB3');
        res.write(li('Segunda callback'));
        next();       
    });

    app.all('/',function(req,res,next){
        console.log('CB4');
        res.write(li('Terceiro callback'));
        next();    
    });

    app.all('/', (req,res) => {
        console.log('CB5');
        res.end('</ol>');
    });

    app.listen(port, () => console.log(`Ouvindo na porta: ${port}`));

### Método .all
Esse método faz com que seja executado uma única callback para todos os métodos *HTTP*. Por exemplo aqui `app.all('/', (req,res,next) => {`, se o usuário entrar nessa url independente se o método é *GET*, *POST* ou qualquer outro que seja, será executado essa mesma callback.

### Método .writeHead do response 

     res.writeHead(200, {         
        'Content-Type': 'text/html'
    });

Nem sempre o *express* deduz corretamente o conteúdo, e esse problema pode acontecer quando você pode ter todo o processamento distribuido entre vários *middlewares*, no caso sem esse método o navegador processaria tudo como texto plano, sem renderizar as tagas html.

### Dividindo a lógica em diferentes Middlewares
#### Primeiro middleware
###### Código
    app.all('/', (req,res,next) => {
        console.log('CB1');
        res.writeHead(200, {         
            'Content-Type': 'text/html'
        });
        res.write('<ol style="margin:5px;font-size:48px;">');    
        next();
        //Depois do next, nao envie nada ao cliente...
        console.log('Numero aleatorio: '+Math.random());
        //res.write('vai dar ruim se descomentar');
    });

##### Explicando o primeiro middleware
Nesse caso primeiro é executado esse trecho:

    ...
        res.writeHead(200, {         
            'Content-Type': 'text/html'
        });
    ...   

Que no caso informa o tipo de conteúdo que o navegador vai renderizar, após isso `res.write('<ol style="margin:5px;font-size:48px;">');`, começa a criação de uma lista e usando a tag **OL**, e então executa o `next` passando assim para o próximo middleware. Sobre o *next* algumas coisas devem ser analisadas:

    next();
    //Depois do next, nao envie nada ao cliente...
        console.log('Numero aleatorio: '+Math.random());
    //res.write('vai dar ruim se descomentar');

Repare que após o *next* existem dois códigos, um comentado e outro funcionando. No caso após dado um *next*, se for feito um envio ao cliente, será lançado um erro, ou seja se essa linha for descomentada `//res.write('vai dar ruim se descomentar');`, ao passo que se essa linha não dá erro `console.log('Numero aleatorio: '+Math.random());`, isso ocorre devido ao fato de que o *console.log* não envia nada ao cliente, ou seja após dado um *next* não se pode enviar resposta ao cliente, sob o risco de dar erros, mas isso não impede de executar códigos do lado do servidor, lembrando que esse código após o *next* será executado após todos os *middlewares*, ou seja primeiro se executa os middlewares na ordem especificada, ou seja de cima para baixo, todas as lógicas antes do next, ai depois é executado o código após o next de cima para baixo também, um exemplo de *output* para se ter uma idéia. *CB* são as callbacks e essa linha `console.log('Numero aleatorio: '+Math.random());` gera um número aleatório.

###### output

    $ node middlewares.js 
    Ouvindo na porta: 5011
    CB1
    CB2
    CB3
    CB4
    CB5
    Numero aleatorio: 0.765864996866878

Repare que no output acima o código após o next foi executado por ultimo.

##### Observações sobre next() e .writeHead()
**Quando for usar mais de um *middleware, lembre-se de sempre chamar a função passada como terceiro argumento a callback, no caso a função `next` nesse exemplo, pois do contrário a aplicação trava, então sempre use o `next` após a conclusão do middleware e chame ao início o método writeHead para que o navegador saiba com que está lidando.**

##### E então

    app.all('/',function(req,res,next){
        console.log('CB2');
        res.write(li('Primeira callback'));    
        next();        
    });

    app.all('/',function(req,res,next){
        console.log('CB3');
        res.write(li('Segunda callback'));
        next();       
    });

    app.all('/',function(req,res,next){
        console.log('CB4');
        res.write(li('Terceiro callback'));
        next();    
    });

    app.all('/', (req,res) => {
        console.log('CB5');
        res.end('</ol>');
    });

Ou seja a execução continua, uma vez que o *next* faz com que outro middleware seja executado, até chegarmos aqui:

    app.all('/', (req,res) => {
        console.log('CB5');
        res.end('</ol>');
    });

## USE 
[express_use](express_use.js)
###### Código
    const express = require('express');
    const app = express();
    const port = 5012;

    app.use(function(req,res,next){
        if(req.method === 'GET'){
            res.writeHead(200, {         
                'Content-Type': 'text/html'                  
            });

            res.write('<h1>GET</h1>');
            res.write('<br />');
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'POST'}).then(e => e.text()).then(console.log)">POST</button>`);
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'PUT'}).then(e => e.text()).then(console.log)">PUT</button>`);
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'PATCH'}).then(e => e.text()).then(console.log)">PATCH</button>`);
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'DELETE'}).then(e => e.text()).then(console.log)">DELETE</button>`);
        }else{
            res.writeHead(200, {         
                'Content-Type': 'text/plain'            
            });
            res.write(`Método: ${req.method}`);
            console.log(`Método ${req.method} usado`);
        }
        next();
    });

    app.use('/',(req,res) => res.end());
    app.listen(port, () => console.log(`ouvindo na porta ${port}`));

### Uma análise mais aprofundada do método USE
O use varia dependendo do contexto, o método *use* é semelhante ao método *all*, porem o método *all* atende a rota especificada na *string* ao passo que o método *use* ele atende as rotas que começcam com aquele padrão e não com uma rota que bata 100% com aquele padrão, por exemplo `app.use('/',(req,res) => res.end());`, nesse caso todo e qualquer sub-página do servidor será atendida por essa *URL*, no caso a url padrão `/` será atendida, assim como `/[qualquer_coisa]` também será atendida, podendo esse `[qualquer_coisa]` ser uma sub-página, por exemplo `http://[url]/sub/`, assim como `http://[url]/pagina?param=value` por exemplo ou até mesmo `http://[url]/[pagina]?[param]=[valor]`, ou seja, nesse contexto `app.use('/',(req,res) => res.end());`, qualquer coisa que começa com barra, ou seja tudo no servidor nesse exemplo, para resumir isso equivale a url `*.` se fosse pensar em termos de *regex*.

### Omitindo rota no USE
    app.use(function(req,res,next){
        if(req.method === 'GET'){
            res.writeHead(200, {         
                'Content-Type': 'text/html'                  
            });

            res.write('<h1>GET</h1>');
            res.write('<br />');
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'POST'}).then(e => e.text()).then(console.log)">POST</button>`);
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'PUT'}).then(e => e.text()).then(console.log)">PUT</button>`);
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'PATCH'}).then(e => e.text()).then(console.log)">PATCH</button>`);
            res.write(`<button onclick="fetch('http://localhost:5012',{method:'DELETE'}).then(e => e.text()).then(console.log)">DELETE</button>`);
        }else{
            res.writeHead(200, {         
                'Content-Type': 'text/plain'            
            });
            res.write(`Método: ${req.method}`);
            console.log(`Método ${req.method} usado`);
        }
        next();
    });

#### Explicando
Nesse caso acima o *use* funciona para colocar uma função como *middleware* para todas as rotas, nesse caso, a função passada ali será executada passado independente do método *http* ou da rota, nesse caso ela opera como uma middleware mesmo. Logo se você fizer algo do tipo `app.use(bodyParser.json())`, o processamento do método *json* será executado em todas as rotas e métodos, em outras palavras o que o código acima faz é analogo ao *body-parser*, ou seja faz um processamento em cima dos dados pego.


## Router
[router.js](router.js)
###### Código
    const express = require('express');
    const router = express.Router();
    const app = express();
    const port = 5013;

    router.use('/',function(req,res,next){    
        if(req.method === "GET"){
            res.writeHead(200, {         
                'Content-Type': 'text/html'                  
            });    
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'POST'}).then(e => e.text()).then(console.log)">POST</button>`);
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PUT'}).then(e => e.text()).then(console.log)">PUT</button>`);
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PATCH'}).then(e => e.text()).then(console.log)">PATCH</button>`);
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'DELETE'}).then(e => e.text()).then(console.log)">DELETE</button>`);    
        }
        next();
    });

    const callback = function callback(req,res){
        res.json(
            {
                hostname:req.hostname,
                ip: req.ip,
                method: req.method,            
            }
        );    
    }

    router.post('/:p1?/:p2?',callback);
    router.put('/:p1?/:p2?',callback);
    router.patch('/:p1?/:p2?',callback);
    router.delete('/:p1?/:p2?',callback);

    app.use('/',router);
    app.listen(port, () => console.log(`Ouvindo na porta ${port}`));

### Explicando essa parte antes 

    res.json(
        {
            hostname:req.hostname,
            ip: req.ip,
            method: req.method,            
        }
    );    

#### res.json dessa callback router
O método *json* do segundo parametro passado da callback de qualquer método que trata de rota, nesse exemplo o `res`, envia uma resposta em formado json, basicamente qualquer objeto *javascript* informado ali, é convertido a JSON e enviado ao cliente.

#### req dessa callback router

    {
        hostname:req.hostname,
        ip: req.ip,
        method: req.method,            
    }

através do primeiro parametro da callback passado a qualquer método que trata com rotas, nesse exemplo o `req`, tem informações pegas da requisição, nesse exemplo acima é pego respectivamente o *hostname* do cliente, *ip* podendo ser IPV4 ou IPV6 e o método que está sendo usado na requisição, é válido lembrar que este ultimo informa o método usado pelo cliente em letra maíuscula, ou seja o valor ali sempre será **GET**, **POST**, **PUT**, etc...
### Explicando
O *Router* tem por objetivo organizar melhor as rotas, para chamar-lo `const router = express.Router();` e uma vez pronto você pode incluir na rota `app.use('/',router);` sendo esse *app*, `const app = express();`, ou seja o métodos do *express* relacionados aos métodos HTTP, assim como o *use*, *all*, *route* **route sem o r no final**, aceitam como um segundo argumento, após informado via *string* a rota, um objeto do tipo *ROUTER* que contém dentro de si todas as rotas delimitadas ali, no caso, o que esse código `app.use('/',router);` diz é, que seja relacionado a url raiz do servidor o objeto router, sendo o objeto router o seguinte:

    router.use('/',function(req,res,next){    
        if(req.method === "GET"){
            res.writeHead(200, {         
                'Content-Type': 'text/html'                  
            });    
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'POST'}).then(e => e.text()).then(console.log)">POST</button>`);
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PUT'}).then(e => e.text()).then(console.log)">PUT</button>`);
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PATCH'}).then(e => e.text()).then(console.log)">PATCH</button>`);
            res.write(`<button onclick="fetch('http://localhost:${port}',{method:'DELETE'}).then(e => e.text()).then(console.log)">DELETE</button>`);    
        }
        next();
    });

    const callback = function callback(req,res){
        res.json(
            {
                hostname:req.hostname,
                ip: req.ip,
                method: req.method,            
            }
        );    
    }

    router.post('/:p1?/:p2?',callback);
    router.put('/:p1?/:p2?',callback);
    router.patch('/:p1?/:p2?',callback);
    router.delete('/:p1?/:p2?',callback);

Ou seja nessa linha `app.use('/',router);` toda a lógica acima é inclusa a rota informada na string passado como primeiro argumento, então desse modo, com o auxílio do *router* é possível modularizar toda a aplicação, no caso esse router poderia estar em um arquivo a parte, ser importado e após isso incluso como segundo argumento de uma função *express* que trabalhe com rotas.

## CORS
[Documentação](https://expressjs.com/en/resources/middleware/cors.html)

[Exemplo basico](cors1.js)

[Exemplo Com opções](cors2.js)
### Resumo
Cors é um middleware para o *express* que pode ser habilitado para que o express aceita requisições vindas de outras urls. Nesses exemplo o seu uso é facultativo, mas em servidores de produção não necessáriamente, no caso, se ouvesse qualquer requisição com uma origem diferente do ip que o *express* roda, ela seria recusada, no caso se o IP do cliente e do servidor forem diferente, pode ser que o express não complete a requisição por motivos de segurança, e é justamente ai que entra o **CORS**. Ou seja se o seu backend *express* vai aceitar requisições de outros **IPS** se faz necessário habilitar o *cors* e é ai que esse middleware entra, além disso assim como o *body-parser* esse você também tem que instalar, para isso `npm i cors`.

###### Exemplo Básico
    var express = require('express')
    var cors = require('cors')
    var app = express()

    app.use(cors())

    app.get('/', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
    })

    app.listen(4999, function () {
    console.log('CORS-enabled web server listening on port 4999')
    })

No caso você pode usar sem nenhum parametro `app.use(cors())`, aqui você está habilitando para qualquer um fazer requisições a esse backend, sem restrições, ou:

    var express = require('express')
    var cors = require('cors')
    var app = express()

    var corsOptions = {
        origin: 'http://localhost:4998/'
    }

    app.use(cors(corsOptions));

    app.get('/', function (req, res, next) {
        res.json({msg: 'This is CORS-enabled for only example.com.'})
    })

    app.listen(4998, function () {
        console.log('CORS-enabled web server listening on port 4998')
    })

conforme visto aqui `app.use(cors(corsOptions));`, você pode passar opções para o cors, no caso um objeto preenchido com as preferencias.

### Opções
#### origin
    cors({origin:'opcao'})

Configura o `Access-Control-Allow-Origin` do `CORS header`. Possíveis valores, por tipos:

`Boolean` - `true` para refletir a solicitação de origem, conforme definido por `req.header('Origin')`, ou defini-lo para `false`para desabilitar *CORS*.

`String` - define uma origem a uma origem específica. Por exemplo, se você configurá-lo para "http://example.com" apenas pedidos de “http://example.com” será permitido.

`RegExp` - Define origem a um padrão de expressão regular que será usado para testar a origem de solicitação. Se bater, a origem de solicitação será aceita. Por exemplo, o padrão /example\.com$/ refletirá qualquer pedido que vem de uma origem que termine com “example.com”.

`Array` - define origem com base em cada elemento. Cada origem pode ser uma string ou um regexp. Por exemplo ["http://example1.com", /\.example2\.com$/] aceitará qualquer pedido de “http://example1.com” ou de um subdomínio de “example2.com”.

`Function` - Defina uma função para implementar alguma lógica personalizada. A função recebe a origem de solicitação como o primeiro parâmetro e uma callback.

#### methods
    cors({methods:'opcao')

Configura o `Access-Control-Allow-Methods` do CORS header. Espera uma string delimitada por vírgula `(ex: ‘GET,PUT,POST’)` ou um array (ex: ['GET', 'PUT', 'POST']).

#### outros

    cors({listadoAbaixo:'valor'})

`allowedHeaders`: Configures the `Access-Control-Allow-Headers` do CORS header. Espera uma string delimitada por vírgula (ex: ‘Content-Type,Authorization’) ou um array (ex: ['Content-Type', 'Authorization']). Se não especificado, o padrão é refletir os cabeçalhos especificados na solicitação `Access-Control-Request-Headers` do header.

`exposedHeaders`: Configura o `Access-Control-Expose-Headers` do CORS header. Espera uma string delimitada por vírgula (ex: ‘Content-Range,X-Content-Range’) ou um array (ex: ['Content-Range', 'X-Content-Range']). Se não especificado, nenhum cabeçalho personalizado é exposto.

`credentials`: Configura o `Access-Control-Allow-Credentials` do CORS header. Defina como `true` para passar o cabeçalho, caso contrário, é omitido.

`maxAge`: Configura o. `Access-Control-Max-Age` CORS header. Defina como um integer para passar o cabeçalho, caso contrário, é omitido.

`preflightContinue`: Passe o CORS preflight resposta ao próximo manipulador.

`optionsSuccessStatus`: Fornece um código de status para usar para OPTIONS requests, Desde alguns navegadores legados (IE11, various SmartTVs).
## Para Concluir de maneira geral

[testes](testes.js)
###### Código
    const express1 = require('express');

    //comparando os objetos routers
    const router1 = express1.Router();
    const router2 = express1.Router();
    console.log('router1 é igual a router2:',(router1 === router2)?'sim':'não');

    //comparando as instancias
    const server1 = express1();
    const server2 = express1();
    console.log('server1 é igual a server2:',(server1 === server2)?'sim':'não');

    //Comparando o Express
    const express2 = require('express');
    console.log('express1 é igual a express2:',(express1 === express2)?'sim':'não');

###### output
    router1 é igual a router2: não
    server1 é igual a server2: não  
    express1 é igual a express2: sim

Ou seja não importa quantas vezes seja importado o *express*, ele trabalha com o padrão **Singleton**, mas o objeto da função executada por esse módulo, assim como o objetro do método **Router**, ambos não são **Singleton** e esse cuidado deve ser analizado na hora de trabalhar com o express.