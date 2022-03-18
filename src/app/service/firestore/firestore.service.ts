import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  //Crea un nuevo gato
  public createCat(data: { nombre: string, url: string }) {
    return this.firestore.collection('cats').add(data);
  }
  //Obtiene un gato
  public getCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getCats() {
    return this.firestore.collection('cats').snapshotChanges();
  }
  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }
  // Borra un gato
  public deleteCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).delete();
  }

  //! Ejercicio formulario

  public createPerson(data: any) {
    return this.firestore.collection('persons').add(data);
  }

  public getPerson(documentId: string) {
    return this.firestore.collection('persons').doc(documentId).snapshotChanges();
  }

  public getAllPersons() {
    return this.firestore.collection('persons').snapshotChanges();
  }

  public updatePerson(documentId: string, data: any) {
    return this.firestore.collection('persons').doc(documentId).set(data);
  }

  public deletePerson(documentId: string) {
    return this.firestore.collection('persons').doc(documentId).delete();
  }

}
