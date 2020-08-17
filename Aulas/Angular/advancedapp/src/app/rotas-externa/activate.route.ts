//Bibliotecas necessarias.
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

//Essa classe exige que seja injetavel, ela trabalha com DI, no caso esse arquivo esta sendo
//Essa classe eh injetada dentro do objeto de rotas no app.modules.ts
@Injectable({
    providedIn:"root"
})

//Para que tudo funcione, voce precisa importar a interface CanActivate
export class RouteRules implements CanActivate{

    //Esse eh o metodo exigido pelo CanActivate
    public canActivate(
        /*
            ActivatedRouteSnapshot => Esse objeto ele contem os dados do usuario:
            .routeConfig => A configuração usada para corresponder a esta rota.
            .url => Os segmentos de URL correspondidos por esta rota.
            .params => Os parâmetros da matriz com escopo para esta rota.
            .queryParams => Os parâmetros de consulta compartilhados por todas as rotas.
            .fragment => O fragmento de URL compartilhado por todas as rotas.
            .data => Os dados estáticos e resolvidos desta rota.
            .outlet => O nome da saída da rota.
            .component => O componente da rota.
            .root => A raiz do estado do roteador.
            .parent => O pai desta rota na árvore de estado do roteador.
            .firstChild => O primeiro filho desta rota na árvore de estado do roteador.
            .children => Os filhos desta rota na árvore de estado do roteador.
            .pathFromRoot =>O caminho da raiz da árvore de estado do roteador para esta rota.
        */
        route:ActivatedRouteSnapshot, 

        //dentro desse objeto tem o atributo ".url:string" => Representa o estado do roteador em um determinado momento.
        state:RouterStateSnapshot
    ){
        console.log("ActivatedRouteSnapshot:",route);
        console.log("RouterStateSnapshot",state);
        /*
            Esse metodo precisa ter um retorno, sendo ou valores booleano ou um Observable de booleano. Se falso a 
            rota eh bloqueada, se true eh altorizada, e voce pode usar os dois objetos acima para programar a logica
            para que aqui seja true ou false, ou um observable booleano.
        */
        return true; 
    }
}