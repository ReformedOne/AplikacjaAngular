import { Injectable } from '@angular/core';
import { FunctionalityModel } from '../model/functionality.model';
import { TaskModel } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private TASK_KEY = 'tasks';
  private FUNCTIONALITY_KEY = 'functionalities';

  getTasks(): TaskModel[] {
    const tasks = localStorage.getItem(this.TASK_KEY);
    console.log("Service tasks log",tasks);
    return tasks ? JSON.parse(tasks) : [];
  }

  setTasks(tasks: TaskModel[]): void {
    localStorage.setItem(this.TASK_KEY, JSON.stringify(tasks));
  }

  getFunctionalities(): FunctionalityModel[] {
    const functionalities = localStorage.getItem(this.FUNCTIONALITY_KEY);
    console.log("Service functionalites log",functionalities);
    return functionalities ? JSON.parse(functionalities) : [];
  }

  setFunctionalities(functionalities: FunctionalityModel[]): void {
    localStorage.setItem(this.FUNCTIONALITY_KEY, JSON.stringify(functionalities));
  }
  
}
