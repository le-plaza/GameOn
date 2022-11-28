import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFirestore
  ) { }

  getData(tabla: string) {
    return this.db.collection(tabla).valueChanges({ idField: 'id' });
  }

  getById(tabla: string, id: string) {
    return this.db.collection(tabla).doc(id).valueChanges({ idField: 'id' });
  }

  setData(tabla: string, data: any) {
    return this.db.collection(tabla).doc().set(data);
  }

  deleteData(tabla: string, id: string) {
    return this.db.collection(tabla).doc(id).delete();
  }
}
