import { Component, OnInit } from '@angular/core';

//Voce precisa desse import se quiser pegar parametros na url
/*

  ActivatedRoute => esse objeto se faz necessario para tratar parametros.
  ParamMap => o tipo de dado recebido pela requisicao.
  Router => Util se quiser lidar com redirecionamentos.
*/
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  constructor(
    private route:ActivatedRoute, //Precisamos fazer uma injecao com o ActivatedRoute
    private router:Router
    ) { }
  public parametro:string=""; //A variavel que vai exibir o parametro no template
  ngOnInit() {
    /*
      O atributo paramMap de objeto ActivatedRoute eh um objeto do tipo Observer, 
      como eh um observer, qualquer mudanca no parametro o valor eh alterado 
      aqui. O Objeto em questao eh do tipo ParamMap. O valor passado como 'parametro'
      dentro da String, eh o valor 'parametros/:parametro', esse parametro com 
      dois pontos definido la no app.module.ts. O valor que voce passar com : la na url,
      quando for programar a rota deve ser definido sem os ":" no parametro da String.
    */
    this.route.paramMap.subscribe(
      (data:ParamMap) => this.parametro = data.get('parametro')
    )
  }

  voltar():void{
    /*
      O atributo do tipo Router, faz o redirecionamento a outras rotas
    */
    this.router.navigate(['/padrao']);
  }

}
