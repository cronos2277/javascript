# Database
## O que é?
Esse database é o backend mais simples possível, no caso simplesmente tem um servidor json que gerencia um arquivo, no caso o [db.json](db.json) de acordo com os métodos rest. Se post adiciona, get devolve o resultado, put ou path atualiza e delete exclui, esse arquivo em questão funciona como uma espécie de banco de dados.

## Como instalar?
No **NPM** digita: `npm i json-server` ou `$ npm install json-server` o nome do pacote é **json-server**.

## Como executar?
 Venha com o terminal até essa pasta, com o node js instalado e digite `npm start`.

## Como funciona?
você pode fazer isso pelo terminal: `json-server --watch db.json --port 3001` ou associar esse comando ao NPM start dentro do [package.json](package.json).
    
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start":"json-server --watch db.json --port 3001"
    },

 ### Explicando: 
 `json-server` é o nome da aplicação que deseja executar, `--watch` é o modo de execução, nesse caso ele fica monitorando o arquivo, ou seja ele persiste executando, `db.json` o nome do arquivo a ser assistido, é nesse arquivo que será salvo dados enviado por post, excluído quando solicitado pelo método HTTP delete, retornado quando por GET e por ai vai... `--port 3001` a porta **TCP** ao qual você quer ouvir o processo. Assim sendo: `json-server --watch db.json --port 3001`.

### Conteúdo do JSON
    {
        "products": [
            {
            "id": 1,
            "name": "Caneta BIC Preta",
            "price": 5.89
            },
            {
            "id": 2,
            "name": "Notebook Mac Pro",
            "price": 12000.89
            },
            {
            "id": 3,
            "name": "Sansung S20+ Ultra",
            "price": "7520.89"
            },
            {
            "name": "Lapis Preto Básico",
            "price": "1.50",
            "id": 4
            }
        ]
    }

#### Explicando o JSON. 
 repara que temos um atributo que contém um array, no caso o **products**, para que seja adicionado valores ali, você deve usar a url **localhost:porta/[nome desse array]** sendo nesse exemplo: `http://localhost:3001/products` , cada array desse seria uma collection independente, no caso você poderia ter mais "collection" dessa e dentro fica os dados, dentro de um objeto, é dessa forma que os dados serão salvos e por meio dos métodos rest, será feito as operações de CRUD, essa collection tem um amontoado de objetos, no caso isso é mais parecido com um MongoDB do que um banco de dados relacional, porém tudo dentro de um único json.