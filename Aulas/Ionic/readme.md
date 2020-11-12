# IONIC
[Documentação](https://ionicframework.com/docs)

[Básico Angular](./basico/)

## Exemplo Básico com o Angular
Aqui temos um exemplo de **Ionic** fazendo uso do **Angular**. [LINK](./basico/)

## Resumo
 Caso você queira criar um projeto padrão em branco usando o IONIC, pode-se usar o comando `ionic start [nome] blank`, o comando seria o `ionic start`, o `[name]` seria o nome do projeto sendo sempre bom evitar o uso de caracteres especiais e por fim o template que é o `blank`, que nesse caso é sem template. Nas configurações padrões você tem o Angular rodando abaixo do capô, mas se preferir você pode usar o react por exemplo, passando a tag **type** como por exemplo: `ionic start [nome] blank --react`. para inicializar com as configurações use `ionic serve`, nesse caso o ip será o **localhost** e a porta **8100**, tudo rodando nas configurações padrões, se quiser mais detalhes de como inicializar um novo projeto ou executar um projeto existente, basta descer.

## Iniciando um novo Projeto. 
### início iônico - Criar um novo projeto

    Este comando cria um aplicativo Ionic funcional. Ele instala dependências para você e configura seu projeto.

    Executar a partida iônica sem nenhum argumento solicitará informações sobre seu novo projeto.

    O primeiro argumento é o nome do seu aplicativo. Não se preocupe - você sempre pode alterar isso mais tarde. O --project-id é gerado a partir do nome, a menos que seja explicitamente especificado.

    O segundo argumento é o modelo a partir do qual gerar seu aplicativo. Você pode listar todos os modelos com a opção --list. Você também pode especificar uma URL de repositório git para o modelo, caso em que o projeto existente será clonado.

    Use a opção --type para iniciar projetos usando versões anteriores do Ionic. Por exemplo, você pode iniciar um projeto Ionic 3 com --type = ionic-angular. Use --list para ver todos os tipos e modelos de projeto.

  ### Uso:

    $ ionic start <name> <template> [options]

  ### Entradas:

    name ............................ O nome do seu novo projeto (por exemplo, myApp, "My App")
    template ........................ O modelo inicial a ser usado (por exemplo, em branco, guias; use --list para ver todos)

  ### Opções:

    --list, -l ...................... Listar modelos iniciais disponíveis
    --type=<type> ................... Tipo de projeto a ser iniciado (por exemplo, angular, react, angular ionic, ionic1)
    --cordova ....................... Inclui integração Cordova
    --capacitor ..................... (experimental) Inclui integração de capacitor
    --id=<id> ....................... Especifique um Ionic App ID para vincular

  ### Opções avançadas:

    --no-deps ....................... Não instale dependências npm / yarn
    --no-git ........................ Não inicialize um repo git
    --link .......................... Conecte seu novo aplicativo ao Ionic
    --project-id=<slug> ............. Especifique um slug para seu aplicativo (usado para o nome do diretório e nome do pacote)
    --package-id=<id> ............... Especifique o ID do pacote / ID do aplicativo para seu aplicativo (notação de DNS reverso)

  ### Exemplos:

    $ ionic start
    $ ionic start --list
    $ ionic start myApp
    $ ionic start myApp blank
    $ ionic start myApp tabs --cordova
    $ ionic start myApp tabs --capacitor
    $ ionic start myApp super --type=ionic-angular
    $ ionic start myApp blank --type=ionic1
    $ ionic start cordovaApp tabs --cordova
    $ ionic start "My App" blank
    $ ionic start "Conference App" https://github.com/ionic-team/ionic-conference-app

## Executando um projeto Ionic
  ionic serve - Inicie um servidor de desenvolvimento local para desenvolvimento / teste de aplicativos
    
    Por padrão, o servidor ionic inicializa um servidor de desenvolvimento em localhost. Para servir à sua LAN, especifique a opção --external, que usará todas as interfaces de rede e imprimirá o (s) endereço (s) externo (s) em que seu aplicativo está sendo servido.

    Experimente a opção --lab para ver várias plataformas ao mesmo tempo.

    Para direcionar o DevApp, use a opção --devapp.
  Uso:

    $ ionic serve [opções]

  Opções:

    --external ...................... Servidor de desenvolvimento de host em todas as interfaces de rede (ou seja, --address = 0.0.0.0)
    --no-livereload ................. Não gire o servidor de desenvolvimento - apenas exiba os arquivos
    --no-open ....................... Não abra uma janela do navegador
    --lab, -l ....................... Teste seus aplicativos em vários tipos de plataforma no navegador

  Avançado Opções:

    --address=<address> ............. Use um endereço específico para o servidor dev (padrão: localhost)
    --port=<port>, -p=? ............. Use a porta específica para HTTP (padrão: 8100)
    --devapp ........................ Publicar serviço DevApp
    --lab-host=<host> ............... Use o endereço específico para o servidor Ionic Lab (padrão: localhost)
    --lab-port=<port> ............... Use a porta específica para o servidor Ionic Lab (padrão: 8200)
    --browser=<browser>, -w=? ....... Especifica o navegador a ser usado (safari, firefox, chrome)
    --browseroption=<path>, -o=? .... Especifica um caminho para abrir (/ # / tab / dash)

  Exemplos:

    $ ionic serve
    $ ionic serve --external
    $ ionic serve --lab

## Gerando componentes

    ionic g - Criar recursos de estrutura automaticamente

    Este comando usa a CLI Angular para gerar recursos como páginas, componentes, diretivas, serviços, etc.

    - Para obter uma lista completa dos tipos disponíveis, use npx ng g --help
    - Para obter uma lista de opções de tipos, use npx ng g <type> --help

    Você pode especificar um caminho para aninhar seu recurso em qualquer número de subdiretórios. Por exemplo, especifique um nome de "pages / New Page" para gerar arquivos de página em src / app / pages / new-page /.

    Para testar um gerador antes de fazer modificações no arquivo, use a opção --dry-run.

  Uso:

    $ ionic g <tipo> <nome>

  Entradas:

    tipo ............................ O tipo de recurso (por exemplo, página, componente, diretiva, serviço)
    nome ............................ O nome / caminho do elemento que está sendo gerado

  Exemplos:

    $ ionic g
    $ ionic g page
    $ ionic g page contact
    $ ionic g component contact/form
    $ ionic g component login-form --change-detection=OnPush
    $ ionic g directive ripple --skip-import
    $ ionic g service api/user
