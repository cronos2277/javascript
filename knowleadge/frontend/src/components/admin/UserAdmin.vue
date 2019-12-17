<template>
  <div class="user-admin">
      <b-table hover striped :items="users" :fields="fields">
      </b-table>
  </div>
</template>

<script>
import {BaseApiUrl} from '@/global';
import axios from "axios";
export default {
    name:"UserAdmin",
    data:function(){
      return{
        mode:'save',
        user:{},
        users:[],
        fields:[
          {key:'id',label:'Codigo',sortable:true},
          {key:'name',label:'Nome',sortable:true},
          {key:'email',label:'E-mail',sortable:true},
          {key:'admin',label:'Adminstrador',sortable:true,
          formatter: value => value ? 'Sim':'Nao'},
          {key:'actions',label:'Acoes'}  
          ]
      }
    },
    methods:{
      loadUsers(){
        const url = `${BaseApiUrl}/users`;        
        axios.get(url).then(res => {
          this.users = res.data;                    
        });
        
      }      
    },
    mounted(){
        this.loadUsers();
      }
}
</script>

<style>

</style>