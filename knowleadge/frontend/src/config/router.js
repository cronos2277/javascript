import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home/Home";
import AdminPages from "../components/admin/AdminPages";
Vue.use(VueRouter);
const routes = [{
    name:'home',
    path:'/',
    component: Home
},{
    name:'adminPages',
    path:'/admin',
    component:AdminPages
}];
const router = new VueRouter({
 //Voce tem tambem o hash que coloca o hash na url, nesse caso fica sem o hash.   
    mode:'history', 
    routes: routes //<- as rotas criadas acima.
});

export default router
