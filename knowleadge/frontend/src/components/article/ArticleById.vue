<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
//css para highlight
import 'highlightjs/styles/dracula.css'
//Javascript para highlight
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data: function() {
        return {
            article: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url).then(res => this.article = res.data)
    },
    updated() {
        /*
            Aqui eh aplicado o highlight, como nao tem integracao com
            o vue o mesmo eh feito por javascript puro mesmo.
            Todo o conteudo dentro da tag pre tendo as classes
            'article-content' ou 'ql-syntax' eh interpretado
            como codigo fonte e colorizado as suas palavras reservadas
            como tal, por exemplo em um codigo html  as tags mudam
            de cor, os comentarios tem outra cor e por ai vai, isso
            eh o Highlight.
        */
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>
