import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../model/task.model';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @Input() task!: TaskModel;
  @Output() taskDeleted = new EventEmitter<number>();
  constructor(private taskService: TaskService) { }

  editTask(): void {
    const newTitle = prompt("Edit task title:", this.task.title);
    const newDesc = prompt("Edit description:", this.task.description);   
    if (newTitle && newDesc) {
      this.task.title = newTitle;
      this.task.description = newDesc;
      this.taskService.updateTask(this.task);
    }
    this.taskService.cleanupFunctionalitiesWithoutTasks();
  }

  deleteTask(): void {
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTask(this.task.id);
      this.taskDeleted.emit(this.task.id);
      this.taskService.cleanupFunctionalitiesWithoutTasks();
    }
  }
}
