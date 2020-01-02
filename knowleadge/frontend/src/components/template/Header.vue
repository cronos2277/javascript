<template>
    <header class="header">
        <!--
          @click => Executar algum metodo dentro de methods,
            v-if => Exibe de acordo com um booleano.
       -->
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon() {/*
            Repare a forma com que eh acessado o atributo no Store
            eh usado o $store, que no caso faz a referencia a essa
            variavel do store e entao chamamos o objeto e depois
            o atributo desse atributo. exemplo:
            this.$<instancia do Store>.state.<atributo do State>
        */
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: { /*
            Ja as mutations do Store eh acessado de maneira diferente
            voce referencia o objeto com o $ na frente e ai chama
            o metodo commit dele passando o nome do metodo la dentro
            na store.
            this.$<instancia do Store>.commit('<mutation dentro de aspas como string>'); 
        */
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
