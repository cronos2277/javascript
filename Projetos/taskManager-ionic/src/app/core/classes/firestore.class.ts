import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends {id:string}> {

    protected collection:AngularFirestoreCollection<T>;

    constructor(protected db:AngularFirestore){}

    protected setCollection(path:string, queryFn?:QueryFn):void{
        this.collection = path ? this.db.collection(path, queryFn):null;
    }

    public getAll():Observable<T[]>{        
        return this.collection.valueChanges();
    }

    public get(id: string):Observable<T>{
        return this.collection.doc<T>(id).valueChanges();
    }

    private setItem(item: T, operation:string):Promise<T>{
        return this.collection.doc<T>(item.id)[operation](item)
        .then(() => item);
    }

    public create(item: T):Promise<T>{
        item.id = this.db.createId();
        return this.setItem(item,'set');
    }

    public update(item: T){
        return this.setItem(item,'update');
    }

    public delete(item: T):Promise<void>{
        return this.collection.doc<T>(item.id).delete();
    }
}
