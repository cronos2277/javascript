class Fila<Generico>{
    private fila:Array<Generico> = [];
    public entrar(elemento:Generico):void{
        this.fila.push(elemento);        
    }
    public proximo():void{
        this.fila.shift();
    }    
    public imprimir():void{
        console.log(this.fila);
    }
    constructor(...sequencias:Generico[]){
        this.fila = sequencias;
    }
} 

const filaObj:Fila<number> = new Fila(1,2,3,4,5,6,7);
filaObj.entrar(8);
filaObj.proximo();
filaObj.imprimir();