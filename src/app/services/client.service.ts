import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection('clients');
   }

  getClients() {
    return this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  persistClient(client) {
    return this.clientsCollection.add(client);
  }

  deleteClient(id) {
    return this.clientsCollection.doc(id).delete();
  }
}
