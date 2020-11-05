//Função para criar novos elementos DOM.
//Param1: Tag, Param2: Classe;
function novoElemento(tagName,ClassName){
    const elem = document.createElement(tagName);
    elem.className = ClassName;
    return elem; //retorna o elemento do criado
}

//Configurações da barreira.
//False cano com sentido cima baixo, true o contrário.
function Barreira(reversa = false){
    this.elemento = novoElemento('div','barreira');
    const borda = novoElemento('div','borda');
    const corpo = novoElemento('div','corpo');
    this.elemento.appendChild(reversa ? corpo : borda);
    this.elemento.appendChild(reversa ? borda : corpo);
    this.setAltura = altura => corpo.style.height = `${altura}px`;    
}

//Aqui são criadas as barreiras aos pares.
function ParDeBarreiras(altura,abertura,x){
    this.elemento = novoElemento('div','par-de-barreiras');
    this.superior = new Barreira(true);
    this.inferior = new Barreira(false);
    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);
    this.sortearAbertura = () =>{
        const alturaSuperior = Math.random() * (altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.setAltura(alturaSuperior);
        this.inferior.setAltura(alturaInferior);
    }
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0]);
    this.setX = x => this.elemento.style.left = `${x}px`;
    this.getLargura = () => this.elemento.clientWidth;
    this.sortearAbertura();
    this.setX(x);
}

//Aqui se cria um array de barreiras, no caso são 4 barreiras recicláveis.
function Barreiras(altura,largura,abertura,espaco, notificarPonto){
    this.pares = [new ParDeBarreiras(altura,abertura,largura),
                  new ParDeBarreiras(altura,abertura,largura + espaco),
                  new ParDeBarreiras(altura,abertura,largura + espaco * 2),
                  new ParDeBarreiras(altura,abertura,largura + espaco * 3)
                 ];
    const deslocamento = 3; //velocidade do game
    this.animar = () => {
        this.pares.forEach(
            par => {
                par.setX(par.getX() - deslocamento);        
                if(par.getX() < -par.getLargura()){                
                    par.setX(par.getX() + espaco * this.pares.length);
                    par.sortearAbertura();
                }
                    const meio = largura /2;
                    const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio;                
                    if(cruzouOMeio) notificarPonto();
            })        
    }
}
//Função passaro.
function Passaro(alturaDoJogo){
    let voando = false;
    this.elemento = novoElemento('img','passaro'); //Imagem do passaro.
    this.elemento.src='imgs/passaro.png'; //Local da imagem do passaro.
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0]);
    this.setY = y => this.elemento.style.bottom = `${y}px`;
    window.onkeydown = e => voando = true; //ao apertar qualquer tecla voe.
    window.onkeyup = e => voando = false; //ao soltar qualquer tecla desça.
    this.animar = () =>{
        //O positivo é a velocidade da subida o negativo descida
        const novoY = this.getY() + (voando ? 5: -5);
        const alturaMaxima = alturaDoJogo - this.elemento.clientHeight;
        if(novoY < 0) {
            this.setY(0); //se passar altura minima permitida.
        }else if(novoY > alturaMaxima){
            this.setY(alturaMaxima); //se passar altura maxima permitida.
        }else{
            this.setY(novoY); //se não violado a altura maxima e minima, seta o novo valor.
        }        
    }
    this.setY(alturaDoJogo/2);
}
//A parte da pontuação
function Progresso(){
    this.elemento = novoElemento('span','progresso');
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos;
    }
    this.atualizarPontos(0);
}

//Colizão
function estaoSobrepostos(elementoA, elementoB){
    const a = elementoA.getBoundingClientRect();
    const b = elementoB.getBoundingClientRect();
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;
    return horizontal && vertical;
}

function colidiu(passaro,barreiras){
    let colidiu = false;
    barreiras.pares.forEach(ParDeBarreiras =>{
        if(!colidiu){
            const superior = ParDeBarreiras.superior.elemento;
            const inferior = ParDeBarreiras.inferior.elemento;
            colidiu = estaoSobrepostos(passaro.elemento,superior) || estaoSobrepostos(passaro.elemento,inferior);
        }
    });
    return colidiu;
}

function FlappyBird(){
    let pontos = 0;
    const areaDoJogo = document.querySelector('[wm-flappy]');
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;
    const progresso = new Progresso();
    
    const barreiras = new Barreiras(altura,largura,200,400,() => progresso.atualizarPontos(++pontos));
    const passaro = new Passaro(altura);
    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(passaro.elemento);
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento));
    this.start = () => {
        const temporizador = setInterval(()=>{
            barreiras.animar();
            passaro.animar();
            if(colidiu(passaro,barreiras)){
                clearInterval(temporizador);
            }
        },20)
    }
}

new FlappyBird().start();