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

[Documentação](https://medium.com/rgblog/2-ciclo-de-vida-da-inst%C3%A2ncia-vue-8c231551d471)

#### A função que ativa o beforeUpdate e updated
    setTimeout(function(){
        console.log("\nAlterando valor");
        vue._data.text = "valor alterado";
    },2000);

#### A função que ativa o beforeDestroy e destroyed
    setTimeout(function(){
        console.log("\nDestruindo objeto");
        vue.$destroy();
    },5000);