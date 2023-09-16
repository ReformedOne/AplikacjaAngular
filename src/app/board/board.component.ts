import { Component } from '@angular/core';
import { TaskService } from '../service/task.service';
import { TaskModel } from '../model/task.model';
import { ColumnModel } from '../model/column.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  columns: ColumnModel[] = [
    new ColumnModel(1, 'Column 1'),
    new ColumnModel(2, 'Column 2'),
    new ColumnModel(3, 'Column 3'),
    new ColumnModel(4, 'Column 4'),
    new ColumnModel(5, 'Column 5')
  ];

  constructor(private taskService: TaskService) {}

  getConnectedColumnIds(currentColumnId: number): string[] {
    return this.columns
      .filter(column => column.id !== currentColumnId)
      .map(column => 'column-' + column.id);
  }

  handleTaskDrop(event: CdkDragDrop<TaskModel[]>): void {
      this.taskService.updateTasksInLocalStorage(); 
  }
}
