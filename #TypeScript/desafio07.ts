
    // Desafio Mapa
    // Array de Objetos (Chave/Valor) -> itens
    // Métodos: obter(Chave), colocar({ C, V })
    // limpar(), imprimir()
    
    const mapa = new Mapa<number, string>()
    mapa.colocar({ chave: 1, valor: 'Pedro' })
    mapa.colocar({ chave: 2, valor: 'Rebeca' })
    mapa.colocar({ chave: 3, valor: 'Maria' })
    mapa.colocar({ chave: 1, valor: 'Gustavo' })
    
    console.log(mapa.obter(2))
    mapa.imprimir()
    mapa.limpar()
    mapa.imprimir()

