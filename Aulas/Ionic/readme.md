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

## Ionic Codificando
O IONIC funciona sobre um outro framework javascript, podendo ser **React**, **Vue**, **Angular** ou até mesmo no próprio **vanilla**, nas novas versões do IONIC sobre o Angular o próprio IONIC gerencia as rotas usando a tag:

    <ion-router-outlet id="menu"></ion-router-outlet>

[documentação sobre rotas](https://ionicframework.com/docs/api/router)

### Menus
[documentação](https://ionicframework.com/docs/api/menu)

>O componente Menu é uma gaveta de navegação que desliza do lado da visualização atual. Por padrão, ele desliza da esquerda, mas o lado pode ser substituído. O menu será exibido de forma diferente com base no modo, no entanto, o tipo de exibição pode ser alterado para qualquer um dos tipos de menu disponíveis. O elemento de menu deve ser irmão do elemento de conteúdo raiz. Pode haver qualquer número de menus anexados ao conteúdo. Eles podem ser controlados a partir dos modelos ou programaticamente usando o MenuController.

Não se faz necessário ter um *id*, exceto que queira criar um menu, ai se faz necessário que o Menu seja irmão do router. Segue um exemplo desse menu:

    <ion-app>
    <ion-menu contentId="menu" menuId="main-menu">
    <ion-header>    
      <ion-toolbar color="primary">      
        <ion-title>Start Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
          <ion-menu-toggle autoHide="false">
            <ion-item button 
              *ngFor="let page of pages" 
              [routerLink]="page.url"
              [routerDirection]="page.direction">        
            <ion-icon slot="start" [name]="page.icon"></ion-icon>
            <ion-label>{{page.text}}</ion-label>
          </ion-item>
      </ion-menu-toggle>
      </ion-list>
    </ion-content>
    </ion-menu>
      <ion-router-outlet id="menu">
      </ion-router-outlet>
    </ion-app>


`<ion-app>` => Container que envolve o menu e as rotas, lembre-se um precisa ser irmão do outro, segundo a documentação:

  >App é um elemento de contêiner para um aplicativo Ionic. Deve haver apenas um elemento `<ion-app>` por projeto. Um aplicativo pode ter muitos componentes Ionic, incluindo menus, cabeçalhos, conteúdo e rodapés. Os componentes de sobreposição são anexados ao `<ion-app>` quando são apresentados.

  `<ion-menu contentId="menu" menuId="main-menu">` tag referente ao menu, faz necessário ter um *menuId* caso haja mais de um menu ou mais de uma forma de chamada, assim como precisa de um **contentId**, sendo que esse ultimo serve para referenciar o arquivo de rota, no caso esse menu faz referencia a `<ion-router-outlet id="menu">`

  ### Headers
  O IONIC tem uma tag específica para header, para isso: ` <ion-header> ` ` <\ion-header>` tudo que estiver no header ficará no topo da página [documentação](https://ionicframework.com/docs/api/header).

  >Cabeçalho é um componente pai que contém o componente da barra de ferramentas. É importante observar que o ion-header precisa ser um dos três elementos raiz de uma página

    <ion-header>    
      <ion-toolbar color="primary">      
        <ion-title>Start Menu</ion-title>
      </ion-toolbar>
    </ion-header>


  `<ion-toolbar>` => Cria um componente para destacar o conteúdo.
  >As barras de ferramentas são posicionadas acima ou abaixo do conteúdo. Quando uma barra de ferramentas é colocada em um `<ion-header>`, ela aparecerá fixada na parte superior do conteúdo e, quando estiver em um `<ion-footer>`, aparecerá fixada na parte inferior. O conteúdo da tela inteira irá rolar atrás de uma barra de ferramentas em um cabeçalho ou rodapé. Quando colocadas em um `<ion-content>`, as barras de ferramentas rolarão com o conteúdo.

  
  `<ion-title>` => Use essa tag caso queira exibir algum titulo no header.
  >ion-title é um componente que define o título da barra de ferramentas.

### Content
O content seria como se fosse o *body* do IONIC. [Documentação](https://ionicframework.com/docs/api/content)

    <ion-content>
      <ion-list>
          <ion-menu-toggle autoHide="false">
            <ion-item button 
              *ngFor="let page of pages" 
              [routerLink]="page.url"
              [routerDirection]="page.direction">        
            <ion-icon slot="start" [name]="page.icon"></ion-icon>
            <ion-label>{{page.text}}</ion-label>
          </ion-item>
      </ion-menu-toggle>
      </ion-list>
    </ion-content>

`<ion-list>` usado para criar lista de elementos a serem renderizados.[Documentação](https://ionicframework.com/docs/api/list)
>As listas são compostas por várias linhas de itens que podem conter texto, botões, alternadores, ícones, miniaturas e muito mais. As listas geralmente contêm itens com conteúdo de dados semelhante, como imagens e texto. As listas suportam várias interações, incluindo deslizar itens para revelar opções, arrastar para reordenar itens na lista e excluir itens.

#### ion-menu-toggle
>O componente MenuToggle pode ser usado para alternar um menu aberto ou fechado. Por padrão, só é visível quando o menu selecionado está ativo. Um menu está ativo quando pode ser aberto / fechado. Se o menu estiver desabilitado ou estiver sendo apresentado como um painel dividido, o menu é marcado como não ativo e a tecla de alternância do menu de íons se oculta. Caso seja desejado manter o botão ion-menu-toggle sempre visível, a propriedade autoHide pode ser configurada como false. [documentação](https://ionicframework.com/docs/api/menu-toggle)

#### ion-item
>Itens são elementos que podem conter texto, ícones, avatares, imagens, entradas e quaisquer outros elementos nativos ou personalizados. Geralmente, eles são colocados em uma lista com outros itens. Os itens podem ser deslizados, excluídos, reordenados, editados e muito mais.

##### Itens clicáveis
>Um item é considerado "clicável" se tiver um conjunto de propriedades href ou botão. Os itens clicáveis ​​têm algumas diferenças visuais que indicam que podem interagir com eles. Por exemplo, um item clicável recebe o efeito cascata ao ser ativado no modo md, tem um destaque quando ativado no modo ios e tem uma seta de detalhes por padrão no modo ios.

##### Setas de Detalhe
>Por padrão, os itens clicáveis ​​exibirão um ícone de seta para a direita no modo ios. Para ocultar o ícone de seta para a direita em elementos clicáveis, defina a propriedade **detail** como *false*. Para mostrar o ícone de seta para a direita em um item que não o exibe naturalmente, defina a propriedade **detail** como *true.*

##### Posicionamento de item
>O item usa slots nomeados para posicionar o conteúdo. Essa lógica torna possível escrever um item complexo com marcação simples e compreensível, sem ter que se preocupar com estilização e posicionamento dos elementos.

Propiedades para **Slot**, Ex: `<ion-item slot='start'></ion-item>`

`start` **=>**	Coloca à esquerda de todos os outros conteúdos.

`end`   **=>**	Coloca à direita de todos os outros conteúdos.

`none`  **=>**	Coloca dentro do invólucro de entrada.

##### Icones
Sobre os ícones você pode verificar uma [lista deles aqui.](https://ionicons.com/), escolhido o ícone, você informa o nome dele no atributo name `<ion-icon slot="start" [name]="page.icon"></ion-icon>`, passando para a diretiva *name* o nome do icone a ser carregado, além disso é possível usar ícones de terceiros.

##### routerDirection
Essa propriedade define a animação, se será renderizado a animação de avançar ou voltar por exemplo no *IOS* ou *Android*, valores: *foward* => animação de avanção, *back* animação de recúo.

#### Cores
>O Ionic tem nove cores padrão que podem ser usadas para alterar a cor de muitos componentes. Cada cor é, na verdade, uma coleção de várias propriedades, incluindo um tom e um tom, usados ​​em todo o Ionic.

>Uma cor pode ser aplicada a um componente Ionic para alterar as cores padrão usando o atributo color. Observe nos botões abaixo que o texto e o fundo mudam com base no conjunto de cores. Quando não há cor definida no botão, ele usa a cor primária por padrão.

    <ion-button>Default</ion-button>
    <ion-button color="primary">Primary</ion-button>
    <ion-button color="secondary">Secondary</ion-button>
    <ion-button color="tertiary">Tertiary</ion-button>
    <ion-button color="success">Success</ion-button>
    <ion-button color="warning">Warning</ion-button>
    <ion-button color="danger">Danger</ion-button>
    <ion-button color="light">Light</ion-button>
    <ion-button color="medium">Medium</ion-button>
    <ion-button color="dark">Dark</ion-button>

>Cada cor consiste nas seguintes propriedades: base, contraste, tonalidade e tonalidade. As cores de base e contraste também requerem uma propriedade rgb que é a mesma cor, apenas no formato rgb. Veja The Alpha Problem para uma explicação de por que a propriedade rgb também é necessária. [Documentação Completa](https://ionicframework.com/docs/theming/colors)

### ion-footer

      <ion-footer>
        <ion-toolbar color="dark">   
          <ion-button color="light" (click)="changeBgColor('primary')">BG Color: primary</ion-button>
          <ion-button color="light" (click)="changeBgColor('secondary')">BG Color: secondary</ion-button>
          <ion-button color="light" (click)="changeBgColor('tertiary')">BG Color: tertiary</ion-button>
          <ion-button color="light" (click)="changeBgColor('success')">BG: success</ion-button>
          <ion-button color="light" (click)="changeBgColor('warning')">BG: warning</ion-button>
          <ion-button color="light" (click)="changeBgColor('danger')">BG: danger</ion-button>
          <ion-button color="light" (click)="changeBgColor('medium')">BG: medium</ion-button>
          <ion-button color="light" (click)="changeBgColor('dark')">BG: dark</ion-button>
          <ion-button color="light" (click)="changeBgColor('light')">BG: light</ion-button>
        </ion-toolbar>
    </ion-footer>

Coloca um footer na aplicação, [segue a documentação](https://ionicframework.com/docs/api/footer)

### ion-botao
renderiza um botão, [segue a documentação dos botões](https://ionicframework.com/docs/api/buttons), no exemplo abaixo estamos trabalhando com o evento **click** deles.

    <ion-button color="light" (click)="changeBgColor('primary')">BG Color: primary</ion-button>
    <ion-button color="light" (click)="changeBgColor('secondary')">BG Color: secondary</ion-button>
    <ion-button color="light" (click)="changeBgColor('tertiary')">BG Color: tertiary</ion-button>
    <ion-button color="light" (click)="changeBgColor('success')">BG: success</ion-button>
    <ion-button color="light" (click)="changeBgColor('warning')">BG: warning</ion-button>
    <ion-button color="light" (click)="changeBgColor('danger')">BG: danger</ion-button>
    <ion-button color="light" (click)="changeBgColor('medium')">BG: medium</ion-button>
    <ion-button color="light" (click)="changeBgColor('dark')">BG: dark</ion-button>
    <ion-button color="light" (click)="changeBgColor('light')">BG: light</ion-button>

### Menu select

    <ion-list >
        <ion-item [color]="selectColor">
          <ion-label>Selecione o tipo da lista</ion-label>
            <ion-select 
                (ionChange)="message('Valor alterado')" 
                (ionCancel)="message('Clicado no botão cancelar')"
                (ionBlur)="selectBlurFocus(true)"
                (ionFocus)="selectBlurFocus(false)"
                  cancelText="Cancel!"
                  okText="Confirm!"                   
                  [(ngModel)] = "selectInterface"             
                  [interface]="selectInterface"  
                  multiple="false"                             
                  >            
              <ion-select-option  value="alert">interface = 'alert'</ion-select-option>
              <ion-select-option  value="action-sheet">interface = 'action-sheet'</ion-select-option>
              <ion-select-option  value="popover">interface = 'popover'</ion-select-option>
              <ion-select-option  value="0" disabled="true">DISABLED</ion-select-option>
          </ion-select> 
        </ion-item>    
      </ion-list>

#### ion-label dentro do select
`<ion-label>Selecione o tipo da lista</ion-label>` => Esse componente adiciona uma label no select.

`(ionChange)` => Evento ativado quando é alterado o valor no componente.

`(ionCancel)` => Executa função que ocorre quando clica em cancelar.

`(ionBlur)` => Executa função que ocorre quando o componente perde o foco.

`(ionFocus)` => Executa função que ocorre quando o componente ganha foco.

`cancelText` => label do botão de cancelar.

`okText` => label do botão OK.

`interface` => Como o menu deve se comportar, ou seja se ele deve aparece como um modal `alert`, ou um pop up encima do elemento `popover`, ou se ele deve aparecer como um menu que aparece da parte inferior da aplicação `action-sheet`, o valor padrão se omitido é `alert`.

`multiple` => Se o select vai aceitar mais de um valor, por padrão é `false`

[Documentação sobre o ion-select](https://ionicframework.com/docs/api/select) e o [ion-option](https://ionicframework.com/docs/api/select-option), o ion-option aceita dois atributos, o primeiro se está desabilitado `<ion-select-option  value="0" disabled="true">DISABLED</ion-select-option>`, `false` para habilitado e `true` para desabilitado, padrão é false. Além disso tem o valor que é o valor da opção, no caso esse componente trabalha com o ngModel `[(ngModel)] = "selectInterface"  `, logo talvez seja necessário fazer a importação do módulo de formulário para permitir o **2 way databind**.

### Card

    <ion-card color="medium" button="true" href="https://github.com/cronos2277" target="_blank" type="button">
        <ion-card-header>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          <ion-card-title>Card Title</ion-card-title>
        </ion-card-header>
      
        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>

`<ion-card color="medium">` => Cria um card, tudo que for relativo ao card deve estar envolto dessa tag, a cor padrão é o branco, mas é possível mudar a cor como o indicado.

`button=true` => Faz com que o card se comporte como um botão e torna-se clicável.

`href` => Caso o card se torne um botão, ele irá a esse link quando for clicado.

`target` => o frame alvo, se colocado `_blank` abre em uma nova aba.

`type` => o Comportamento do botão caso habilitado, opções válidas: `button`, `reset`, `submit`

#### ion-card-header
Aqui informamos o cabeçalho do card, no caso ele pois dois children, o primeiro é o título `<ion-card-title>` e o segundo o subtítulo `<ion-card-subtitle>`, que permite uma ordenação do cabeçalho do card e aqui deve ficar o conteúdo do card `<ion-card-content>`.

#### ion-card-content
Aqui deve ficar o conteúdo do card.

[Documentação dos cards](https://ionicframework.com/docs/api/card)

### ion-badge

        <ion-item>
          <ion-badge slot="start">{{random}}</ion-badge>
          <ion-label>ion-Badge: numero randomico do componente</ion-label>
          <ion-badge slot="end" color="warning">{{random}}</ion-badge>
        </ion-item>

Esse componente coloca um retangulo com a cor informado envolta do valor, ele também interege com o `ion-label` caso colocando-os combinados se feito dentro de um `ion-iten`, documentação [ion-badge](https://ionicframework.com/docs/api/badge)

### Checkbox

    <ion-item  slot="end">
      <ion-label slot="start" color="primary">Checkbox</ion-label>
      <ion-checkbox 
            color="success" 
            slot="end"
            indeterminate="true"
            value="check"
            disabled = "false"
            checked = "false"
            (ionBlur) = "message('Blur no checkbox')"
            (ionChange) = "message('valor do checkbox alterado')"
            (ionFocus) = "message('Focus no checkbox')"
            ></ion-checkbox>
    </ion-item>

Inicialmente se você quiser colocar um texto em uma checkbox, você vai precisar de um label `<ion-label slot="start" color="primary">Checkbox</ion-label>` e claro ambos dentro de um `ion-item`

#### Eventos
O checkbox trata três eventos, o blur `(ionBlur)`, o focus `(ionFocus)` e o change `(ionChange)`.

`color` => A cor do checkbox.

`slot` => posição do checkbox dentro do `ion-item`.

`checked` => valor padrão para o checkbox, que deve ser booleano.

`indeterminate` => caso o valor do checkbox seja padrão, independete se é verdadeiro ou falso, sendo o valor padrão definido em `checked` ou falso caso seja omitido, ao renderizar o valor padrão será rederizado um traço ao invés de um check ou de deixa-lo em branco.

`value` => O valor da caixa de seleção não significa se ela está marcada ou não, use a propriedade marcada para isso. O valor de uma caixa de seleção é análogo ao valor de um `<input type = "checkbox">`, ele só é usado quando a caixa de seleção participa de um `<form>` nativo.

`disabled` => Se ativado, desativa o checkbox.

[Documentação checkbox](https://ionicframework.com/docs/api/checkbox)
### Chip

    <ion-item>

        <ion-chip>
          <ion-label>Default</ion-label>
        </ion-chip>

        <ion-chip color="secondary">
          <ion-label color="dark">Secondary w/ Dark label</ion-label>
        </ion-chip>
        
        <ion-chip [disabled]="true" color="secondary">
          <ion-label>Disabled Chip</ion-label>
        </ion-chip>

        <ion-chip color="secondary">
          <ion-icon name="heart" color="dark"></ion-icon>
          <ion-label>Default</ion-label>
        </ion-chip>
        
        <ion-chip color="secondary">
          <ion-label>Button Chip</ion-label>
          <ion-icon name="close-circle"></ion-icon>
        </ion-chip>

        <ion-chip color="secondary">
          <ion-avatar>
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-avatar>
          <ion-label>Avatar Chip</ion-label>
          <ion-icon name="close-circle"></ion-icon>
        </ion-chip>
      </ion-item>

#### Explicando
o `<ion-chip>` coloca um botão arrendondado que pode conter ícone, você pode usar em seu interior um label `<ion-label>`, icone `<ion-icon>`, ou até mesmo um avatar `ion-avatar`, [documentação](https://ionicframework.com/docs/api/chip)

  >Chips representam entidades complexas em pequenos blocos, como um contato. Um chip pode conter vários elementos diferentes, como avatares, texto e ícones.

`color` => define a dor de fundo.

`disabled` => desabilita o ion-chip.

### Ion-avatar
O `<ion-avatar>` carrega uma imagem e formata do avatar, o avatar funciona com base no e-mail ou até mesmo com base em algum token e com base nisso develve uma imagem salva do usuário.
