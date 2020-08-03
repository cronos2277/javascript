import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs';
import { User } from './User.model';


@Component({
  selector: 'autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  users$:Observable<User[]> = null;  
  mensagemErro:string = "Nenhum elemento a ser exibido";
  constructor(private servico:ServicoService) { }

  ngOnInit() {
    this.users$ = this.servico.getUsers();   
  }

}
