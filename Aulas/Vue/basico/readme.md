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