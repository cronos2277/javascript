import { Component, OnInit } from '@angular/core';
import { Model } from './command.model';
import { Store, select } from '@ngrx/store';
import { CmdState } from './command.state';
import { Observable } from 'rxjs';
import { GetterNew, GetterAll, GetterUpdate, GetterDelete } from './command.actions';


@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.css']
})
export class NgrxComponent implements OnInit {
  commands$:Observable<Model[]>
  constructor(
    /*
      O store ele exige um state como parametro
      dentro do diamante. Aqui eh feito o gerenciamento
      de estados, no caso nos passamos um state
      para ele e esse mesmo objeto faz o gerenciamento
      de estado, nesse caso o CmdState, veja o
      arquivo: command.state.ts para mais informacoes.
    */
    private store:Store<CmdState>
  ) { }

  ngOnInit() {
    /*
      Esse comando nao fara a menor diferenca, uma vez que
      nos nao temos um backend, mas caso tivessemos um backend,
      seria interessante dar um dispatch na action que carrega
      todos os registros antes de comecar e essa abaixo, seria
      em tese, caso houvesse backend essa action.
    */
    this.store.dispatch(new GetterAll());
    /*
      Aqui o estado eh processado e passado ao observable,
      que por sua vez sera o responsavel pelo gerenciamento.
      o objeto store eh um Observable do tipo informado no
      diamante. O operador select eh um operador proprio
      do NGRX e o mesmo precisa como parametro em forma
      de string o nome do atributo especificado no objeto
      ActionReducerMap, ao criar esse objeto voce cria
      um atributo que recebe o resultado dos reducers,
      o nome dele deve ser posto aqui.
      Esse nome eh o mesmo da interface, CmdState.
      Verifique o arquivo command.state.ts para
      mais informacoes.
    */
    this.commands$ = this.store.pipe(select('model'));
  }

  public addNew(){        
    let cmd:Model = {
      value:(Math.random() * 1000).toString(),
      date:new Date(),
      _id: new Date().getMilliseconds().toString()
    }
    /*
      Para voce adicionar um novo elemento, voce precisa
      dar um dispatch, para tal, voce instancia um objeto
      e passa o objeto criado como payload no parametro
      do objeto criado. Nesse caso estamos usando como
      parametro do dispatch uma action que eh a GetterNew,
      voce pode ver mais detalhes sobre ela, em command.actions.ts
      e o funcionamento em command.reducer.ts
    */
    this.store.dispatch(new GetterNew(cmd));    
  }

  public update(model:Model,index:number){             
    let cmd:Model = {
      value:(Math.random() * 1000).toString(),
      date:new Date(),
      _id:new Date().getMilliseconds().toString(),
      index:index      
    }
      this.store.dispatch(new GetterUpdate(cmd));      
  }

  public delete(model:Model){
    this.store.dispatch(new GetterDelete(model));
  }
}
