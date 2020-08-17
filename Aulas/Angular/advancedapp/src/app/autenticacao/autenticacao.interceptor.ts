import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class Interceptor implements HttpInterceptor{
    constructor(){}

    intercept(request:HttpRequest<any>, next:HttpHandler){
        /*
            Toda vez que for requisitado uma solicitacao HTTP(s) esse metodo sera chamado,
            no caso, esse metodo funciona de maneira semelhante ao express, usando o 
            padrao Middleware ou Chain of Responsability. Aqui temos dois objetos,
            o primeiro contem o dado interceptado pela aplicacao e o segundo instrucoes
            de como executar o proximo metodo dessa corrente de responsabilidade.
            Analisando: request:HttpRequest<any>
            .body => Aqui voce tem os atributos pegos de uma requisicao, ou seja os
            valores que o usuario entrou, seria os valores e campos de um post por exemplo.
            request.body.oSeuInputPorExemplo

            .headers:HttpHeaders => Cabecalhos de saida para esta solicitacao.

            .method:string => Informa o metodo usado, ex: GET, POST, DELETE, etc...

            .params:HttpParams => Parametros como o tipo da sua codificacao por exemplo, mais os parametros da URL

            .responseType:string => Tipo de dado recebido pelo servidor.

            .url:string => A url para usada no submit.

            .urlWithParams:string => A url so que com os parametros junto

            .withCredentials:boolean => Se a url tem credenciais autenticado pelo servidor

            .reportProgress:boolean => Se essa solicitacao deve ser feita de uma forma que exponha eventos de progresso.

        */                
        console.log("OLD REQUEST: ",request);        
        const newRequest = request.clone({
            /*
                A requisicao ela eh imutavel, logo os seus valores sao somente leitura, caso voce precise alterar
                algo na requisicao, voce deve clonar a requisicao, com esse metodo e adicionar o novo valor dentro
                de setHeaders como um atributo dele, dessa forma voce manipula e adiciona valores a uma requisicao
                HTTP.
            */
            setHeaders:{
                novoValor:"meuNovoValor"
            }
        });
        
        console.log("NEW REQUEST: ", newRequest);
        console.log("Returning Handle:",next)
        return next.handle(newRequest); //Repare que a requisicao enviada eh a clonada...
    }    
}