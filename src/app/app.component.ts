import { Component } from '@angular/core';
import { TaskService } from './service/task.service';
import { LocalStorageService } from './service/local-storage.service';
import { TaskModel } from './model/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private taskService: TaskService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    if (!this.localStorageService.getFunctionalities().length) {
      this.localStorageService.setFunctionalities(this.taskService.getAllFunctionalities());
    } else {
      // Initialize service with local storage data
      this.taskService.functionalities = this.localStorageService.getFunctionalities();
    }
  
    if (!this.localStorageService.getTasks().length) {
      this.localStorageService.setTasks(this.taskService.getAllTasks());
    } else {
      // Initialize service with local storage data
      this.taskService.tasks = this.localStorageService.getTasks();
    }
  }
  
}
