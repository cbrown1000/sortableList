import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SortableListComponent } from './sortable-list/sortable-list.component';
import { ListService } from './services/list.service';
import { ListItemComponent, DialogOverviewExampleDialog } from './list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SortableListComponent,
    ListItemComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
