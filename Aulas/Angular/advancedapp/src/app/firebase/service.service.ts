import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../firebase/table.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    /*
      Nos o usamos para criar uma collection, ele seria uma especie de "Objeto Connection"
      do PHP ou do Java. Com o uso do metodo .collection("NomeDoBanco") ele consegue retornar
      um objeto que tem todas as funcionalidades para a conexao com o Firebase.
    */
    private firestore:AngularFirestore
  ) { }

  //Definindo o nome do BD.
  private readonly databaseName:string = "users"; //Usamos uma variavel para a criacao do nome do banco no firebase.
  /*
    No caso voce passa dentro mo metodo collection de um objeto AngularFirestoreCollection,
    o nome do seu banco de dados no firebase, se existe ele usa o banco que existe, se nao
    existe ele cria um novo. Repare que o valor retornado para esse metodo, sera usado para
    fazer a conexao com o banco de dados, ele seria como se fosse o Statement do JDBC ou do PHP.
    Porem diferente deles que exigem a criacao de um objeto connect, ele consegue fazer tudo isso
    passando o nome do banco de dados como uma string
  */
  private collection:AngularFirestoreCollection<User> = this.firestore.collection(this.databaseName);

  public getProducts():Observable<User[]>{
    console.log("AngularFirestore: ",this.firestore);
    console.log("AngularFirestoreCollection<User>: ",this.collection);
    /*
      Veja so, esse metodo collection ele eh o "Statement" que criamos acima, porem seguindo o padrao
      Observer, esse metodo retorna um Observable, no template se voce fizer a inscricao dele usando
      o |async, toda vez que houver uma alteracao no banco de dados, o registro eh atualizado na pagina,
      ou seja no template, o Observable retornado por esse objeto, uma vez inscrito ele atualiza a lista
      dos registros que ele contem.
    */
    return this.collection.valueChanges();
  }

  public add(user:User):Promise<any>{    
    const id = this.firestore.createId(); //Esse metodo cria o ID a ser usado
    console.log("creating id",id);
    user.id = id;
    /*
      Essa forma abaixo seria uma nova forma de se criar um registro, mas a funcao add
      nao permite vincular o ID usado pela aplicacao na Entidade que usamos.
      o metodo add assim como o doc().set() retorna uma promise. Se for usar o
      metodo add, voce nao precisa criar um id como fizemos acima.
    */
    // return this.collection.add(user)
    return this.collection.doc(id).set(user)   
    /*
      O metodo doc aceita como argumento uma string que sera o ID que voce ira usar.
      no caso esse id foi criado pelo metodo createId do AngularFirestore, o set(Entidade)
      eh o que faz o novo registro no firebase.
    */ 
    .then(
      _ => alert("the user was added!")
    )
    .catch(
      _ => alert("Error on submiting the user.")
    )   
  }

  public update(user:User){
    return this.collection.doc(user.id).set(user)
    .then(
        _ => alert("The user was updated!")
    ).catch(
      _ => alert("Error on updating the user.")
    );
  }

  public delete(user:User){
    return this.collection.doc(user.id)
    .delete().then(
      _ => alert("The user was removed!")
    ).catch(
      _ => alert("Error on removing the user.")
    );
  }
 
}
