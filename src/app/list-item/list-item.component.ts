import { Component, OnInit, Input } from '@angular/core';
import { ListItem } from '../shared/list-item.model';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item: ListItem;

  constructor() { }

  ngOnInit() {
  }

}
