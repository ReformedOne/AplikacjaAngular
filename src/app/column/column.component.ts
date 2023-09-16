import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from '../model/task.model';
import { TaskService } from '../service/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
  @Input() columnId: number = 0;
  @Input() columnTitle: string = '';
  @Input() connectedTo: string[] = [];
  tasks: TaskModel[] = []; // This is now a local property.
  @Output() taskDropped = new EventEmitter<CdkDragDrop<TaskModel[]>>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasksByColumn(this.columnId); 
  }

  removeTaskFromView(taskId: number): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    this.refreshTasks();
  }

  addNewTask(): void {
    const title = prompt('Enter task title:', 'New Task');
    const description = prompt('Enter task description:', 'Task description...');
    const functionality = prompt('Enter task functionality number:', 'Task functionality');
  
    if (title && description && functionality) {
      this.taskService.addTaskToColumn(this.columnId, title, functionality, description);
      this.refreshTasks();
    }
  }
  
  refreshTasks(): void {
    this.tasks = this.taskService.getTasksByColumn(this.columnId);
  }

  onTaskDropped(event: CdkDragDrop<TaskModel[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      const movedTask: TaskModel = event.container.data[event.currentIndex];
      movedTask.column = this.columnId; 
      console.log('Dragged Item:', event.item);
      this.taskService.updateTask(movedTask);
      this.taskService.updateTasksInLocalStorage();
    }
    this.taskService.cleanupFunctionalitiesWithoutTasks();
    this.taskDropped.emit(event); 
  }
}
