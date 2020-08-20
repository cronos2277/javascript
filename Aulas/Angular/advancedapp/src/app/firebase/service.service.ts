import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../firebase/table.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private firestore:AngularFirestore
  ) { }

  private collection:AngularFirestoreCollection<User> = this.firestore.collection("users");

  public getProducts():Observable<User[]>{
    return this.collection.valueChanges();
  }

  public add(user:User):Promise<any>{
    return this.collection.add(user)
    .then(
      _ => alert("the user was added!")
    )
    .catch(
      _ => alert("Error on submiting the user.")
    );
  }
}
