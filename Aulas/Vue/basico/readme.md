# Vue
## Exemplo Básico
[Arquivo](exemplo1.html)

importando CDN de: ` <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>`

    <script>
        const vue = new Vue(
            {
                el: "#basico"
            }
        );
        console.log(vue);    
    </script>

### Atributo el
Você pode instanciar o vue conforme definido aqui `const vue = new Vue`, para isso você deve passar um objeto e esse objeto deve ter no minímo o atributo `el` definido, con forme visto aqui `{ el: "#basico"}`, nesse atributo você define o componente raiz da aplicação, seria o equivalente ao `<app>` do Angular ou o `<div id="app">` do react, no caso o `el` na prática tem a mesma finalidade do `ReactDOM.render`. Nesse atributo você passar, seguindo a lógica do `document.querySelector`, ou seja *#* para id, ponto para classe, e por ai vai... e com base nisso o vue vai procurar por esse componente e fazer os devídos processamentos.

### Atributo Data

        <body>
            <main>
                <div id="basico" >
                    <h1>{{header}}</h1>
                    <hr />
                    <h2>{{content}}</h2>
                </div>
            </main>
            <script>
                const vue = new Vue(
                    {
                        el: "#basico",
                        data:{
                            header:'Exemplo de Título',
                            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                        }
                    }
                );              
            </script>
    </body>

