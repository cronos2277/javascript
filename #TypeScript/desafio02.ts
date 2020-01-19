 
    type contaBancaria = {saldo:number,depositar:(x:number)=>void};
    
    let contaBancaria = {
        saldo: 3456,
        depositar(valor:number):void {
            this.saldo += valor
        }
    }
     
    let correntista:{nome:string,contaBancaria:contaBancaria,contatos:string[]} = {
        nome: 'Ana Silva',
        contaBancaria: contaBancaria,
        contatos: ['34567890', '98765432']
    }
     
    correntista.contaBancaria.depositar(3000)
    console.log(correntista)


