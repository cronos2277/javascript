/*
    O vue-router contem modulos que fara com que
    seja respondidas requisicoes nas url informada
    @ => Raiz do projeto vue.
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home', //nome da rota;
    path: '/', //url ao qual ira responder, o barra significa raiz.
    component: Home //O componente a ser renderizado
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
/*  Meta significa que necessita ter essa informacao
    no header da requisicao, no caso a informacao de login */
    meta: { requiresAdmin: true } 
}, {
    name: 'articlesByCategory',
/* Aonde tem os 2 pontos (ex, ":id") significa que tera um parametro na URL */    
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    //Voce tem tambem o hash que coloca o hash na url, nesse caso fica sem o hash.   
    mode: 'history',
    routes //<- as rotas criadas acima.
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
