import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TaskComponent } from './task/task.component';
import { ColumnComponent } from './column/column.component';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { TaskService } from './service/task.service';
import { LocalStorageService } from './service/local-storage.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskComponent,
    ColumnComponent,
    FunctionalityListComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule  
  ],
  providers: [
    LocalStorageService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
