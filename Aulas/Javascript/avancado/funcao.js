function funcao(e='valor'){
    this.var1 = "exemplo";    
    this.retorno = function(){
        return e;
    }   

}

const f = new funcao();
console.log(f.var1);
console.log(f.retorno());



class Func{    
    
    set valor(str){
        this._valor = str;
    }

    get valor(){
        return this._valor;
    }
}

const f1 = new Func;
f1.valor = "eee";
console.log(f1.valor);

