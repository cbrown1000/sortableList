import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Subscription } from 'rxjs';

import { ListService } from '../services/list.service';
import { ListItem } from '../shared/list-item.model';
@Component({
  selector: 'sortable-list',
  templateUrl: './sortable-list.component.html',
  styleUrls: ['./sortable-list.component.css']
})
export class SortableListComponent implements OnInit, OnDestroy {

  private list: ListItem[] = [];
  private listChangeSub: Subscription;
  private newItem: ListItem = null;
  constructor(private listService: ListService) {
    var nextId = this.listService.getNextId();
    this.newItem = new ListItem(nextId, nextId, '');

  }

  ngOnInit() {
    this.listChangeSub = this.listService.listChanged.subscribe(
      (items: ListItem[]) => {
        console.log('got new list');
        this.list = items;
      }
    );
  }

  ngOnDestroy() {
    this.listChangeSub.unsubscribe();

  }

  //Taken from https://material.angular.io/cdk/drag-drop/overview
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.persistChanges();
  }

  persistChanges() {
    console.log('SortableListComponent.persistChanges()');
    this.listService.persistChanges(this.list);
  }
  addNew() {
    var newId = this.listService.getNextId();
    this.list.push(new ListItem(newId, newId, this.newItem.name));
    var nextId = ++newId;
    this.newItem = new ListItem(nextId, nextId, '');
    this.persistChanges();
  }

  clearData() {
    console.log('SortableListComponent.clearData()');
    this.listService.clearData();
  }
}
