<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
    </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree' //Aqui importa o modulo Tree
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Menu',
    /*
        Aqui acontece a desestruturacao do modulo Tree, o que permite
        que exista as seguintes atributos aqui dentro: 
        treeFilter, treeData, treeOptions.
    */
    components: { Tree }, 
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '', //Filtro da arvores
            treeData: this.getTreeData(), //Chama o metodo getTreeData.
            treeOptions: {
            /*
                Aqui caso tenha alguma propriedade do front end diferente do backend. 
                {atributo aqui:atributo no backend}
            */    
                propertyNames: { 'text': 'name' },
           //O texto a ser retornado caso a categoria nao seja encontrada.     
                filter: { emptyText: 'Categoria não encontrada' }
            }
        }
    },
    methods: {
        /*
            Esse metodo faz conexao com o axios e abaixa do servidor
            o resultado da url /categories/tree usando o metodo get.
        */
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
          /*
            Aqui eh puxado uma rota, ou seja, sera redirecionado a rota 
            que tem esse nome, passando os parametros que esta no objeto 
            params.
         */  
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }
</style>
