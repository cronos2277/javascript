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

[Documentação sobre o ion-select](https://ionicframework.com/docs/api/select) e o [ion-option](https://ionicframework.com/docs/api/select-option), o ion-option aceita dois atributos, o primeiro se está desabilitado `<ion-select-option  value="0" disabled="true">DISABLED</ion-select-option>`, `false` para habilitado e `true` para desabilitado, padrão é false. Além disso tem o valor que é o valor da opção, no caso esse componente trabalha com o ngModel `[(ngModel)] = "selectInterface"  `, logo talvez seja necessário fazer a importação do módulo de formulário para permitir o **2 way databind** e o value é apenas para setar um valor também.

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

### Input para data
O `ion-datetime` é uma forma de criar um input customizável para datas, [segue a documentação](https://ionicframework.com/docs/api/datetime)

#### Template

    <ion-datetime 
            displayFormat="DD/MMMM/YYYY - HH:mm" 
            [value]="agora" 
            cancelText="Cancel!" 
            doneText="Confirm"
            (ionChange)="message('data alterada')" 
            (ionCancel)="message('data no botão cancelar')"
            (ionBlur)="selectBlurFocus(true)"
            (ionFocus)="selectBlurFocus(false)"
    ></ion-datetime>

#### displayFormat
Aqui é informado a estrutura de como a data deve aparecer. `D` dia com um ou dois dígitos, `DD` data sempre com dois dígitos, dias menores que 10, tem o zero na frente, `DDD` dia da semana abreviado, tipo **tue**, **wed**, etc... `DDDD` dia da semana por extenso, tipo **monday**, **wednesday**, etc... A mesma lógica se aplica com o mês, sendo `M` ou `MM` para data numéricas e `MMM` e `MMMM` para meses por extenso, seguindo a mesma lógica dos dias. Nos anos temos `YY` para os dois ultimos dígitos, por exemplo **20** para *2020* e **19** para *2019*, com quatro dígitos de **Y** `YYYY` já pego o ano completo. Sobre horas e minutos, temos `HH` para horas de 24 horas e `hh` para horas com 12, nesse caso sempre com dois dígitos, e `H` e `h` com os zeros a esquerda omitidos, no caso dos minutos `m` minusculo, com apenas um **m** minúsculo o zero é omitido, com dois **m** minúsculo `mm` é com o zero a mostra, para horas com o padrão 12, você pode usar o `a` para indicar se é **pm** ou **am** ou `A` para **PM** e **AM**, você também pode usar o `Z` maíusculo mesmo, para indicar o timezone, além do `s` para segundo com o zero a esquerda omitido e o `ss` com o zero esquerdo a amostra para os segundos.

#### Atributos
`value` => insere um valor padrão para uma data.

`cancelText` => o texto do botão cancelar, quando o usuário for alterar a data.

`doneText` => o texto do botão done, quando o usuário for alterar a data.

#### Eventos
Esses métodos dispara os seguintes eventos: `(ionChange)`, `(ionCancel)`, `(ionBlur)` e `(ionFocus)`, para respectivamente tratar mudanças, o ato de cancelamento, o blur e o focus.

#### No arquivo TS

    public agora = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()       
    ).toDateString();

Caso esse valor seja para colocar valor padrão no `[value]="agora" ` precisa estar em formato de string, algo feito por esse método aqui `.toDateString();`. [Data](https://ionicframework.com/docs/api/datetime)

### input
[ion-input](https://ionicframework.com/docs/api/input)
#### Exemplo

    <ion-item color="dark">
        <ion-label>text</ion-label>
        <ion-input value="custom" color="primary" pattern="\D"></ion-input>
        <ion-label>Number</ion-label>
        <ion-input value="1" color="primary" type="number" step=3></ion-input>
        <ion-label>Password</ion-label>
        <ion-input value="custom" color="primary" type="password"></ion-input>
        <ion-label>Email</ion-label>
        <ion-input value="custom@custom.com" color="primary" type="email"></ion-input>
        <ion-label>Telefone</ion-label>
        <ion-input value="+55 330 123-1234" color="primary" type="tel"></ion-input>
      </ion-item>

`value` => impõe um valor padrão ao elemento.

`color` => define a cor do elemento.

`pattern` => regex que o elemento deve seguir no ato do submit.

`step` => incrementa e decrementa valor com base nesse step.

`type` => Aqui define o tipo de dados, que pode ser: email, telefone, password, etc...

### ion-toggle
Existe um botão toggle que pode ser usado `<ion-toggle color="danger" [checked]="toggle" (ionChange)="message('alterou o toggle')"></ion-toggle>`. [documentação](https://ionicframework.com/docs/api/toggle)
 
 `color` => a cor para o toggle quando ativado.

 `check` => indica se por padrão o toggle fica ativado ou não, no caso está sendo interpolado a variável toggle.

 ### Radio Button

    <ion-radio-group slot="start" [(ngModel)]="radio" (ionChange)="message('radio mudança')" allowEmptySelection="true" >
        <ion-list-header>
          <ion-label>
            Radio Button
          </ion-label>
        </ion-list-header>
    
        <ion-item>
          <ion-label>Cord</ion-label>
          <ion-radio value="cord"></ion-radio>
        </ion-item>
    
        <ion-item>
          <ion-label>Duesenberg</ion-label>
          <ion-radio value="duesenberg"></ion-radio>
        </ion-item>
    
        <ion-item>
          <ion-label>Hudson</ion-label>
          <ion-radio value="hudson"></ion-radio>
        </ion-item>        
    </ion-radio-group>       

#### ion-radio-group 
Os radio buttons deve estar dentro de um grupo `<ion-radio-group slot="start" [(ngModel)]="radio" (ionChange)="message('radio mudança')" allowEmptySelection="true">`, essa propriedade `allowEmptySelection` permite ou não de acordo com o valor booleano se o campo é obrigatório. *True* significa que preencher isso é opcional. [Documentação](https://ionicframework.com/docs/api/radio-group).

#### ion-radio

    <ion-item>
        <ion-label>Valor 1</ion-label>
        <ion-radio value="valor1"></ion-radio>
    </ion-item>

Esse renderiza o campo de radio `<ion-radio value="valor1">`, no caso esse valor é passado aqui `[(ngModel)]="radio"`, ou seja você passa o valor do radio para o `ion-radio-group`, [segue a documentação](https://ionicframework.com/docs/api/radio).

### ion-range
Também existe componentes de range no Ionic, [documentação](https://ionicframework.com/docs/api/range)

    <ion-range color="danger" pin="true">
    </ion-range>

      <ion-range 
        dualKnobs="true"
        min="21" 
        max="72" 
        step="3" 
        value="30,60"
        snaps="true">
      </ion-range>

        <ion-range 
          min="1000" 
          max="2000"
          step="100"
          snaps="true"
          ticks="false"
          color="secondary">
        </ion-range>

          <ion-range min="20" max="80" step="2">
            <ion-icon size="small" slot="start" name="sunny"></ion-icon>
            <ion-icon slot="end" name="sunny"></ion-icon>
          </ion-range>

`pin` => Essa propriedade `pin` se verdadeiro, ele exibe o valor quando o usuário arrasta o indicador, ou seja no evento de drag o valor do desse range é exibido.

`min` => o valor mínimo aceito.

`max` => o valor step aceito.

`step` => define o valor a ser somado ou subtraído para incremento ou decremento.

`ticks` => funciona com base no `step`, se verdadeiro ele exibe um risco na linha para cada valor marcado pelo `step`, por exemplo se o `min` for zero e o `max` for 10, e o `step` for 2, nesse exemplo todos os valores pares na barra estaria marcados com um risquinho vertical.

`snaps` => Permite ou não selecionar valores que não são multiplos do step. No exemplo de um `min` com zero e `max` com 10 e um `step` com base em 2, se o valor do snaps for true permite-se selecionar um valor impar, se não apenas os valores multiplos do step, nesse caso os pares.

`dualKnobs` => se o valor for true, ele permite selecionar um intervalo de valores, ao invés de selecionar um único valor. A extrema esquerda irá ter um indicador e na extrema direita também e os valores são todos que estiverem nesse range, e essa é uma forma de determinar o range padrão `value="30,60"`.

#### Icones

    <ion-range min="20" max="80" step="2">
        <ion-icon size="small" slot="start" name="sunny"></ion-icon>
        <ion-icon slot="end" name="sunny"></ion-icon>
    </ion-range>

Você também pode colocar ícones no range, no caso o ícone com slot start fica a esquerda `<ion-icon size="small" slot="start" name="sunny">` e o ícone com o slot end fica a direita `<ion-icon slot="end" name="sunny">`.

### Ion-segment

    <ion-segment (ionChange)="segmentChanged($event)" color="warning">
      <ion-segment-button value="friends">
        <ion-label>Friends</ion-label>
      </ion-segment-button>
      <ion-segment-button value="enemies" disabled="true">
        <ion-label>Enemies</ion-label>
      </ion-segment-button>
      <ion-segment-button value="sunny">
        <ion-label>Sunny</ion-label>
        <ion-icon name="sunny"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="rainy">
        <ion-label>Rainy</ion-label>
        <ion-icon name="rainy"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="dogs" layout="icon-end">
        <ion-icon name="star"></ion-icon>
        <ion-label>Dogs</ion-label>
      </ion-segment-button>
      <ion-segment-button value="cats">
        <ion-label>Cats</ion-label>
      </ion-segment-button>
    </ion-segment>

#### ion-segment
O Ion-segment é um container de segments que cria uma linha de botões que quando executado executam uma função, segue a documentação do [ion-segments](https://ionicframework.com/docs/api/segment), esse container `ion-segments` pode passar o valor do botão clicado para dentro do evento, ou seja com o ion-segment seria uma espécie de container de botões, que quando clicados mudam o valor do container `ion-segments`.

#### ion-segment-button
Aqui vai a configuração do botão, [documentação](https://ionicframework.com/docs/api/segment-button)

`value` => Aqui você define o valor do botão.

`layout` => A posição do ícone se houver.

`disabled` => Se verdadeiro, o usuário não pode clicar no botão.

`type` => pode ser `reset`, `submit` ou até mesmo `button`, nesse caso você define o comportamento do botão.

### ion-text

    <ion-text color="tertiary">
      <h3>H3: The quick brown fox jumps over the lazy dog</h3>
    </ion-text>

Dessa forma você coloca um texto mais customizável no texto: `<ion-text color="tertiary">`, [ion-text](https://ionicframework.com/docs/api/text).

### ion-fab - Botão flutuante

    <ion-fab vertical="top" horizontal="center" >
      <ion-fab-button>
        <ion-fab-button 
          type="button"      
          (ionBlur)='message($event)'
          (ionFocus)='message($event)'
      >
      </ion-fab-button>
    </ion-fab>

[Documentação](https://ionicframework.com/docs/api/fab) no caso esse botão fica na tela flutuando e acompanhando o usuário, dois campos são obrigatórios para `ion-fab`.

`vertical` => define a posição vertical do botão, podendo ser: `"bottom" | "center" | "top" | undefined`, esse atributo especifica a posição vertical desse botão.

`horizontal` => define a posição horizontal desse botão, podendo ser: `"center" | "end" | "start" | undefined`, **start** é a esquerda e **end** é a posição direita.

#### ion-fab-button
Esse botão tem o evento de blur e focus, além disso ele tem os mesmos atributos que os botões [segue a documentação](https://ionicframework.com/docs/api/fab-button), `type` pode ser `reset`, `submit` e `button` e tem as mesmas propriedades que os outros itens clicáveis.

### ion-searchbar

    <ion-searchbar color="medium" 
        (ionBlur)="search($event)"
        (ionCancel)="search($event)"
        (ionChange)="search($event)"
        (ionClear)="search($event)"
        (ionFocus)="search($event)"
        (ionInput)="search($event)" ></ion-searchbar>

Cria uma barra de pesquisa no site, dentro do elemento que você criou [Documentação](https://ionicframework.com/docs/api/searchbar)

## Eventos do Ionic
Todos os eventos Ion geram um objeto do tipo `CustomEvent`, segue um exemplo da estrutura:

    CustomEvent {isTrusted: false, detail: null, type: "ionFocus", target: ion-searchbar.sc-ion-searchbar-md-h.sc-ion-searchbar-md-s.ion-color.ion-color-medium.md.searchbar-l…, currentTarget: ion-searchbar.sc-ion-searchbar-md-h.sc-ion-searchbar-md-s.ion-color.ion-color-medium.md.searchbar-l…, …}
    bubbles: true
    cancelBubble: false
    cancelable: true
    composed: true
    currentTarget: null
    defaultPrevented: false
    detail: null
    eventPhase: 0
    isTrusted: false
    path: (17) [ion-searchbar.sc-ion-searchbar-md-h.sc-ion-searchbar-md-s.ion-color.ion-color-medium.md.searchbar-l…, slot, div.toolbar-content, div.toolbar-container, document-fragment, ion-toolbar.md.in-toolbar.hydrated.toolbar-searchbar, ion-footer.md.footer-md.hydrated, app-home.ion-page, slot, document-fragment, ion-router-outlet#menu.menu-content.menu-content-overlay.hydrated, ion-app.md.ion-page.hydrated, app-root, body, html.plt-desktop.md.hydrated, document, Window]
    returnValue: true
    srcElement: ion-searchbar.sc-ion-searchbar-md-h.sc-ion-searchbar-md-s.ion-color.ion-color-medium.md.searchbar-left-aligned.hydrated
    target: ion-searchbar.sc-ion-searchbar-md-h.sc-ion-searchbar-md-s.ion-color.ion-color-medium.md.searchbar-left-aligned.hydrated
    timeStamp: 13191.10499999988
    type: "ionFocus"
    __proto__: CustomEvent

Com base nesse valor você faz a manipulação dos eventos, no caso ` type: "ionFocus"` com base no type você consegue descobrir a origem do evento, dentro do `detail.value`, você resgata o valor informado ou produzido pelo cliente, seja um input ou algo que ele selecionou, no caso dentro do atributo `detail` tem um subatributo `value` e nesse atributo `value` está o valor gerado pelo cliente, Nesse exemplo o detail está nulo: `detail: null`. Esse padrão acontece em, qualquer evento com **ion** na frente, como: `(ionBlur), (ionCancel), (ionChange), (ionClear), (ionFocus), (ionInput)`.

## ngModel
Sempre que você quiser usar o **2 way data bind** você deve usar isso, o value serve apenas para passar um valor padrão ao componente, seja no Angular, seja no Ionic com angular, caso você crie uma pagina com o ionic cli, você não terá problemas em trabalhar como o ngModel, mas lembre-se o `[value]` não opera como 2way data bind, mas o `[(ngModel)]` sim.

## Sistema de Grid
### Exemplo Básico com 12 colunas

    <ion-grid>
      <ion-row>
        <ion-col><div>01</div></ion-col>
        <ion-col><div>02</div></ion-col>
        <ion-col><div>03</div></ion-col>
        <ion-col><div>04</div></ion-col>
        <ion-col><div>05</div></ion-col>
        <ion-col><div>06</div></ion-col>
        <ion-col><div>07</div></ion-col>
        <ion-col><div>08</div></ion-col>
        <ion-col><div>09</div></ion-col>
        <ion-col><div>10</div></ion-col>
        <ion-col><div>11</div></ion-col>
        <ion-col><div>12</div></ion-col>
      </ion-row>
    </ion-grid>

Aqui temos um exemplo de como funciona o sistema de grid, funciona como no bootstrap isso, no caso você tem essa tag para a criação de grid `<ion-grid>`, e então você tem uma tag para linhas `<ion-row>` e essa tag para colunas `<ion-col>`.

### Exemplo com 4 colunas de tamanhos diferentes

    <ion-grid>
      <ion-rows>
        <ion-col size="4"><div>Horizontal 1 of 4</div></ion-col>
        <ion-col size="2"><div>Horizontal 2 of 4</div></ion-col>
        <ion-col size="2"><div>Horizontal 3 of 4</div></ion-col>
        <ion-col size="4"><div>Horizontal 4 of 4</div></ion-col>
      </ion-rows>
    </ion-grid>

Através desse atributo `size=` você consegue fazer com que uma determinada coluna ocupe mais espaço, nesse exemplo o `size="4"` ocupa o espaço de 4 colunas e esta `size="2"` apenas duas colunas.

### Exemplo que ocupa toda o espaço horizontal

    <ion-grid>
      <ion-row>
        <ion-col size="12"><div>Vertical 1 of 4</div></ion-col>
        <ion-col size="12"><div>Vertical 2 of 4</div></ion-col>
        <ion-col size="12"><div>Vertical 3 of 4</div></ion-col>
        <ion-col size="12"><div>Vertical 4 of 4</div></ion-col>
      </ion-row>
    </ion-grid>

Nesse caso como o grid é com 12 colunas, logo quando se informa `size="12"`, basicamente faz com que se ocupe toda a linha.

### Alinhamento horizontal das colunas

    <ion-grid>
      <ion-row>
          <ion-col class="ion-align-self-start"><div>class="ion-align-self-start"</div></ion-col>
          <ion-col class="ion-align-self-center"><div>class="ion-align-self-center"</div></ion-col>
          <ion-col class="ion-align-self-end"><div>class="ion-align-self-end"</div></ion-col>    
          <ion-col>
            <div>           
              TOP <br>
              MIDDLE <br>
              BUTTON
            </div>
          </ion-col>    
      </ion-row>
    </ion-grid>

`class="ion-align-self-start"` => alinhas o **eixo Y** da coluna ao topo, a classe vai na coluna, vai em `ion-col`.

`class="ion-align-self-center"` => alinhas o **eixo Y** da coluna ao centro, a classe vai na coluna, vai em `ion-col`.

`class="ion-align-self-end"` => alinhas o **eixo Y** da coluna abaixo, a classe vai na coluna, vai em `ion-col`.

### Alinhamento vertical das colunas

    <ion-grid class="bg5">

        <ion-row class="ion-justify-content-start">
          <ion-col size="3"><div>class="ion-justify-content-start"</div></ion-col>
          <ion-col size="3"><div>class="ion-justify-content-start"</div></ion-col>
        </ion-row>
    
        <ion-row class="ion-justify-content-center">
          <ion-col size="3"><div>class="ion-justify-content-center"</div></ion-col>
          <ion-col size="3"><div>class="ion-justify-content-center"</div></ion-col>
        </ion-row>
    
        <ion-row class="ion-justify-content-end">
          <ion-col size="3"><div>class="ion-justify-content-end"</div></ion-col>
          <ion-col size="3"><div>class="ion-justify-content-end"</div></ion-col>
        </ion-row>
    
        <ion-row class="ion-justify-content-around">
          <ion-col size="2"><div>class="ion-justify-content-around"</div></ion-col>
          <ion-col size="2"><div>class="ion-justify-content-around"</div></ion-col>
          <ion-col size="2"><div>class="ion-justify-content-around"</div></ion-col>
        </ion-row>
    
        <ion-row class="ion-justify-content-between">
          <ion-col size="2"><div>class="ion-justify-content-between"</div></ion-col>
          <ion-col size="2"><div>class="ion-justify-content-between"</div></ion-col>
          <ion-col size="2"><div>class="ion-justify-content-between"</div></ion-col>
        </ion-row>
    </ion-grid>

`class="ion-justify-content-start"` => Renderiza as colunas da esquerda para a direita, essa classe deve ir nos `ion-row`.

`class="ion-justify-content-center"` => Centraliza as colunas no centro, essa classe deve ir nos `ion-row`.

`class="ion-justify-content-end"` => Renderiza as colunas da direita para a esquerda, essa classe deve ir nos `ion-row`.

`class="ion-justify-content-around"` => Centraliza as colunas, porém distribui as colunas vazias entre as colunas renderizadas, ou seja caso tenha apenas 3 colunas a primeira é renderizada na esquerda na posição 1, a segunda na direita na posição 12 e a terceira na esquerda na posição 6, e assim vai, sempre na sequência esquerda, direita e centro. Porém essa estratégia deixa uma margem nas extremidades

`class="ion-justify-content-between"` => Centraliza as colunas vazias e renderiza as colunas nas beiradas, ou seja caso tenha apenas 3 colunas a primeira é renderizada na esquerda na posição 1, a segunda na direita na posição 12 e a terceira na esquerda na posição 6, e assim vai, sempre na sequência esquerda, direita e centro, sem deixar margem nas extremidades.

### offset

    <ion-grid class="bg6">
        <ion-row>
          <ion-col>1</ion-col>
          <ion-col offset="3">2</ion-col>
          <ion-col>3</ion-col>        
        </ion-row>
      </ion-grid>

O *offset* permite dar um espaço em branco entre os elementos, no caso antes dessa coluna `<ion-col offset="3">2</ion-col>` e após essa `<ion-col>1</ion-col>`, existirá um espaço em branco, lembre-se que o *offset* sempre opera a esquerda do elemento, ou seja é o espaço entre ela e o componente anterior, sendo no primeiro o *offset* o primeiro componente ocupa o segundo espaço.

### Mais
Além disso isso foi o grid básico, também tem o grid customizável para tamanho dos dispositivos, que pode ser consultado na:

[GRID](https://ionicframework.com/docs/api/grid)

[Row](https://ionicframework.com/docs/api/row)

[col](https://ionicframework.com/docs/api/col)

## Mensagens no Ionic

### Alert
Essa funcionalidade vem do objeto `AlertController` que é oriundo de `import { AlertController } from '@ionic/angular';`, você pode acompanhar na documentação do [alert](https://ionicframework.com/docs/api/alert)
#### Exemplo Simples
##### Template
    <ion-button (click)="presentAlert()">Alert</ion-button>

##### Arquivo TS

    async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      });

      await alert.present();
    }

##### Exemplicando
Primeiramente, aqui estamos trabalhando com promise e isso fica bem claro aqui `async presentAlert()`, caso a execução do método não seja de forma sincrona, a mensagem pode não esperar por uma resposta do usuário e devido a isso `await alert.present();`. O método create desse objeto cria um popup modal e o mesmo aceita um objeto como parametro como visto abaixo:

    {
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    }

`cssClass` => aqui você pode colocar uma classe para fazer uma customização do modal.

`header` => título da modal.

`subHeader` => subtítulo do modal.

`message` => a mensagem que deve ser exibido ao usuário.

`buttons` => Aqui você passa um array de botões para a modal, o primeiro seria o botão de **OK** o padrão é **Done**, porém é possível adicionar mais botões e esses outros botões seguem uma estrutura diferente de uma simples string como esse, no caso se tiver apenas um botão de ok, pode-se usar uma estrutura como essa: `buttons: ['OK']`, você até pode colocar mais botões `['Cancel', 'Open Modal', 'Delete']`, porém dessa forma todos eles terão o mesmo comportamento padrão, exceto se houver uma callback associado a eles, e então dessa forma o comportamento é o de executar a callback, como não é esse caso `['Cancel', 'Open Modal', 'Delete']`.

#### Modal com botões customizáveis

    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Message <strong>text</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });

      await alert.present();
    }

##### a diferença está aqui:

    buttons: 
      [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]

##### Explicando
Além de uma string, você pode passar um objeto com as configurações aos botões customizáveis, no caso `buttons:[{text,role,cssClass,handler}]`.

`text` => label do botão.

`role` => aplica uma regra ao botão, no exemplo que é usado ao clicar no botão ele gera eventos para cancelamento, como nesse caso `role: 'cancel'`

`cssClass` => Classe que o botão deve ter, no caso é possível especificar uma classe para o botão.

`handler` => Aqui a callback a ser executado, quando o usuário clicar nesse botão, nesse exemplo é impresso uma mensagem no console do navegador.

#### Exemplo mais complexo, modal com formulário

    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Prompt!',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Placeholder 1',          
          },        
          // multiline input.
          {
            name: 'paragraph',
            id: 'paragraph',
            type: 'textarea',
            placeholder: 'Placeholder 3'
          },        
          {
            name: 'day',
            type: 'date',
            min: '2020-01-01',
            max: '2030-31-12'
          },        
          {
            name: 'value',
            type: 'number',
            min: -10,
            max: 10
          },        
          {
            name: 'pass',
            type: 'password',
            placeholder: 'Advanced Attributes',
            cssClass: 'specialClass',
            attributes: {
              maxlength: 4,
              inputmode: 'decimal'
            }
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (data) => {
              console.log('Confirm Cancel');
              console.log(data);
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok:');   
              console.log(data);
            }
          }
        ]
      });
      
      await alert.present();
    }

##### inputs
Nesse exemplo temos um **input**, que permite extrair dados do usuário por meio de um formulário dentro da modal.

    inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Placeholder 1',          
          }
    ] 

`name` => o nome do atributo, no caso esse atributo é obrigatório, ao submit desse formulário a variavel com o nome em base do name, vai receber o valor inserido.

`type` => aqui temos o tipo de input, que pode ser `text`, `checkbox`, `radio`, etc...

`placeholder` => O texto a ser exibido quando o campo estiver em branco.

    inputs:[
      {
              name: 'day',
              type: 'date',
              min: '2020-01-01',
              max: '2030-31-12'
            },        
            {
              name: 'value',
              type: 'number',
              min: -10,
              max: 10
            },       
    ]

No caso de números e datas você pode definir um valor máximo e mínimo respectivamente com `min` e `max`, segue a mesma lógica que o de um input normal, ou seja um checkbox tem a propriedade `checked` que aceita um booleano, esse number também aceitaria um `step`, enfim...

    {
      name: 'pass',
      type: 'password',
      placeholder: 'Advanced Attributes',
      cssClass: 'specialClass',
      attributes: {
        maxlength: 4,
        inputmode: 'decimal'
      }
    }

`cssClass` => Classe CSS para customizar o input.

`attributes` => Aqui você adiciona atributos avançados ao input.

##### Depois de preenchido...
    buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (data) => {
                console.log('Confirm Cancel');
                console.log(data);
              }
            }, {
              text: 'Ok',
              handler: (data) => {
                console.log('Confirm Ok:');   
                console.log(data);
              }
            }
          ]

Depois de preenchido você pode usar a callback do botão para resgatar o valor, nesse caso devido a callback ser:

###### para botão cancel

    handler: (data) => {
      console.log('Confirm Cancel');
      console.log(data);
    }

###### para botão OK

    handler: (data) => {
      console.log('Confirm Ok:');   
      console.log(data);
    }

##### Exemplo de conteúdo da variável data da callback handler do botão OK
    {name: "asas", paragraph: "asas", day: "", value: "", pass: ""}

Ou seja é na callback de `handler` dentro de cada `buttons[]` que você trata os dados inseridos pelo usuário no formulário da Modal, no caso do cancel os dados não são enviados para o data devido a essa regra `role: 'cancel'` que está setada no botão de cancelamento, logo ai está a importancia dela, esse `role` auxilia no tratamento de dados e sendo que o `role: 'cancel'` gera um *undefined* para o data ao invés de enviar um array como o de cima. Cada atributo desse array é definido com base nesse valor `name`, como por exemplo `name: 'name'` ou `name:paragraph` lá na [definição dos inputs](#exemplo-mais-complexo-modal-com-formulário), para acessar a [documentação](https://ionicframework.com/docs/api/alert#inputs)