Seguindo a lógica do Angular todos os valores dentro do *double mustache*, ou seja os valores entre `{{}}` serão interpretados pelo `vue`, dentro do data você deve declarar as variáveis a ser interpolado. no caso o `{{header}}` será substituído por `Exemplo de Título` e `{{content}}` por `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, conforme definido abaixo:

    data:{
            header:'Exemplo de Título',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }

### Ciclo de vida do Vue
[Arquivo 2](exemplo2.html)

    <script>
        const vue = new Vue(
            {
                el: "#basico",
                data:{
                    header:'Exemplo de Título',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    text:'Valor inicial'
                },

                beforeCreate: () => console.log('%cbeforeCreate',"font-size:14px;background-color:blue;color:white;padding:10px"),
                created: () => console.log('%ccreated',"font-size:14px;background-color:red;color:white;padding:10px"),
                beforeMount: () => console.log('%cbeforeMount',"font-size:14px;background-color:green;color:white;padding:10px"),
                mounted: () => console.log('%cmounted',"font-size:14px;background-color:yellow;color:black;padding:10px"),
                beforeUpdate: () => console.log('%cbeforeUpdate',"font-size:14px;background-color:black;color:white;padding:10px"),
                updated: () => console.log('%cupdated',"font-size:14px;background-color:darkgray;color:white;padding:10px"),
                beforeDestroy: () => console.log('%cbeforeDestroy',"font-size:14px;background-color:pink;color:black;padding:10px"),
                destroyed: () => console.log('%cdestroyed',"font-size:14px;background-color:cyan;color:black;padding:10px"),
            }
        );    
    
        setTimeout(function(){
            console.log("\nAlterando valor");
            vue._data.text = "valor alterado";
        },2000);

        setTimeout(function(){
            console.log("\nDestruindo objeto");
            vue.$destroy();
        },5000);
    </script>

#### Explicando o ciclo de vida do Vue
`beforeCreate:` **=>** Após iniciar os eventos e o ciclo de vida

`created:` **=>** Após o início da reatividade no Vue

`beforeMount:` **=>** Após ter compilado o template

`mounted:` **=>** Depois do elemento **vm.$elestar** montado

`beforeUpdate:` **=>** Antes de alguma alteração de data

`updated:` **=>** Depois da alteração de alguma data

`beforeDestroy:` **=>** Quando o **vm.$destroy()** é chamado

`destroyed:` **=>** Quando o componente remove watchers, componentes filhos, e event listeners e é destruído.

[Artigo referência: 2. Ciclo de Vida da Instância Vue (Introdução ao Vue.js)](https://medium.com/rgblog/2-ciclo-de-vida-da-inst%C3%A2ncia-vue-8c231551d471)

#### A função que ativa o beforeUpdate e updated
    setTimeout(function(){
        console.log("\nAlterando valor");
        vue._data.text = "valor alterado";
    },2000);

Repare que foi acessado o valor usando o `vue._data.text`, mas valores dentro do atributo *data* pode ser acessado diretamente através da instancia, por exemplo um `vue._data.text` poderia ser também acessado da seguinte forma: `vue.text`.

#### A função que ativa o beforeDestroy e destroyed
    setTimeout(function(){
        console.log("\nDestruindo objeto");
        vue.$destroy();
    },5000);

Com essa função você pode destruir o objeto criado e com isso ativar os eventos de destruição.
### Diretivas Básicas

     <body>
        <main>
            <!-- v-html -->
            <div v-html="title"></div>

            <!-- if, else, else if -->
            <span v-if="number < 4">IF: {{number}}</span>
            <span v-else-if="number > 3 && number < 7">Else If: {{number}}</span>
            <span v-else="number > 7">Else: {{number}}</span>
            
            <!-- v-bind -->
            <h2 :class="style" v-bind:id="id">{{random}}</h2>

            <!-- v-for -->
            <ul>
                <li v-for="(item,index) in list">{{index}} - {{item}}</li>
            </ul>

            <!-- v-show -->
            <h3 v-show="number % 2 == 0">Exibindo o v-show</h3>
        </main>
        <script>
            const vue = new Vue({
                el:'main',
                data:{
                    title:'<h1>Segundo Exemplo diretivas básicas</h1><hr />',
                    number:parseInt(Math.random() * 10),
                    random: Math.random() * 100,
                    style:'red',
                    id:"bck",
                    list:['item1','item2','item3','item4']
                }
            });

            console.log(vue.list);
        </script>
    </body>

Conforme explicado acima você pode acessar valores dentro do data, no caso esse `list:['item1','item2','item3','item4']` está sendo acessado aqui `console.log(vue.list);`

#### v-html

    <!-- v-html -->
    <div v-html="title"></div>

Nesse exemplo o `v-html` vai colocar o conteúdo da variável dentro da div `<div v-html="title"></div>`. No caso o que o `v-html` pega a variável de dentro do data com o nome *title*, no caso essa `title:'<h1>Segundo Exemplo diretivas básicas</h1><hr />',` processa e joga dentro `<div v-html="title"></div>`, ficando: `<div><h1>Segundo Exemplo diretivas básicas</h1><hr></div>`, nesse exemplo.

#### desvio condicional

     <!-- if, else, else if -->
    <span v-if="number < 4">IF: {{number}}</span>
    <span v-else-if="number > 3 && number < 7">Else If: {{number}}</span>
    <span v-else="number > 7">Else: {{number}}</span>

`v-if` renderiza o componente se a expressão dentro da string for verdadeira, `v-else-if` não é obrigatório o seu uso, mas deve ficar entre o `v-if` e o `v-else`, se no caso o `v-if` for falso, será testado o `v-else-if` e caso seja falso prossegue ao `v-else`. `v-else` é acionado quando as strings do `v-if` e o `v-else-if` são ambos falsos. O `v-else-if` e o `v-else` devem ser irmãos diretos do elemento que contém o `v-if`, lembrando que a variável `number` vem de:

    const vue = new Vue({
        el:'main',
        data:{
            title:'<h1>Segundo Exemplo diretivas básicas</h1><hr />',
            number:parseInt(Math.random() * 10),
            random: Math.random() * 100,
            style:'red',
            id:"bck",
            list:['item1','item2','item3','item4']
        }
    });

#### Bind

    <!-- v-bind -->
    <h2 :class="style" v-bind:id="id">{{random}}</h2>

O `v-bind` pode ser abreviado `:`, ou seja `:class="style" v-bind:id="id"` em ambas as situações estão usando os o *bind*. Quando se trata se atributos deve-se evitar de usar `{{}}`, ao invés disso deve-se uar o `v-bind`, ou seja isso está errado `<h2 class="{{style}}" id="{{id}}">` e fazer uso disso `<h2 :class="style" v-bind:id="id">`, não deve-se usar double mustache para atributos e é por isso que usa o binding. Ambas as variáveis vê daqui:

    data:{
        title:'<h1>Segundo Exemplo diretivas básicas</h1><hr />',
        number:parseInt(Math.random() * 10),
        random: Math.random() * 100,
        style:'red',
        id:"bck",
        list:['item1','item2','item3','item4']
    }

#### v-show

    <!-- v-show -->
    <h3 v-show="number % 2 == 0">Exibindo o v-show</h3>

o `v-show` funciona de maneira semelhante ao `v-if`, porém ao invés de não renderizar o componente quando a expressão é falsa, como é o caso do `v-if` o `v-show` seta quando falso a propriedade display do componente para none, ou seja o componente mesmo quando falso é renderizado, mas não fica visível.

#### Criando lista
##### v-for
    <!-- v-for -->
    <ul>
        <li v-for="(item,index) in list">{{index}} - {{item}}</li>
    </ul>

##### arquivo de lista dentro de data
    list:['item1','item2','item3','item4']

O `v-for` é um laço de repetição cuja a sintaxe pode ser `[variavelInterpolavel] in [suaLista]` e com base nisso você consegue interpolar como no *foreach*.

## Eventos
[Arquivo](eventos.html)

    <main>
        <h1>{{message}}</h1>
        <h2>Contador {{count}}</h2>
        <hr>
        <button v-on:click="inc">Incrementar</button>
        <button @click="dec">Incrementar</button>
        <label for="sum">
            Somar
            <input id="sum" type="number" v-on:change="sum($event.target.value)" :value="count"/>
        </label>
        <label for="sub">
            Subtrair
            <input type="number" @change="sub($event.target.value)" :value="count"/>
        </label>
    </main>
    <script>
        const vue = new Vue({
            el:"main",
            data:{
                message:"texto a ser exibido",
                count:0
            },
            methods:{
                inc: function(){this.count++},
                dec: function(){this.count--},
                sum: function(e){this.count += parseInt(e)},
                sub: function(e){this.count -= parseInt(e)},
                
            }
        });
    </script>

### v-on

    <button v-on:click="inc">Incrementar</button>
    <button @click="dec">Incrementar</button>
    <label for="sum">
        Somar
        <input id="sum" type="number" v-on:change="sum($event.target.value)" :value="count"/>
    </label>
    <label for="sub">
        Subtrair
        <input type="number" @change="sub($event.target.value)" :value="count"/>
    </label>

Caso você queira fazer uso de algum evento do javascript, você deve seguir a seguinte estrutura, por exemplo a `onclick`, você basicamente coloca o `v-on` na frente ou o `@` e depois segue com o nome do evento como `click` ou `change`, ficando `v-on:click` a forma extensa e `@click` e forma abreviada. No caso você pode passar a função como referência caso não tenha parametro, como no caso `v-on:click="inc"` ou `@click="dec"` e envocando a função na string caso precise passar o valor `v-on:change="sum($event.target.value)"` ou `@change="sub($event.target.value)"`, enfim passe por referência quando não houver argumentos na função a invoque-a quando precisar passar parametros, no caso segue a função *inc*, *dec*, *sum*, *sub* abaixo, dentro do atributos **methods**:

    const vue = new Vue({
            el:"main",
            data:{
                message:"texto a ser exibido",
                count:0
            },
            methods:{
                inc: function(){this.count++},
                dec: function(){this.count--},
                sum: function(e){this.count += parseInt(e)},
                sub: function(e){this.count -= parseInt(e)},
                
            }
        });

### Methods
Tudo que estiver dentro de *data* se torna um atributo e pode ser acessado de maneira direta como um atributo, como por exemplo os valores de data poderiam ser acessados nesse exemplo dessa forma:`vue.message` e `vue.count`, a mesma lógica funciona com o `methods` porém aqui é aonde fica os métodos a serem envocados e nesse exemplo ficaria `vue.inc()` ou `vue.dec()`, ou seja tudo que está em methods pode ser envocado e se torna método da instância de vue.

#### Evite arrow functions dentro de Methods.
As funções arrows amarram o *this* e devido a isso o método deixa de funcionar, logo toda vez que for passar uma função no atributo `methods`, deve-se usar a sintaxe padrão e não a arrow.

### Emitindo eventos

    <script>
        const vue = new Vue({
            el:"main",
            data:{
                message:"texto a ser exibido",
                count:0
            },
            methods:{
                inc: function(){this.count++},
                dec: function(){this.count--},
                sum: function(e){this.count += parseInt(e)},
                sub: function(e){this.count -= parseInt(e)},
                
            }
        });

        vue.$on('somar',vue.inc);
        vue.$once('subtrair',vue.sub);

        setTimeout(function(){
            console.log('Somando...');
            vue.$emit('somar');
            vue.$off('somar');            
            console.log('subtraindo...');
            vue.$emit('subtrair',2);
        },3000)
    </script>

Toda a instancia de `vue` possui esses métodos e podem ser acessados, o método `.$on` ele faz com que o vue possa escutar eventos emitido pelo método `.$emit`, conforme feito aqui, aonde o vue passa a ouvir um evento *somar* `vue.$on('somar',vue.inc);`, que quando emitido `vue.$emit('somar');` dispara o evento relacionado ao *somar* nesse caso. O método `.$once` ouve o evento e depois de escutar uma única vez ele deixa de ouvir, ou seja, o evento é escutado apenas uma vez, ao passo que os eventos registrados no método `.$on` eles irão sempre escutar, enquanto não for chamado o `.$off`, esse serve para fazer com que eventos não sejam mais escutados. Outra coisa, no caso essa função aqui tem parametros `vue.$once('subtrair',vue.sub);` uma vez que esse método faz referência a esse `sub: function(e){this.count -= parseInt(e)},`, logo os parametros passados do segundo argumento adiante, como feito aqui `vue.$emit('subtrair',2);`. Lembre-se que usar o `.$off` em eventos criados com `.$on` e que isso não se faz necessário para eventos criados com `.$once` e que esses métodos sempre têm o *$* na frente no nome, ou seja ` $on `, `$off`, `$emit`, `$once`.

### Filtros
[arquivo](filtros.html)

    <body>
        <div main>
            <h1>{{message | upper}}</h1>
        </div>
        <script>
            Vue.filter('upper', e => e.toUpperCase())
            const vue = new Vue({
                el:"[main]",
                data:{
                    message:"Mensagem Exemplo"
                }
            });
        </script>
    </body>

#### Filtro Global
Você tem duas formas de fazer um filtro e uma delas é o filtro global, ao qual qualquer instancia do Vue poderia usar, no caso todo o filtro deve receber pelo menos um argumento e retornar alguma coisa, no caso: `Vue.filter('upper', e => e.toUpperCase())`, aqui é criado um filtro chamado `'upper'`, que recebe um texto `e` e retorna em maiúsculo `e.toUpperCase()`, uma vez que se trata de uma arrow function, algo que aqui não tem problema, uma vez que está sendo usado na classe do **Vue**, logo o *this* aponta para a própria instancia que o chama. Resumindo: um filtro deve ter no mínimo um argumento e deve retornar alguma coisa e por fim caso você queira criar um filtro para classe, se faz necessário definir-lo através do método `.filter` antes de instanciar qualquer objeto, uma vez que se algum objeto for instanciado antes da criação do filtro, o objeto criado não vai enxergar-lo. Para chamar-lo `{{message | upper}}` você usa o operador *pipe* seguido do nome do filtro criado no caso `| upper` depois do valor a ser filtrado.

#### Filtro de Instância

    <body>
        <div main>
            <h1>{{message | upper | reverse}}</h1>
        </div>
        <script>
            Vue.filter('upper', e => e.toUpperCase())
            const vue = new Vue({
                el:"[main]",
                data:{
                    message:"Mensagem Exemplo"
                },
                filters:{
                    reverse: function(text){return text.split('').reverse().join('')}
                }
            });
        </script>
    </body>

##### No caso:

    filters:{
        reverse: function(text){return text.split('').reverse().join('')}
    }

Caso queira criar um filtro de instância, deve-se colocar-los dentro do atributo *filters*, segue a mesma estrutura que o filtro *global*, apesar que na instancia se usa o método *filters* no plural e na classe o método em singular *filter* e tem uma estrutura diferente, e relembrando um filtro deve ter no mínimo 1 argumento e deve retornar alguma coisa, além disso os filtros de métodos não se dão bem com o **this**, além disso é possível encadear um filtro de modo que a saída de um filtro seja a entrada de dados para outro, conforme visto aqui `{{message | upper | reverse}}`

#### Filtro com parâmetros

    <body>
        <div main>
            <h1>{{message | upper | reverse | cut(1,5)}}</h1>
        </div>
        <script>
            Vue.filter('upper', e => e.toUpperCase())
            const vue = new Vue({
                el:"[main]",
                data:{
                    message:"Mensagem Exemplo"
                },
                filters:{
                    reverse: function(text){return text.split('').reverse().join('')},
                    cut:function(text,index1,index2){return text.slice(index1,index2)}
                }
            });
        </script>
    </body>

Um filtro pode receber parametros como nesse caso `{{message | upper | reverse | cut(1,5)}}` e isso vale tanto para o filtro de classe como o de instância. Nesse caso do filtro `cut:function(text,index1,index2){return text.slice(index1,index2)}` o **1** vai como segundo parametro do filtro, no caso o parametro *index1* e o segundo parametro do filtro equivale-se ao terceiro da função o *index2* e por ai vai. O primeiro argumento é a entrada do filtro e do segundo em diante são os argumentos passados ao filtro.

### Componentes
[Arquivo exemplo de componentes](Componente.html)

    <body>
        <main>
            <my-first message="Olá como vai" name="Usuário"></my-first>
            <hr>
        </main>
        <script>
            Vue.component('my-first',{
                template:'<h1>{{message}} {{name}} ?</h1>',
                props:['message','name']
            });

            const vue = new Vue({
                el:"main",
                data:{
                    textInstance:"Ola mundo"
                }
            });
        </script>
    </body>

Você cria componentes da seguinte forma `Vue.component('[nome]',objeto)` o `[nome]` deve ser substituido seguindo a lógica do `document.querySelect`, nesse caso o `my-first` do jeito que foi definido o componente em questão foi esse `<my-first></my-first>`, renderizado com base com que está dentro do atributo *template*, conforme visto aqui ` template:'<h1>{{message}} {{name}} ?</h1>',`, resumindo, essa tag `<my-first></my-first>` será substituida pelo que está aqui `template:'<h1>{{message}} {{name}} ?</h1>',`, repare que também o componente é feito na classe, ou seja os componentes devem ser declarados antes de instanciar objetos que precisem lidar com esses componentes.

#### props
Aqui no props você trata das propriedades passado no componenente, por exemplo `<my-first message="Olá como vai" name="Usuário"></my-first>`, aqui temos a propriedade *message* e *name* que estão aqui, são registrados aqui `props:['message','name']` e que pode ser interpolado no template `template:'<h1>{{message}} {{name}} ?</h1>',`. Lembrando que esse componente é registrado na classe e as instruções para renderização dos componentes segue para os objetos instanciados.

##### props com tipagem amarrada

    <main>
        <my-first message="Olá como vai" name="Usuário"></my-first>
        <app-secound num=1 :text='textInstance'></app-secound>
        <hr>
    </main>
    <script>
        Vue.component('my-first',{
            template:'<h1>{{message}} {{name}} ?</h1>',
            props:['message','name']
        });

        Vue.component('app-secound',{
            template:'<h2>{{num}}. {{text}}</h2>',
            props:{
                text: String,
                num: [Number,String],
            }
        });

        const vue = new Vue({
            el:"main",
            data:{
                textInstance:"Ola mundo"
            }
        });
    </script>

Você pode amarrar os tipos aceitos pelo componente através da propriedade props conforme visto aqui:

     Vue.component('app-secound',{
            template:'<h2>{{num}}. {{text}}</h2>',
            props:{
                text: String,
                num: [Number,String],
            }
        });

No caso você pode passar a props um objeto sendo a chave o nome do atributo e o valor o tipo aceito, conforme visto aqui `text: String,`, ou colocar uma lista de tipos aceitos, conforme aceito aqui `num: [Number,String],`, sendo os tipos aceitos: `String` `Number` `Boolean` `Array` `Object` `Function` `Promise`. 

#### Eventos com componentes

    <body>
    <main>       
        <app-third @change="sensor($event)"></app-third>
    </main>
    <script>   

        Vue.component('app-third',{
            template:`
                <div>
                    <h3>{{title}}</h3>
                    <p>{{text}}</p>                    
                    <button @click="mudar" v-if="isWorking">Mudar Texto</button>                    
                </div>
            `,
            data:function(){                
                return{
                    title:"Título",
                    isWorking:true,
                    text: "Bresaola dolore et velit boudin, dolor jowl fugiat tenderloin elit pork loin pastrami"
                }
            },
            methods: 
            {
                mudar:function(){
                    this.isWorking = false;
                    this.text = 'Dolore pork loin strip steak hamburger.';
                    this.$emit('change','Valor Enviado pelo filho!');
                }
            }
        });
        const vue = new Vue({
            el:"main",
            data:{
                textInstance:"Ola mundo"                
            },
            methods:{
                sensor:function(e){
                    console.log("componente interno alterado: ",e);
                }
            }
        });       

Inicialmente o atributo data dentro de um componente deve ser sempre uma função que retorna dados, ou seja, seja faz necessário que esteja envolto de uma função como visto aqui:

    data:function(){                
        return{
            title:"Título",
            isWorking:true,
            text: "Bresaola dolore et velit boudin, dolor jowl fugiat tenderloin elit pork loin pastrami"
        }
    },

Que no caso eles terão esse valor definido a eles e dessa forma será usado no template

    template:`
        <div>
            <h3>{{title}}</h3>
            <p>{{text}}</p>                    
            <button @click="mudar" v-if="isWorking">Mudar Texto</button>                    
        </div>
            `,

Sendo essa função mudar:

    methods: 
        {
            mudar:function(){
                this.isWorking = false;
                this.text = 'Dolore pork loin strip steak hamburger.';
                this.$emit('change','Valor Enviado pelo filho!');
            }
        }

Repare que essa função mudar acima, chamado pelo botão `<button @click="mudar" v-if="isWorking">Mudar Texto</button> ` emite um evento do tipo **onchange** `this.$emit('change','Valor Enviado pelo filho!');` e ainda passa um valor que é o `'Valor Enviado pelo filho!'`, no caso o componente está escutando um valor emitido pelo filho, conforme o componente abaixo:

    <app-third @change="sensor($event)"></app-third>

O elemento pai está escutando um evento change, que ao clicar no botão é emitido pelo componente filho através da função *mudar*, conforme visto aqui `this.$emit('change','Valor Enviado pelo filho!');` e assim que acionado, o componente pai vai ouvir esse evento emitido pelo change e enviar essa emissão ao método **sensor** `@change="sensor($event)"`, segue o método listener:

    const vue = new Vue({
            el:"main",
            data:{
                textInstance:"Ola mundo"                
            },
            methods:{
                sensor:function(e){
                    console.log("componente interno alterado: ",e);
                }
            }
        });      

Repare aqui:

    methods:{
        sensor:function(e){
            console.log("componente interno alterado: ",e);
        }
    }

No caso esse método vai exibir o resultado no console, mas repare que você pode emitir eventos do javascript também como o `onchange` por exemplo, no caso para emitir um evento do tipo `onchange` o componente pai precisar estar com a propriedade `@change` ou `v-on:change`, com essa propriedade, basta o componente interno usar o método `$emit('change')` para chamar a função que escuta nesse evento.

#### Acessando um componente
No caso quando quisermos acessar um componente, basta colocar uma propriedade nele chamado `ref` e com base nessa propriedade, será acessado o componente, sem precisar recorrer ao acesso ao *DOM*, caso queira fazer alguma alteração ou acessar alguma propriedade, no caso: 

    <app-secound num=1 :text='textInstance' ref="segundo"></app-secound>

Repare que esse componente tem uma referencia chamado *segundo*, no caso `ref="segundo"`, logo para acessar esse componente:

    vue.$refs.segundo

Todas as referencias fica dentro de um atributo chamado `$refs` dos **OBJETOS**, ou seja não dá para acessar-lo de maneira estática, no caso a referencia desse dentro de `$refs` é o `segundo` em função do valor passado a ref aqui `ref="segundo"`, uma vez pego a referência, nesse exemplo `vue.$refs.segundo`, com isso você tem acesso a todos os atributos declarados em `data` e os metodos declarados em `methods` e toda e qualquer propriedade, método, filtro, props e etc... relacionado a esse componente.

#### Componente filho
Por padrão o que está dentro do componente não é renderizado, mas essa limitação pode ser superada com o uso do `<slot>`, componente:

    <container>
        <h3 slot="h3">Ola Mundo</h3>
        <h4 slot="h4">Olha o olá mundo denovo</h4>
    </container>

sendo renderizado por:

    Vue.component('container',{
        template:`
            <div>                    
                <slot name="h4"></slot>
                <slot name="h3"></slot>
            </div>
        `
    });

No caso esse slot `slot="h3"` faz referencia a esse `<slot name="h3"></slot>` e esse `<h4 slot="h4">Olha o olá mundo denovo</h4>` a esse aqui `<slot name="h4"></slot>`. Nesse exemplo o **h4** será impresso acima do **h3**, ou seja o atributo *name* no componente assim como o atributo *slot* no template, ajudam a posicionar o elemento filho dentro do elemento, no caso tanto o *name* e *slot* podem ser omitidos e nesse caso o componente renderizaria os filhos na ordem em que foram declarado, o que pode ser resolvido por meio da combinação dos atributos *slot* e *name*, lembrando que o valor desses dois atributos devem corresponder um ao outro.

#### escopo do componente

##### componente
    Vue.component('temp',{
            template:`
                <div>
                    <slot :compText="textInstance"></slot>
                    <slot name="instancia"></slot>
                </div>
            `,
            data:function(){
                return {
                    textInstance:'Nada de Olá mundo'
                }
            }
        });

Perceba-se que esse bind `<slot :compText="textInstance"></slot>`, no caso `:compText="textInstance"` que faz referencia a essa variável ` textInstance:'Nada de Olá mundo'`, que também está sendo usado pela instancia, conforme ilustrado abaixo:

    const vue = new Vue({
        el:"main",
        data:{
            textInstance:"Ola mundo"                
        },
        methods:{
            sensor:function(e){
                console.log("componente interno alterado: ",e);
            }
        }
    });   

Repare que ambos os tanto a instancia, quanto o componente usam a variável `textInstance`
##### template

    <temp>
        <template slot-scope="props">
            <h4>textInstance do Componente: {{props.compText}}</h4>
        </template>
        <h4 slot="instancia">textInstance da instancia: {{textInstance}}</h4>
    </temp>

Você pode usar o template quando você quer usar uma variável do escopo atual, no caso a tag template deve estar dentro do componente, aqui é usado a variável da instancia `<h4 slot="instancia">textInstance da instancia: {{textInstance}}</h4>` e abaixo a variável do componente:

    <template slot-scope="props">
        <h4>textInstance do Componente: {{props.compText}}</h4>
    </template>

`slot-scope` aqui definimos o escopo que no caso é próprio componente e aqui fazemos referência a variável **textInstance**, no caso `{{props.compText}}`. O `slot-scope` substituí o `scope`.

### Propriedades Computadas
[Arquivo](computadas.html)

    <body>
        <main>    
            <h1>{{text}}</h1>
            <hr>       
            <input type="text" :value="textInit" @keyup="change($event,true)" class="textInit"/>
            <input type="text" :value="textFinal" @keyup="change($event,false)" class="textFinal"/>
        </main>
        <script>
            const vue = new Vue({
                el:"main",
                data:{
                    textInit: "exemplo",
                    textFinal: "texto",
                },
                computed:{
                    text:{
                        get:function(){
                            console.log("lendo valor: "+this.textInit+" "+this.textFinal)
                            return this.textInit+" "+this.textFinal;
                        },
                        set:function(params){
                            console.log('Alterando valor para: '+params)
                            const param = params.split(' ');
                            this.textInit = param[0] || this.textInit;
                            this.textFinal = param[1] || this.textFinal;
                        }
                    }
                },
                methods:{
                    change:function(param,isFirst){
                        if(isFirst){
                            this.textInit = param.target.value;
                        }else{
                            this.textFinal = param.target.value;
                        }
                    }
                }
            });
        </script>
    </body>

Propriedades computadas são recomendadas para variáveis que exigem processamento, seja na entrada, ou seja na saída, a vantagem dos métodos computados sobre a criação de atributos direto no data, é que as propriedades computadas elas apenas fazem um novo processamento quando os seus valores são alterados, do contrário não é feito um novo processamento, o que garante mais performace. Abaixo temos um exemplo de uma propriedade calculada:

    computed:{
            text:{
                get:function(){
                    console.log("lendo valor: "+this.textInit+" "+this.textFinal)
                    return this.textInit+" "+this.textFinal;
                },
                set:function(params){
                    console.log('Alterando valor para: '+params)
                    const param = params.split(' ');
                    this.textInit = param[0] || this.textInit;
                    this.textFinal = param[1] || this.textFinal;
                }
            }
        }

Por padrão as propriedades calculadas são somente leituras, caso coloque um valor ou função como resultado, mas quando são definidas com um objeto contendo o *get* e o *set*, o mesmo funciona tanto para leitura, como para escrita, no caso como dentro da função *set* é usado para compor o valor de *text*, se faz necessário a combinação de valores entre *textInit* e *textFinal*, conforme visto abaixo:

    set:function(params){
        console.log('Alterando valor para: '+params)
        const param = params.split(' ');
        this.textInit = param[0] || this.textInit;
        this.textFinal = param[1] || this.textFinal;
    }

Mais especificamente `this.textInit = param[0] || this.textInit;`, `this.textFinal = param[1] || this.textFinal;` ou seja qualquer valor que ocorra em uma das variáveis que o *text* exige, como nesse exemplo, o processamento é refeito, mas apenas nessa situação.

### Watch
[Arquivo](watchers.html)

    <body>
        <main>        
            <h1>Output: {{output}}</h1>
        </main>
        <script>
            const vue = new Vue({
                el:"main",
                data:{ 
                    trigger:false,               
                    output: "Esperando pelo gatilho em 3s"
                },
                watch:{
                    trigger:function(){     
                        console.log('Executando api fetch.');
                        fetch('https://jsonplaceholder.typicode.com/todos/1')
                        .then(response => response.json())
                        .then(json => this.output = json);
                        console.log('Promise concluído!');                                      
                    }
                }
            });       
            
            console.log('Executando setTimeout');
            setTimeout(function(){            
                vue.trigger = true;            
            },3000);
        </script>
    </body>

O Watch é ativado quando o atributo observado é alterado, ao passo que a propriedade computada analisa os valores que o compões, o watch observa um atributo e quando ele alterado, essa mudança é gatilho para alterar outra variável. No caso essa estrutura é ideal para *Promise* ou *Observer*. No caso qualquer alteração no atributo *trigger*, o mesmo ativa uma mudança na variável *output*.

    setTimeout(function(){            
        vue.trigger = true;            
    },3000);

Essa função é gatilho para alteração do valor *output*, no caso depois de 3 segundos o valor é *trigger* é mudado para verdadeiro, e depois desse tempo é disparado a api fetch e após a conclusão desse processo o output é alterado, que inicialmente está com esse valor ` output: "Esperando pelo gatilho em 3s"`.

    watch:{
        trigger:function(){     
            console.log('Executando api fetch.');
            fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => this.output = json);
            console.log('Promise concluído!');                                      
        }
    }

E quando a promise é resolvida o valor de output recebe o valor da promise `.then(json => this.output = json);`, porém a um detalhe que se deve ficar atento é que a **watch** deve ser usada para monitorar o atributo de gatilho, conforme aqui `trigger:function(){`, uma vez que esse método será monitorado e é esse atributo que servirá como gatilho para que o valor de `output` seja atualizado. A grande diferença do *watch* para o *computed* é que a *watch* aceita com que o valor seja resolvido depois, ao passo que a *computed* entrega o que tem e não espera resolver.

### Diretivas
[Arquivo](Diretivas.html)

     <main>
        <div v-custom ref="div">
            <input v-custom ref="input"/>
        </div>
        <br/>
        <h2>Verifique o console do navegador...</h2>
    </main>
    <script>
        Vue.directive('custom',{
            bind:function(param,bind){
                console.log('%cbind','background-color:blue;color:white;');
                console.log('%c-------Element-------------','background-color:blue;color:white;')
                console.log(param)
                console.log('%c---------Bind-----------','background-color:blue;color:white;')
                console.log(bind)
                console.log('%c--------------------','background-color:blue;color:white;')
            },
            inserted:function(param,bind){
                console.log('%cinserted','background-color:red;color:white;');
                console.log('%c-------Element-------------','background-color:red;color:white;')
                console.log(param)
                console.log('%c---------Bind-----------','background-color:red;color:white;')
                console.log(bind)
                param.value = "inserted"
                console.log('%c--------------------','background-color:red;color:white;')
            },
            update:function(param,bind){
                console.log('%cupdate','background-color:black;color:white;');
                console.log('%c-------Element-------------','background-color:black;color:white;')                
                console.log(param)                
                console.log('%c---------Bind-----------','background-color:black;color:white;')
                console.log(bind)
                console.log('%c--------------------','background-color:black;color:white;')
            },
            componentUpdated:function(param, bind){
                console.log('%componentUpdated','background-color:green;color:white;');
                console.log('%c-------Element-------------','background-color:green;color:white;')
                console.log(param)
                console.log('%c---------Bind-----------','background-color:green;color:white;')
                console.log(bind)                
                console.log('%c--------------------','background-color:green;color:white;')
            },
            unbind:function(param, bind){
                console.log('%cunbind','background-color:purple;color:white;');
                console.log('%c-------Element-------------','background-color:purple;color:white;')
                console.log(param)  
                console.log('%c---------Bind-----------','background-color:purple;color:white;')
                console.log(bind)              
                console.log('%c--------------------','background-color:purple;color:white;')
            }
        });        
        const vue = new Vue({
            el:"main"
        });
        console.log("Dando um update forçado em 5 segundos")
        setTimeout(function(){
            vue.$forceUpdate();
        },5000);
    </script>

Dessa forma você define novas diretivas `Vue.directive('custom',{`, no caso apesar do *custom* , a forma como você chama é `<div v-custom ref="div">`, ou seja `v-custom`.

`bind` **=>** chamado apenas uma vez, quando a diretiva for ligada pela primeira vez ao elemento

`inserted` **=>** chamado quando o elemento com a diretiva for inserido no elemento pai

`update` **=>** chamado após o conteúdo do componente ter sido atualizado

`componentUpdated` **=>** chamado após o conteúdo do componente e de seus filhos terem sidos atualizados

`unbind` **=>** chamado apenas uma vez, quando a diretiva for desconectada do elemento

#### Forma abreviada
##### Botão
    <button v-collor="{bg:'blue',color:'white',box:'5px 5px darkblue'}">Botao</button>

##### código da diretiva v-collor

    Vue.directive('collor',function(element,binding){
        element.style.backgroundColor = binding.value.bg;
        element.style.color = binding.value.color;
        element.style.boxShadow = binding.value.box;
        element.style.border = 'none';
        element.style.padding= "20px";
        element.onclick = () => alert('Voce clicou no botao!');
    });

Você pode passar uma função para a configuração da diretiva `Vue.directive('collor',function(element,binding)`, assim que carregado a diretiva esses ajustes são aplicados ao elemento que tem essa diretiva. A função recebe dois argumentos, sendo o primeiro um **node Html** e o segundo o **binding** ao qual você pode passar valores, nesse exemplo configuramos estilo e mudando o visual do componente, conforme visto aqui `element.style.backgroundColor = binding.value.bg;` ao qual recebe o valor passado a diretiva no template `v-collor="{bg:'blue',color:'white',box:'5px 5px darkblue'}"`, nesse exemplo o valor de *bg*, além disso é definido um comportamento ao botão, como visto aqui `element.onclick = () => alert('Voce clicou no botao!');`, ou seja é possível configurar um elemento por completo com o uso de diretiva, logo recomenda-se usar isso caso você queira customizar um elemento na hora da renderização.

#### Sobre o primeiro argumento de uma função Vue.directive('collor',function(element,binding), após o processamento da função
    <button style="background-color: blue; color: white; box-shadow: darkblue 5px 5px; border: none; padding: 20px;">Botao</button>
#### Sobre o segundo argumento de uma função Vue.directive('collor',function(element,binding), no caso o binding

    {name: "collor", rawName: "v-collor", value: {…}, expression: "{bg:'blue',color:'white',box:'5px 5px darkblue'}", modifiers: {…}, …}
    def:
    bind: ƒ (element,binding)
    arguments: null
    caller: null
    length: 2
    name: ""
    prototype: {constructor: ƒ}
    __proto__: ƒ ()
    [[FunctionLocation]]: Diretivas.html:19
    [[Scopes]]: Scopes[2]
    update: ƒ (element,binding)
    arguments: null
    caller: null
    length: 2
    name: ""
    prototype: {constructor: ƒ}
    __proto__: ƒ ()
    [[FunctionLocation]]: Diretivas.html:19
    [[Scopes]]: Scopes[2]
    __proto__: Object
    expression: "{bg:'blue',color:'white',box:'5px 5px darkblue'}"
    modifiers: {}
    name: "collor"
    oldArg: undefined
    oldValue:
    bg: "blue"
    box: "5px 5px darkblue"
    color: "white"
    __proto__: Object
    rawName: "v-collor"
    value:
    bg: "blue"
    box: "5px 5px darkblue"
    color: "white"
    __proto__: Object
    __proto__: Object

### 2 Way Data Bind com formulários
[arquivo](2wayDataBind.html)

    <body>
        <main>
            <div>
                <input type="text" v-model="input" />
                <br>
                {{input}}
            </div>
            <hr>        
        </main>
        <script>
            const vue = new Vue({
                el:'main',
                data:{
                    input:"initial"
                }
            });
        </script>
    </body>

Você pode fazer uso do recurso *2 Way data Bind* através da diretiva `v-model`, nessa diretiva você passa a variável dentro de **data** ou **computed**.

#### Checkbox
##### Template

     <div>
            <h2>2 Way data bind checkbox com valores padrões</h2>
            <input type="checkbox" v-model="checkbox" value="A" />
            <input type="checkbox" v-model="checkbox" value="B" />
            <input type="checkbox" v-model="checkbox" value="C" />
            <h4>{{checkbox}}</h4>
        </div>
        <hr>    
        <div>
            <h2>2 way data bind checkbox com valores personalizados</h2>                
            <input type="checkbox" :true-value="marcado" :false-value="desmarcado" v-model="check_data" />
            <br>
            <h4>{{check_data}}</h4>
        </div>    

##### Javascript

    <script>
        const vue = new Vue({
            el:'main',
            data:{                
                checkbox: [],
                check_data: 'Valor padrao',
                marcado:"Checkbox esta marcado",
                desmarcado:"Checkbox desmarcada"
            }
        });
    </script>

##### checkbox padrão
Existe duas formas de se trabalhar com *checkbox*, a primeira é a presença ou ausência de valor, no caso esses três checkbox estão apontando para a mesma variável, que no caso é um array dentro de um atributo data.

    <input type="checkbox" v-model="checkbox" value="A" />
    <input type="checkbox" v-model="checkbox" value="B" />
    <input type="checkbox" v-model="checkbox" value="C" />

Todos estão referenciando a esse array `checkbox: [],`, nesse caso esse array vai conter os valores `value="A" ou value="B" ou value="C"` definidos nesse array caso a checkbox esteja marcado, caso a checkbox não esteja marcaso esse elemento some do array. Por exemplo se houver dois desses checkbox marcados, o array vai conter apenas dois elementos, se tiver apenas 1, o array vai ter apenas um elemento, ao passo que se tiver marcado todos, o array irá conter todos os valores.

##### Checkbox com valor para falso
      <input type="checkbox" :true-value="marcado" :false-value="desmarcado" v-model="check_data" />

Nessa segunda forma nós definimos um valor customizável caso o valor seja verdadeiro ou falso e um valor padrão. `:true-value` ou `true-value` define um valor caso a checkbox esteja marcada, ao passo que `:false-value` ou `false-value` define um valor caso a checkbox esteja desmarcada, tanto o `true-value` como `false-value` escrevem o valor da variável de `v-model`, segue as variáveis relacionadas a esse checkbox:

    check_data: 'Valor padrao',
    marcado:"Checkbox esta marcado",
    desmarcado:"Checkbox desmarcada"

#### Radio
##### Template

    <div>
        <h2>2 Way data bind radio</h2>
        <input type="radio" v-model="radio" value="A" />
        <input type="radio" v-model="radio" value="B" />
        <input type="radio" v-model="radio" value="C" />
        <h4>{{radio}}</h4>
    </div>  

##### No Código

    <script>
        const vue = new Vue({
            el:'main',
            data:{    
                radio: ''             
            }
        });
    </script>

No caso do Radio o input selecionado substitui o valor do valor que estava armazenado anteriormente, repare que todos compartilham a mesma variável `v-model="radio"`.

#### Select e Select Multiple
##### Template
    <div>
            <h2>2 Way data bind select unique</h2>
            <select v-model="select_unique">
                <option :value="1">A</option>
                <option :value="2">B</option>
                <option :value="3">C</option>
            </select>
            <h4>{{select_unique}}</h4>
        </div>
        <div>
            <h2>2 Way data bind select multiple</h2>
            <select v-model="select_multiple" multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <h4>{{select_multiple}}</h4>
        </div>

###### Código
     const vue = new Vue({
        el:'main',
        data:{
            input:"initial",
            checkbox: [],
            select_unique: null,
            select_multiple:[],
            radio: null,
            check_data: 'Valor padrao',
            marcado:"Checkbox esta marcado",
            desmarcado:"Checkbox desmarcada"
        }
    });

##### Explicando select unique
No caso de um select com valor único você especifica a variável no select para fazer o binding, como aqui `<select v-model="select_unique">`, no caso essa *select_unique* faz referência a essa variável `select_unique: null` e ao mudalr o valor do select, o valor é substituido nessa variável, como por exemplo essa opção `<option :value="1">A</option>` substitui o valor de `select_unique` pelo valor de *1*.

##### Explicando select multiple
Caso você define um select como multiple, logo ao invés de uma variável o mesmo trabalha com *array*, por exemplo `<select v-model="select_multiple" multiple>` faz referência a essa variável `select_multiple:[]`, porém ao invés de substituir o valor como acontece no select unique, o mesmo adiciona um novo elemento em um array, assim como funciona no checkbox. Segundo, se você omitir o valor conforme visto aqui `<option>1</option>`, é pego o texto como valor, no caso aqui é pego o que está em `value`,  `<option :value="1">A</option>` pois ele está explícito, porém já aqui `<option>1</option>` é pego o valor *1* que está entre os *option*.

### Rotas
[Rotas](Rotas.html)

    <body>
        <main>       
                <router-link to="/comp1">Componente 1</router-link> 
            
            <hr>
                <router-view></router-view>
        </main>
        <script>
            const Comp1 = {
                template:'<div class="red">Componente 1</div>'
            }

            const routes = [
                {path:"/comp1",component:Comp1},                        
            ];
            
            const router = new VueRouter({routes:routes});

            const vue = new Vue({
                el:"main",
                router:router
            });
        </script>
    </body>

Inicialmente para usar rotas no *Vue*, você precisa importar esse script `<script src="https://unpkg.com/vue-router"></script>`, ou seja, além do *Vue*, você precisa importar o `VueRouter`.

#### No template
`<router-link>` => Essa tag substitui o `href`, inclusive deve-se usa-la em detrimento do href, devido a sua integração com os componentes do Vue. O `router-link` tem um atributo *to* que seria equivalente ao *href*, porém diferente do *anchor* essa tag ela aponta para um componente do Vue e não uma página.

`<router-view>` => Nessa tag você indica aonde o componente deve ser renderizado, no caso o componente que bater com a rota informada, será renderizado nesse espaço.

#### Criando um componente
Inicialmente você cria um componente, no caso aqui só é usado o template, mas é possível fazer um componente completo aqui dentro conforme o [explicado aqui](#componente)

    const Comp1 = {
        template:'<div class="red">Componente 1</div>'
    }
#### definindo uma rota para o componente

    const routes = [
        {path:"/comp1",component:Comp1},                        
    ];

Após a criação do componente você deve criar um array e colocar no mínimo todos os componentes dentro de um objeto contendo a rota ao qual esse componente vai responder `path` e o componente em si `component` no caso um objeto contendo *path* e *component*.

#### Criando um objeto VueRouter
    const router = new VueRouter({routes:routes});

Depois de criado as rotas, você deve informar essas rotas como parametro de um objeto VueRouter conforme feito aqui `new VueRouter({routes:routes})`, no caso esse *routes* faz referência a [esse array](#definindo-uma-rota-para-o-componente) e esse array deve ser passado ao parametro *routes* dentro de um objeto conforme o ilustrado aqui `{routes:routes}`.

#### Informando rotas ao objeto Vue

    const vue = new Vue({
        el:"main",
        router:router
    });

Aqui é definido as rotas, no caso o parametro *router* aceita um objeto *VueRouter* que vem daqui `<script src="https://unpkg.com/vue-router"></script>`.

#### rotas com parametros

    const routes = [
        {path:"/comp",component:Comp1},  

        {
            path:"/comp/:parametro",
            component:
                {
                    template:`
                    <div class='green'>
                        Parametro {{$route.params.parametro}}
                    </div>`
                }
        }                     
    ];

Abaixo estamos analisando um componente com parametros

    {
        path:"/comp/:parametro",
        component:
            {
                template:`
                    <div class='green'>
                        Parametro {{$route.params.parametro}}
                    </div>`
            }
    } 

Inicialmente você deve passar o nome do parametro seguindo de dois pontos conforme visto aqui `path:"/comp/:parametro"`, no caso essa rota responde a essa `<router-link :to="number">Componente 2</router-link>`, cuja a propriedade computada vem daqui:

    computed:{
        number:function(){
            return '/comp/'+parseInt(Math.random() * 10);
        }
    }

##### $route.params
Essa é a referência que você deve acessar `$route.params`, caso queira pegar algum parametro da url, no caso como o parametro aqui `path:"/comp/:parametro"` é *parametro*, logo para se acessar o valor desse parametro seria `$route.params.parametro`

#### Ordenando rotas
Conforme visto [aqui](#rotas-com-parametros) sempre se recomenda colocar as rotas mais específicas acima das rotas mais genéricas, isso vale para o Vue, React e Angular também.

#### Colocando Guards na rota
Existe duas formas de definir rotas, uma forma global e outra específica para cada rota

##### rotas específicas
    {
        path:"/proibido",component:null,
        beforeEnter:function(to,from,next){
            next(false);
        }
    }

Quando for usado dentro de um componente, esse atributo deve fazer compania a `path` e `component`. Porém se atente o nome, o nome do atributo deve a ser passado deve ser uma função contendo três argumentos, lembrando que essa condição se aplica apenas a esse componente. 

##### rotas globais

    const router = new VueRouter({routes:routes});
        router.beforeEach(
            function(to,from,next){
                console.clear();
                console.log("To: ",to);
                console.log("from: ",from);
                console.log("next: ",next);                
                next(true);
            }
        );

Aqui é uma rota global, no caso você deve passar uma *callback* e essa callback deve ter três argumentos e o nome do método é `beforeEach`.

##### Sobre os métodos das callbacks passado para beforeEach e beforeEnter

    function(to,from,next){
        console.clear();
        console.log("To: ",to);
        console.log("from: ",from);
        console.log("next: ",next);                
        next(true);
    }

O primeiro parametro *to* é o objeto que contém pelo menos o componente e rota, por exemplo `{path:"/comp",component:Comp1}` ao qual o usuário está a acessar, ou seja através desse argumento é possível manipular o componente antes de ser carregado, o *from* é o objeto container do componente ao qual o usuário deixou, ou seja o objeto que contém o componente carregado anteriormente, podendo dessa forma manipular o componente que o usuário manipulou previamente. Por fim o *next*, essa é uma função que define se o usuário deve seguir a próxima rota ou não, se for passado um valor verdadeiro `next(true)` o usuário acessa a rota, caso a chamada seja omitida ou seja passado um valor falso como argumento `next(false)` o acesso ao componente é negado ao usuário. Além disso é possível passar uma rota ao next, por exemplo `next('home')` ou omitir valor `next()`, ao omitir o valor padrão é **true**. De todo modo lembre-se que essa função funciona como um [Chain of responsibility](https://refactoring.guru/pt-br/design-patterns/chain-of-responsibility), parecido com a forma com que funciona no *express* e as suas rotas, então lembre-se de sempre chamar a função de `next`.

### Classes e estilos no Vue
[Arquivo](Animacao.html)

    <body>
        <main>
            <div>
                <h2 
                    :class="{classe: (Math.random() > 0.49)}"
                    :style="[estilo1,estilo2,{border:'5px solid black'}]"
                    >
                        Exemplo 1
                </h2>
            </div>
        </main>
        <script>
            const vue = new Vue({
                el:'main',
                data:{
                    estilo1:{
                        ['background-color']:'red',
                        color:'white',
                        padding:'10px'
                    },
                    estilo2:{
                        display:'flex',
                        ['justify-content']:'center',
                        alignItems:"center"
                    }
                }
            });
        </script>
    </body>

#### Bind nos objetos
No vue estilos e classes permitem *bind* de uma maneira mais dinâmica, todos os conceitos aqui valem para classe assim como estilo:

    :class="{classe: (Math.random() > 0.49)}"

Aqui estamos fazendo bind de um objeto, nesse caso se a expressão a direita `(Math.random() > 0.49)` for **verdadeira** segundo as regras do javascript, logo essa classe chamada de `classe` é aplicada a esse elemento, caso não seja, essa classe será omitida. Ou seja se for verdadeiro a expressão a direita, o atributo a esquerda é adicionado ao valor como uma string, que poderia ser representado da seguinte forma `(Math.random() > 0.49)?"classe":""`, dessa forma poderia fazer com o style também, por exemplo `{backgroundColor:'red'}`, porém no caso do estilo você passaria um valor e não uma expressão booleana, conforme ilustrado aqui `{border:'5px solid black'}`.

#### Bind em arrays
No vue estilos e classes também permite que você passe como propriedade de uma classe ou estilo, quando for dar um *bind*, um array:

    :style="[estilo1,estilo2,{border:'5px solid black'}]"

Nesse exemplo acima **estilo1** *=>* `{['background-color']:'red',color:'white',padding:'10px'}`, **estilo2** *=>* `{display:'flex',['justify-content']:'center',alignItems:"center"}`, segue a parte do código referente ao **estilo1** e **estilo2**:

    data:{
        estilo1:{
            ['background-color']:'red',
            color:'white',
            padding:'10px'
        },
        estilo2:{
            display:'flex',
            ['justify-content']:'center',
            alignItems:"center"
        }
    }

Além disso é também incluído dentro desse array um objeto passado de maneira literal, que no caso é o terceiro parametro desse array `"[estilo1,estilo2,{border:'5px solid black'}]"`, quando for passar um objeto literal ao array `{border:'5px solid black'}`, no caso de um estilo colocar como nome atributo ou o nome da classe `:class="{classe: (Math.random() > 0.49)}"` ou o atributo e a direita a expressão booleana com a condição para renderizar a classe ou colocar em forma da String o valor do atributo, conforme visto aqui `{border:'5px solid black'}`. Ainda no caso das propriedades css você nomear no padrão lower camel case `alignItems => align-items` ou colocar a propriedade dentro de colchetes e aspas `['justify-content']`, ambos são válidos para definir propriedades do css, uma vez que o javascript permite isso.

### Animações
[Arquivo](Animacao.html)

#### Animação de Entrada
##### Template 

    <transition name="transicao">
        <h2
            :style="[{backgroundColor:'purple',color:'white', padding:'10px'},estilo2]"
            v-if="exibir"
        >Exemplo 2</h2>
    </transition>
    <br>
    <button @click="exibir = !exibir">Hide/Show</button>

##### CSS

    <style>
        /* Animacao de entrada */
        .transicao-enter{
            opacity: 0;    
            background-color: cyan !important;      
        }
        
        .transicao-enter-active{
            transition: opacity 5s;
            border:5px solid greenyellow;
        }

        .transicao-enter-to{
            opacity: .75;            
            background-color: black !important; 
        }
    </style>

##### Explicando
A propriedade `transition` adiciona classes ao elemento que está dentro dele, nesse caso abaixo o `h2` vai receber temporariamente  uma classe, nesse exemplo quando o componente está aparecendo e depois de um tempo essas classes somem do elemento, permitindo dessa forma uma animação de entrada, disparado nesse caso pelo botão *Hide/Show*. Dentre várias classes que o `transition` coloca no componente no seu interior, *lembrando que deve ser apenas um elemento raiz ali dentro*, o nome dessas classes variam de acordo com esse parametro `<transition name="transicao">`, ou seja o *name*, nesse caso a propriedade do `name` é *transicao*, logo as classes adicionadas ao elemento filho terá como base esse nome, porém dentro dessas classes, para a animação de **entrada** exclusivamente, se destacam três.

    .transicao-enter{
        opacity: 0;    
        background-color: cyan !important;      
    }
        
    .transicao-enter-active{
        transition: opacity 5s;
        border:5px solid greenyellow;
    }

    .transicao-enter-to{
        opacity: .75;            
        background-color: black !important; 
    }

No caso a animação inicia com essa classe `[name]-enter`, ou seja essa é a condição inicial. Nessa outra classe `[name]-enter-active` definimos o critério de mudança, ou seja como será o visual do elemento enquanto dura a animação. Já o `[name]-enter-to` é uma classe de encerramente, no caso quando a animação estiver terminando, essa classe é chamada, no caso temos: 
`1 => .transicao-enter`, `2 => .transicao-enter .transicao-enter-active`, `3 => .transicao-enter-active .transicao-enter-to`, `4 => .transicao-enter-to`

#### Animação de Saída

##### Template

    <!-- Transitions apenas de saida -->
    <transition name="saida">
        <h2
            :style="[{['background-color']:'darkgreen',color:'white', padding:'10px'},estilo2]"
            v-if="exibir2"
        >Exemplo 3</h2>
    </transition>
    <br>
    <button @click="exibir2 = !exibir2">Hide/Show</button>

##### CSS

    /*Animacao de Saida */

    .saida-leave-active{
        transition: width 2s, height 2s, transform 2s;
        border:5px solid greenyellow;
    }

    .saida-leave{
        width:75%;
    }

    .saida-leave-to{            
        width:25%;
    }

##### Exemplo
Segue a variável `exibir2:true`, assim como ocorre no *enter*, ocorre aqui com o *leave*, porém o *leave* funciona com a animação de saída. Segue o ciclo `1 => .saida-leave`, `2 => .saida-leave .saida-leave-active`, `3 => .saida-leave-active .saida-leave-to`, `4 => .saida-leave-to`.

#### Funções do das transações

##### Template
     <!-- Transitions de entrada de saida -->
    <transition name="inout"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="cancelledEnter"
        
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="cancelledLeave"
    >
        <h2
            :style="[{['background-color']:'darkblue',color:'white', padding:'10px'},estilo2]"
            v-if="exibir3"
        >Entrada e Saída</h2>
    </transition>
    <br>
    <button @click="exibir3 = !exibir3">Hide/Show</button>

##### Métodos ligados as diretivas

    methods:
    {
        beforeEnter:(el,done) => {console.log("%cbeforeEnter","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        enter:(el,done) => {console.log("%center","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        afterEnter:(el,done) => {console.log("%cafterEnter","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        cancelledEnter:(el,done) => {console.log("%ccancelledEnter","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        beforeLeave:(el,done) => {console.log("%cbeforeLeave","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        leave:(el,done) => {console.log("%cleave","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        afterLeave:(el,done) => {console.log("%cafterLeave","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },

        cancelledLeave:(el,done) => {console.log("%ccancelledLeave","background-color:black;padding:10px;color:white;font-size:24px"); console.log(el); console.log(done) },
    }        

###### Antes da animação
`@before-enter="beforeEnter"` => Executa antes de iniciar a entrada do elemento. Passa no primeiro argumento o próprio elemento.

`@before-leave="beforeLeave"` => Executa antes de iniciar a saida do elemento. Passa no primeiro argumento o próprio elemento.

###### Depois da animação, quando começa a animação oposta.
`@after-enter="afterEnter"` => Executado quando o elemento começar a sumir. Passa no primeiro argumento o próprio elemento.

`@after-leave="afterLeave"` => Executado quando o elemento começar a aparecer. Passa no primeiro argumento o próprio elemento.

###### Depois de concluído a animação
`@enter="enter"` => Executa durante a animação. Passa no primeiro argumento o próprio elemento, no segundo uma função que informa a conclusão da animação.

`@leave="leave"` => Executa durante a animação. Passa no primeiro argumento o próprio elemento, no segundo uma função que informa a conclusão da animação.

###### Executa quando a animação é interrompida no meio
`@after-leave="afterLeave"` => Executa ao interromper a animação de saída. Passa no primeiro argumento o próprio elemento.

`@leave-cancelled="cancelledLeave"` => Executa ao interromper a animação de entrada. Passa no primeiro argumento o próprio elemento.

### Trabalhando com estado
[Arquivo](vuex.html)

        <main>
            <my-comp></my-comp>
        </main>
        <script>
            const store = new Vuex.Store({
                state:{
                    count:0,
                    step:1
                },
                mutations:{
                    change: state => state.count += state.step,
                    shift: (state,step) => state.step = parseFloat(step)
                }
            });

            Vue.component('my-comp',{
                template:`
                    <div>
                        <p><span>Passo</span> <input type="number" @change="shift($event.target.value)" value='1'/></p>
                        <p>{{fromStore}}</p>
                        <p><button @click="incdec">Incrementar</button></p>
                    </div>
                `,
                computed:{
                    fromStore: function(){return this.$store.state.count}
                },
                methods:{
                    incdec: () => store.commit('change'),
                    shift:  step => store.commit('shift',step)                
                }
            });

            const vue = new Vue({
                store,
                el:"main"            
            });
        </script>    

Inicialmente você precisa colocar nos `scripts` um javascript, tipo: `<script src="https://unpkg.com/vuex"></script>`, se você quiser criar um componente com estado usando o vuex, inicialmente você precisa instanciar um objeto de `Vuex.Store`

    const store = new Vuex.Store({
        state:{
            count:0,
            step:1
        },
        mutations:{
            change: state => state.count += state.step,
            shift: (state,step) => state.step = parseFloat(step)
        }
    });

O atributo *state* contém as variáveis com estado, no entando essas variáveis estão apenas em modo leitura, ao passo que as *mutations*, informa como os métodos do *state* devem evoluir, uma vez que os dados com estados, não são motificados e sim evoluídos. Na `state` declara-se os valores iniciais dos atributos com os estados, ao passo que na mutation você informa funcões que informa como um `state` deve ser evoluído, o primeiro parametro da função é o atributo `state` e o segundo os argumentos passado pelos usuários.

    Vue.component('my-comp',{
        template:`
            <div>
                <p><span>Passo</span> <input type="number" @change="shift($event.target.value)" value='1'/></p>
                <p>{{fromStore}}</p>
                <p><button @click="incdec">Incrementar</button></p>
            </div>
        `,
        computed:{
            fromStore: function(){return this.$store.state.count}
        },
        methods:{
            incdec: () => store.commit('change'),
            shift:  step => store.commit('shift',step)                
        }
    });

Aqui no componente é feito as alterações *store*, mas repare que o store não é passado no componente, porém uma instancia do **store** será passado quando uma instancia do *vue* chamar, as *store* funcionam quando você chama um gatilho, semelhante ao *$emit*, e assim como a sua estrutura também é parecida, quando não se passa nenhuma argumento, você apenas chama a *mutation* da *store* como feito aqui `incdec: () => store.commit('change')` ao qual chama essa mutation `change: state => state.count += state.step`, sendo o *state* o próprio atributo da *store*, mas caso tenha argumentos você passa eles como segundo argumento, conforme feito aqui `shift:  step => store.commit('shift',step)`, ao qual chama a *mutation* `shift: (state,step) => state.step = parseFloat(step)`, abaixo está aonde você deve informar o objeto *store*, no caso dentro de uma instância.

    const vue = new Vue({
        store,
        el:"main"            
    });