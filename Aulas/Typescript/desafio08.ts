class Moto{
        private _velocidade:number = 0;
        constructor(public name:string){}
        public get velocidade():number{
            return this._velocidade;
        }
        public acelerar(delta:number):void {
            this._velocidade = this._velocidade + delta
        }
        public buzinar():void {
            console.log('Toooooooooot!')
        }
    }
        
    var moto = new Moto('Ducati')
    moto.buzinar()
    console.log(moto.velocidade)
    moto.acelerar(30)
    console.log(moto.velocidade)

    abstract class Retangulo{
        public _base = 0;
        public _altura = 0;
        public set base(n:number){
            this._base = n;
        }
        public set altura(a:number){
            this._altura = a;
        }

        public get base():number{
            return this._base;
        }

        public get altura():number{
            return this._altura;
        }
    }

    class objeto2D extends Retangulo{        
        constructor(public area:()=>number){
            super();
        }
    }
    
    var retangulo = Object.create(objeto2D)
    retangulo.base = 5
    retangulo.altura = 7
    retangulo.area = function() {
        return this.base * this.altura
    }
    console.log(retangulo.area())
    
    class Estagiario{
        private _primeiroNome:string = "";
        public set primeiroNome(nome:string){
            this._primeiroNome = nome;
        }

        public get primeiroNome():string{
            return this._primeiroNome;
        }
    }

    const estagiario:Estagiario = new Estagiario();
    console.log(estagiario.primeiroNome)
    estagiario.primeiroNome = 'Le'
    console.log(estagiario.primeiroNome)
    estagiario.primeiroNome = 'Leonardo'
    console.log(estagiario.primeiroNome)
