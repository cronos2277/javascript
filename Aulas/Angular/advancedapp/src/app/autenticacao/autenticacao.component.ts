import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs';
import { Person } from './person';
import { Product } from './product';

@Component({
  selector: 'autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  people$:Observable<Person[]> = null;
  products$:Observable<Product[]> = null;
  mensagemErro:string = "Nenhum elemento a ser exibido";
  constructor(private servico:ServicoService) { }

  ngOnInit() {
    this.people$ = this.servico.getPeople();
    this.people$.subscribe();
    this.products$ = this.servico.getProducts();    
  }

}
