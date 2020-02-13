import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
@Component({
  selector: 'sortable-list',
  templateUrl: './sortable-list.component.html',
  styleUrls: ['./sortable-list.component.css']
})
export class SortableListComponent implements OnInit {

  private list = ['Option 1', 'Option 2', 'Option #3-adfdaf - af-adf-a -adfads -afds '];

  constructor() { }

  ngOnInit() {
  }

  //Taken from https://material.angular.io/cdk/drag-drop/overview
  drop(event: CdkDragDrop<string[]>) {
    console.log('drop()');
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }
}
