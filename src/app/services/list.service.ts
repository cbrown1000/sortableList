import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ListItem } from '../shared/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  listChanged = new Subject<ListItem[]>();
  private dbName = 'ListChallenge';


  constructor() {
    console.log('constructor()');
    this.listChanged.next([new ListItem(1, 'Loading...')]);

    this.getDB();
  }

  getDB() {
    //console.log('getting DB...');
    var dbRequest = window.indexedDB.open(this.dbName, 1);
    dbRequest.onerror = (event) =>{
      this.listChanged.next([new ListItem(1, 'The list failed to load from indexedDB')]);
    }

    dbRequest.onsuccess =  (event) => {
      console.log('dbRequest.onsuccess');
      var db: IDBDatabase = event.target.result;
      this.getList(db);

    }

    dbRequest.onupgradeneeded = (event) => {
      console.log('onupgradeneeded');
      var db: IDBDatabase = event.target.result;

      //Add some data
      var listFromDB = [new ListItem(1, 'Option #1!'),
      new ListItem(2, 'Option 2'),
      new ListItem(3, 'Option #3-adfdaf  ')];

      this.storeList(db, listFromDB);

    }

  }

  /* Get the list from the database and update listChanged Subject*/
  getList(db: IDBDatabase) {
    var transaction = db.transaction(["list"]);
    var objStore = transaction.objectStore("list");
    var request = objStore.getAll();
    request.onerror = (event) => {
      this.listChanged.next([new ListItem(1, 'The list failed to load from indexedDB')]);
    }

    request.onsuccess = (event) => {
      var items = event.target.result;
      console.log('Got results:  ' + items);
      this.listChanged.next(items.slice());
    }
  }
  /* Store the passed in list */
  storeList(db: IDBDatabase, items: ListItem[]) {
    var objStore = db.createObjectStore("list", { keyPath: "id" });

    objStore.createIndex("name", "name", { unique: false });
    objStore.transaction.oncomplete = (event) => {
      var listObjStore = db.transaction("list", "readwrite").objectStore("list");
      items.forEach((item) => {
        listObjStore.add(item);
      });
    }

  }

}