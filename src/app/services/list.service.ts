import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ListItem } from '../shared/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  listChanged = new Subject<ListItem[]>();
  private dbName = 'ListChallenge';
  private db: IDBDatabase = null;
  private nextId: number = 0;


  constructor() {
    this.listChanged.next([new ListItem(1, 1, 'Loading...')]);

    this.getDB();
  }

  getDB() {
    //console.log('getting DB...');
    var dbRequest = window.indexedDB.open(this.dbName, 1);
    dbRequest.onerror = (event) =>{
      this.listChanged.next([new ListItem(1, 1, 'The list failed to load from indexedDB')]);
    }

    dbRequest.onsuccess =  (event) => {
      console.log('dbRequest.onsuccess');
      this.db = event.target['result'];
      this.getList(this.db);

    }

    dbRequest.onupgradeneeded = (event) => {
      console.log('onupgradeneeded');
      var db: IDBDatabase = event.target['result'];

      //Add some data
      var listFromDB = [new ListItem(1, 1, 'Option #1!'),
      new ListItem(2, 2, 'Option 2'),
      new ListItem(3, 3, 'Option #3-adfdaf  ')];

      this.storeList(db, listFromDB);

    }

  }

  /* Get the list from the database and update listChanged Subject*/
  getList(db: IDBDatabase) {
    var transaction = db.transaction(["list"]);
    var objStore = transaction.objectStore("list");
    var request = objStore.getAll();
    request.onerror = (event) => {
      this.listChanged.next([new ListItem(1, 1, 'The list failed to load from indexedDB')]);
    }

    request.onsuccess = (event) => {
      var items = event.target['result'];
      items.sort(ListItem.sortCompare);
      this.setNextId(items);
      this.listChanged.next(items.slice());
    }
  }
  /* Store the passed in list */
  private storeList(db: IDBDatabase, items: ListItem[]) {
    var objStore = db.createObjectStore("list", { keyPath: "id" });

    objStore.createIndex("name", "name", { unique: false });
    objStore.transaction.oncomplete = (event) => {
      var listObjStore = db.transaction("list", "readwrite").objectStore("list");
      items.forEach((item) => {
        listObjStore.add(item);
      });
    }

  }

  /**
   * Clearing then adding all items.
   * @param items
   */
  persistChanges(items: ListItem[]) {
    console.log('persistChanges()!');
    //Persist Changes
    this.updateSortOrder(items);

    var listObjStore = this.db.transaction("list", "readwrite").objectStore("list");

    var clr = listObjStore.clear();

    clr.onsuccess = (event) => {
      items.forEach((item) => {
        listObjStore.add(item);


      })
    }

    //Refresh List
    this.getList(this.db);
  }

  clearData() {
    console.log('Clear Data');
    var listObjStore = this.db.transaction("list", "readwrite").objectStore("list");

    var clr = listObjStore.clear();

    clr.onsuccess = (event) => {
    //Refresh List
      this.getList(this.db);
    }
  }


  private updateSortOrder(items: ListItem[]) {
    var i = 1;
    items = items.filter(item => item.name !== '');

    items.forEach((item) => {
      item.sortNum = i++;
    })
  }

  //This should probably just query the db; but don't have time to figure that out right now
  public getNextId() {
    return this.nextId;
  }
  setNextId(items: ListItem[]) {
    var id: number = 0;
    items.forEach(item => {
      if (item.id > id) {
        id = item.id;
      }
    });

    this.nextId = ++id;
  }

}
