import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ListItem } from '../shared/list-item.model';
//Some of this code was taken from https://material.angular.io/components/dialog/overview

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item: ListItem;
  @Output("persistChanges") persistChanges: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editItem() {
    console.log('Item:  ' + this.item.name);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.item.name, id: this.item.id, sortNum: this.item.sortNum }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.item.name = result;
      this.persistChanges.emit();
    });

  }

}


@Component({
  selector: 'list-item-edit-dialog',
  templateUrl: 'list-item-edit-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ListItem
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
