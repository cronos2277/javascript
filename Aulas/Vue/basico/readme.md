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