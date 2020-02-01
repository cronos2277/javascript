
    // Desafio Mapa
    // Array de Objetos (Chave/Valor) -> itens
    // Métodos: obter(Chave), colocar({ C, V })
    // limpar(), imprimir()
type Map<Key,Value> = {
    chave:Key | null,
    valor:Value | null
}

class Mapa<Chave,Valor>{        
    private _mapas:Map<Chave,Valor>[] = [];   

    public colocar(mapa:{chave:Chave,valor:Valor}):void{
        this._mapas.push(mapa); 
    }

    public obter(chave:number):Map<Chave,Valor> | null{
        return this._mapas[chave];        
    }   
    public imprimir():void{
        console.log(this._mapas);
    }

    public limpar():void{
        this._mapas = [];
    }
}


    const mapa = new Mapa<number, string>()
    mapa.colocar({ chave: 1, valor: 'Pedro' })
    mapa.colocar({ chave: 2, valor: 'Rebeca' })
    mapa.colocar({ chave: 3, valor: 'Maria' })
    mapa.colocar({ chave: 1, valor: 'Gustavo' })
    
    console.log(mapa.obter(2))
    mapa.imprimir()
    mapa.limpar()
    mapa.imprimir()

