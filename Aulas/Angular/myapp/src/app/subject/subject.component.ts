import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, AsyncSubject, BehaviorSubject, Observer, Observable } from 'rxjs';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor() {
    console.log("SUBJECT EXECUTADO");
    this.subjectBasico();
    this.subjectReplay();
    this.asyncSubject();
    this.behaviorSubject();
  }

  ngOnInit() {
    
  }

  //Exemplo basico da classe Subject.
 /*
    Por fonte, que no caso eh mencionado abaixo, entenda-se um observer rodando o seu next,
    e fazendo os devidos processamentos, no caso temos 4 formas de lidar com esses nexts
*/
  /*
    Esse modelo mais basico ja pega o dado com o bonde andando, ou seja
    se uma fonte de dados que esta inscrito nele comecou a produzir dados 
    antes der se inscrito, esse ele apenas embarca e continua. Resumindo:
    Se a fonte produz o dado em dez ciclos e o observer foi inscrito no ciclo 3,
    ele comeca a processar apartir do ciclo 4 ou seja do proximo, visualmente falando:
    Se seguido o exemplo acima:
    Fonte => 1, nada
    Fonte => 2, nada
    Fonte => 3, nada
    Fonte => 4, Subject => 4
    Fonte => 5, Subject => 5
    Vai ate o 10... 
  */
  public subjectBasico():void{
    //Dessa forma abaixo voce instancia usando a forma de duplo diamante.
    const subject:Subject<any> = new Subject<any>(); //O any pode ser trocado por qualquer tipo de dado.
    //Aqui o subject se porta como um Observable...
    subject.subscribe( //Adicionado inscrito
      /*
        O console.log aceita costumizacao, para isso coloque o %c e depois da virgula
        coloque os atributos em css de como que tudo deve ser renderizado, no caso
        fundo vermelho e letra branca.*/
      //Funcao que o Inscrito deve executar 
      parametro => console.log('%c'+parametro,"background-color:red;color:white"),
      erro => console.error(erro), //Caso de erro, nesse console eh exibido em forma de erro.
      () => console.warn("Simulacao de concluído com sucesso!") //Depois de terminado exibe o console em forma de aviso.
    );
      //Aqui o subject comeca a operar como um OBSERVER. 
      //Estruturalmente o funcionamento parace promise, se olharmos s metodos: 
      //.next(), .complete(), .error(); mas é mais completa que ela em recursos.
      subject.next('olá mundo'); //Chamando o next, ou o ".then()" do observer se compararmos com promises.
      if(Math.random() > 0.49){ //50% de chance de dar acerto ou erro.
        subject.complete(); //Se acerto, o equivalente ao ".finally()" do promise.
      }else{ //Se erro. o equivalente ao ".catch()" da promise.
        subject.error("Simulacao de erro com o subject");
      }
  }

  /*
    No replay ele re-le da origem, pega o historico dos dados processados
    e continua de forma sincronizada pela fonte, resumindo:
    Se a fonte esta produzindo dados de um ate dez e voce
    sincroniza usando o ReplaySubject no 4, ele pegara
    todos os dados dos ciclos anteriores, ou seja os
    sete ciclos anteriores e sem nenhuma interrupcao, ele continuara
    processando em sincronia com a fonte, no caso ele sincroniza com
    a fonte produtora de dados, sem interferir. A diferenca desse
    para o basico eh que esse acessa o historico.
    Graficamente falando:
    Se:
    Fonte => 1, nada
    Fonte => 2, nada
    Fonte => 3, nada
    Fonte => 4, Aqui Comeca a sincronia e o historico desse replay se ajusta:
    Fonte => 1, Replay => 1 Acrescido ao historico automaticamente.
    Fonte => 2, Replay => 2 Acrescido ao historico automaticamente.
    Fonte => 3, Replay => 3 Acrescido ao historico automaticamente.
    Fonte => 4, Replay => 4 Com tudo sincronizado, agora os dois comecam juntos.
    Fonte => 5, Replay => 5.
    Lembre-se que esse processo de sincronia ocorre, sem interferencias na fonte,
    a fonte nao reinicia o processo, eh o replay que tem acesso ao historico.

  */
  public subjectReplay():void{ //Repare que a estrutura eh a mesmo do replay basico
    const replay:ReplaySubject<any> = new ReplaySubject<any>();
    replay.subscribe(
      p => console.log(p),
      e => console.error(e),
      () => console.warn('Concluido o Replay Subject com acerto simulado')
    );    
    replay.next("Exemplo De Execucao do Replay!");
    (Math.random() > 0.49)? replay.complete() : replay.error("Erro Planejado no Replay Subject");
  }

  /*
    Pega Apenas o ultimo dado da fonte independente da onde acontece
    a inscricao, se voce se inscreve no primeiro ciclo o async so
    vai pegar no ultimo. 
    Caso a inscricao seja no primeiro ciclo de 10 com o async:
    Fonte => 1, nada //Mesmo sendo inscrito aqui ele ignora.
    Fonte => 2, nada
    Fonte => 3, nada
    Fonte => 4, nada
    Fonte => 5, nada
    Fonte => 6, nada
    Fonte => 7, nada
    Fonte => 8, nada
    Fonte => 9, nada
    Fonte => 10, async => 10
    ele eh interessante caso voce queira pegar o dado pronto.
  */
  public asyncSubject():void{
    /*
      Dessa Outra forma voce acessa criando funcoes usando recursos
      do typescript. Independente de como voce escreva, quando ela
      se tornar callback do .next ou do .error, ela vai sempre exigir
      um parametro. Assim como o do callback de completo deve ser sempre
      sem parametro. Alem disso a funcao das 3 funcoes quando forem
      usada como uma callback do subject sempre vai retornar void, 
      não adiante forcar uma saida String. Aqui colocamos um tipo
      de retorno e um parametro padrao, mas isso nao resolve, esta 
      ai apenas para deixar isso claro.
    */
  function proximo(param:string = ""):string{ //Parametro padrao e tipo de retorno vai ser ignorado.
    console.log(param);
    return param;
  };
  function erro(param:string =""):string{ //Parametro padrao e tipo retorno vai ser ignorado.
    console.error(param);
    return param;
  };
  function completo():string{ //O retorno sera void do mesmo jeito.
    console.warn("Concluido o Replay AsyncSubject com acerto simulado!");
    return "";
  };   

  const asub:AsyncSubject<any> = new AsyncSubject<any>();        
    asub.subscribe(proximo,erro,completo);

    /*
      No console.log() voce apenas vera a execucao desse next, caso o metodo
      error nao seja impresso no console.log, caso haja erro esse next nao
      aparecera no console.
    */
    asub.next("Execucao do AsyncSubject!"); //Se houver erro nem executa;
    if (Math.random() > 0.49){    //50% de chances de erro, se acerto exibe o .next e o complete.
        asub.complete();
    }else{       
      asub.error("Erro Planejado no Async Subject");
    };
  }

  /*
    O Behavior sempre comeca do anterior, alem disso ele difere
    dos outros, porque nele voce deve obrigatoriamente passar um dado 
    no construtor, esse dado sera processado, caso o behavior pegue
    o dado apartir do primeiro ciclo, lembre-se o behavior sempre
    pega do anterior, no caso de um ciclo de 1 a 10, se ele comecar
    do 1 fica:
    Fonte => 1, Behavior => {
                              0 (o valor do parametro) 
                              1 = Fonte;
    Fonte => 2, Behavior => 2
    Fonte => 3, Behavior => 3
    por ai vai...
    Se ele comecar do 5 por exemplo:
    Fonte => 1, nada
    Fonte => 2, nada
    Fonte => 3, nada
    Fonte => 4, nada
    Fonte => 5, Behavior => {
                Processa o 4 e o 5.
                }
    Fonte => 6, Behavior => 6
    Por ai vai...
    O Bahavior eh bom quando voce tem que fazer processamento 
    junto com uma constante, ou quando tem um valor padrao ou
    ate mesmo quando a operacao nao pode lidar com algum valor
    nulo, por exemplo se cada ciclo fosse uma divisao e o
    behavior diminuisse 1 para cada valor vindo na fonte,
    poderiamos ter problemas na divisao caso o valor de origem 
    fosse 1, uma vez que essa divisao seria um valor por zero...
  */
  public behaviorSubject():void{
    const behavior:BehaviorSubject<any> = new BehaviorSubject<any>(`
      Exemplo De Execucao do Behavior Subject, Esse seria o ciclo 0,
      anterior ao ciclo 1 do adicionado ao subject se adicionado 
      o observavel desde o comeco isso sera mostrado.
      `); //crase eh o template String, permite string de multiplas linhas e interpolacao
    /*
      Voce tembem pode fazer isso usando o observable e o Observer tambem, diferente
      dos 3 exemplo acimas que voce usou funcoes e o subject como Observable e observer
      ao mesmo tempo.
    */
    const observable:Observable<any> = new Observable<any>( //Aqui eh criado um observable
      //Aqui eh criado a funcao para o Observable que recebe um observer como parametro
      /* 
        Detalhe importante, no observable fica as sequencias de next, error e complete
        a serem executados, no subscribe fica a definicao da funcao de complete, error e 
        next, importante nao se confundir com isso. Depois de programar esse dois, ai
        voce escreve o BehaviorSubject ou o AsyncSubject RepeatSubject ou o subject.
      */

      //Programando a sequencia dos next e as condicoes para error e o complete.
      (observer:Observer<any>) => { //Aqui fica todo o algoritimo a ser executado a cada ciclo.
        observer.next("Exemplo De Execucao do Behavior Subject"); //ciclo 1        
        observer.next("Exemplo De Execucao do Behavior Subject"); //ciclo 2       
        if(Math.random() > 0.49){ //50% de chance de erro como nos algoritimos acima.
          observer.complete(); //Se certo executa o complete
        }else{ //Se erro executa o error.
          observer.error("Erro Planejado no Behavior Subject");
        }
      } //Fim De funcao Observer.

    );
    
    //Aqui programa o que se faz no next, o que se faz no error e o que se faz no complete.
    behavior.subscribe( //Sao 3 callbacks na seguinte sequencia: next, error, complete
      parametro => console.log(parametro), //O que se faz no next?
      erro => console.error(erro), //O que se faz no error?
      () => console.warn("Execucao do Behavior com sucesso.") //O que se faz no complete?
    )
    
    //Aqui o Observable recebe o subject com as callbacks programadas.
    observable.subscribe(behavior);

    /*
      Lembre-se sempre disso, para nao se confundir:
      1) Observable tem um tipo no diamante que sera o tipo de dado que ele ira trabalhar nos observer.
      2) O Observable recebe uma callback, cujo o parametro eh um Observer
      3) Dentro da funcao do Observer voce usa os next passando o parametro conforme a funcao que voce definiu no subject aceita,
      pense nos then das promise que fica mais facil. O next ira usar a funcao passada como callback no subscribe do subject.

      4) use o criterio para o error (se houver) ou complete(Aconselho usar para pode com uso do closed pegar os dados sempre prontos).
      5) Feito todo o passo acima crie 3 callbacks, a primeira sendo exatamente o que ocorre em cada chamada do next, a segunda
      o que ocorre se houver erro e a terceira o que ocorre quando tudo estiver concluido.
      6) As callback do next e do erro (As duas primeiras callbacks passadas no subscribe) devem aceitar 1 argumento e ser void, nao
      adianta nada exigir retorno de nenhuma das 3 que vai retornar void igual, e a terceira a ser passada que eh funcao de
      completado, essa nao recebe argumentos. Fique atento a isso.

      7) Escreva o subject no Observable. Para nao se confundir qual eh qual lembre-se do seguinte, o sub eh sempre inscrito
      pelo observer e as callbacks sao inscritas pela subject. Seguindo a hierarquia:
      3 callbacks(next,error,complete) => se inscreve => subject(subject,async,reply,behavior) => inscreve no Observable(com callback de Observer<any> como argumento)

    */

  }
}
