import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SortableListComponent } from './sortable-list/sortable-list.component';
import { ListService } from './services/list.service';

@NgModule({
  declarations: [
    AppComponent,
    SortableListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [ListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
