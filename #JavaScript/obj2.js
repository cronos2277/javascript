{
	class Avo{
		constructor(sobrenome){
			this.familia = sobrenome;
		}
	}

	class Pai extends Avo{
		constructor(sobrenome){
			super(sobrenome);
		}

		familiaNome(){
			return this.familia;
		}
	}

	class Filho extends Pai{
		constructor(sobrenome){
			super(sobrenome);
		}
	}

let filho = new Filho('Familia');
console.log(filho.familiaNome());
}
/*
Modelo de classe no java, o super se refere ao pai, como nas outras linguagens.
*/