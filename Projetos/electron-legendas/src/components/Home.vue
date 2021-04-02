<template>
    <v-container fluid>
        <v-form>
            <v-file-input 
                multiple 
                chips 
                v-model="files"
                label="Selecione as Legendas"
                prepend-icon="mdi-message-text"
                append-outer-icon="mdi-send"
                outlined
                @click:append-outer="processSubtitles"
                />

            
        </v-form>
        <div class="pills">
            <Pill v-for="word in groupedWords" :key="word.name" 
                :name="word.name" :amount="word.amount"
            />
        </div>
    </v-container>
</template>

<script>
import Pill from './Pill';
export default {
    components:{Pill},
    data:function(){
        return {
            files: [],
            groupedWords:[
                {name:"I", amount:1234},
                {name: "you", amount:900},
                {name:"he", amount:853}
            ]
        }
    },
    methods:{
        processSubtitles(){
            console.log(this.files);
        }
    }
}
</script>

<style>
.pills{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>