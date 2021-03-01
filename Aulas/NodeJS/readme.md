# NPM
1. [Exemplo Básico](#exemplo-básico)

2. [Estrutura Básica](#estrutura-básica)

3. [Dependencies](#dependencies-e-devdependencies)

4. [Versões](#versões) 

## Exemplo Básico

    {
        "name": "aulas",
        "version": "1.0.0",
        "description": "Exemplo envolvendo nodejs",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "cronos2277",
        "license": "ISC"
    }

## Estrutura Básica
`name` => o nome do projeto. Usado em alguns projetos, no Eletron por exemplo pode usar esse valor para usar na barra de titulo da janela.

`version` => a versão do projeto.

`description` => descrição do projeto.

`main` => Arquivo de entrada, no caso o arquivo que vai iniciar a aplicação, alguns packages usam isso como base.

`author` => Quem fez o projeto?

`license` => Aqui você informa a licença do projeto.

### scripts
###### exemplo
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
#### Explicando
Aqui fica os scripts, no caso você pode usar qualquer comando a ser usado no terminal, porém se os comandos forem do *MS-DOS* e for executado no linux, não funcionar, assim como o contrário também pode não funcionar, e isso deve ser observado, um exemplo de comando *UNIX* no *MS-DOS*:

    'ls' não é reconhecido como um comando interno
    ou externo, um programa operável ou um arquivo em lotes.
    npm ERR! code ELIFECYCLE
    npm ERR! errno 1
    npm ERR! aulas@1.0.0 ls: `ls -latr`
    npm ERR! Exit status 1
    npm ERR!
    npm ERR! Failed at the aulas@1.0.0 ls script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
    npm WARN Local package.json exists, but node_modules missing, did you mean to install?

    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\crono\AppData\Roaming\npm-cache\_logs\2021-03-01T18_32_55_733Z-debug.log

>No caso existe um pacote chamado *shelljs* que permite a execução de comandos *unix* no *MS-DOS*, assim como o *cross-env* que permite configuração do ambiente.
#### MS-DOS
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "ms-dos": "dir",
        "ls": "ls -latr"
    },

Nesse caso acima são scripts registrados para serem executados usando o `npm run [script]`, sendo o `[script]` o nome dentro das chaves do objeto acima, nesse caso poderia ser `npm run test`, `npm run ms-dos` ou `npm run ls`. Lembrando que um teminar unix pode ter problema para executar esse `npm run ms-dos` assim como esse `npm run ls` deve ser executado no *ms-dos*. Certos comandos não precisam do run no meio, como o *start* por exemplo, no caso se colocassemos o *start* conforme abaixo:

    "scripts": {       
        "start": "echo ola mundo "
    },

bastaria digitar apenas `npm start`, sem o *run*, mas isso acontece para alguns scripts ao qual tem as suas palavras reservadas no node, para qualquer outra palavra, precisa do *run*.

## Dependencies e DevDependencies

        {
            "name": "aulas",
            "version": "1.0.0",
            "description": "Exemplo envolvendo nodejs",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "ms-dos": "dir",
                "ls": "ls -latr"
            },
            "author": "cronos2277",
            "license": "ISC",
            "dependencies": {
                "cross-env": "^7.0.3",
                "shelljs": "^0.8.4"
            },
            "devDependencies": {
                "bootstrap": "^4.6.0"
            }
        }

### Instalando
Para instalar usa-se o `npm i [pacote]` ou o `npm install [pacote]`, dessa forma o pacote é instalado na pasta *node_modules*, sendo que o `[pacote]` deve ser substituído pelo nome do pacote correspondete, em versões mais antigas do nodejs se faz necessário colocar o `--save` para que o mesmo seja registrado no arquivo *package.json*, ficando `npm install [pacote] --save`, o `--save` apenas se faz necessário em versões mais antigas do **Node Packager Manager (NPM)**, nas versões mais nova isso é incluso no json, mesmo que a flag `--save` seja omitida, sendo registrado nessa parte do **JSON**. Para recriar a pasta *node_modules* basta apenas dar um `npm i` ou `npm install` dessa forma toda a pasta *node_modules* será criada.

    "dependencies": {
        "cross-env": "^7.0.3",
        "shelljs": "^0.8.4"
    },

### Instalando como dependência do desenvolvedor
Dependências do dessenvolvedor não é instalado automaticamente quando se da um `npm i`, nesse caso as depêndencias de desenvolvedor não são inclusas, para tal você precisa usar `npm install -D` ou `npm i -D` para que se instale todas as depêndencias de desenvolvedor, para adicionar uma nova dependência como *devDependencies*, basta `npm i -D [pacote]` ou `npm install -D [pacote]`, devendo o `[pacote]` ser substituído pelo nome correspondente do pacote, nas versões antigas era necessário  `npm install [pacote] --save-dev` para que fosse registrado no *package.json*.

    "devDependencies": {
        "bootstrap": "^4.6.0"
    }

## Versões
`"cross-env": "^7.0.3"` => Permite a atualização no pacote contanto que se mantenha na versão 7. No caso esse pacote poderia evoluir para a versão `7.0.9` ou para `7.9.9` mas não para a versão `8`. Ou seja atualização *major* é o tipo de evolução padrão. Em resumo esses apenas esses dois números pode mudar `0.3`. O que permite a atualização de bugs e atualização menores.

`"cross-env": "~7.0.3"` => Permite a versão minot seja mudado, no caso apenas a parte com o número `.3`, o que permite apenas atualização contra  bugs.

`"cross-env": "7.0.3"` => Versão exata, ou seja, aceita apenas a versão **7.0.3**.

### Outras
`">7.0.3"` => versão maior que 7.0.3.

`"<7.0.3"` => versão menor que 7.0.3.

`">=7.0.3"` => versão maior ou igual que 7.0.3.

`"<=7.0.3"` => versão menor ou igual que 7.0.3.

###### Exemplo
    "dependencies": {
        "cross-env": ">=7.0.3",
        "shelljs": ">0.8.3"
    },
    "devDependencies": {
        "bootstrap": "<=4.6.0"
    }

