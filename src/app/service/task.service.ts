import { Injectable } from '@angular/core';
import { TaskModel } from '../model/task.model';
import { FunctionalityModel } from '../model/functionality.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  getTasksByColumn(columnId: number): TaskModel[] {
    return this.getAllTasks().filter(task => task.column === columnId);
  }

  tasks: TaskModel[] = [
    new TaskModel(1, 'Task 1', 1, 101, 'Description for Task 1'),
    new TaskModel(2, 'Task 2', 2, 102, 'Description for Task 2'),
    new TaskModel(3, 'Task 3', 3, 103, 'Description for Task 3'),
  ];

  functionalities: FunctionalityModel[] = [
    new FunctionalityModel(101, 'Functionality for Task 1'),
    new FunctionalityModel(102, 'Functionality for Task 2'),
    new FunctionalityModel(103, 'Functionality for Task 3'),
  ];

  constructor(private localStorageService: LocalStorageService) {
    this.tasks = this.localStorageService.getTasks() || [];
    this.functionalities = this.localStorageService.getFunctionalities() || [];
  }

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  updateTask(updatedTask: TaskModel): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.updateTasksInLocalStorage();
    }
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.updateTasksInLocalStorage();
    }
  }

  getAllFunctionalities(): FunctionalityModel[] {
    return this.functionalities;
  }

  addFunctionality(functionality: FunctionalityModel): void {
    this.functionalities.push(functionality);
    this.updateFunctionalitiesInLocalStorage();
  }

  addFunctionalityWithName(functionalityName: string): FunctionalityModel {
    const newId = this.generateFunctionalityId();
    const newFunctionality = new FunctionalityModel(newId, functionalityName);
    this.functionalities.push(newFunctionality);
    this.updateFunctionalitiesInLocalStorage();
    return newFunctionality; 
  }

  addDefaultTaskToFunctionality(functionality: FunctionalityModel): void {
    const defaultTaskTitle = `Default Task for ${functionality.description}`;
    const defaultTaskDescription = `Description for ${defaultTaskTitle}`;
    // Let's assume columnId is 1 for default tasks, adjust as needed.
    this.addTaskToColumn(1, defaultTaskTitle, functionality.description, defaultTaskDescription);
    this.updateTasksInLocalStorage();
  }
  
  updateFunctionality(updatedFunctionality: FunctionalityModel): void {
    const index = this.functionalities.findIndex(func => func.id === updatedFunctionality.id);
    if (index !== -1) {
      this.functionalities[index] = updatedFunctionality;
      this.updateFunctionalitiesInLocalStorage();
    }
  }

  deleteFunctionality(id: number): void {
    const index = this.functionalities.findIndex(func => func.id === id);
    if (index !== -1) {
      this.functionalities.splice(index, 1);
      this.updateFunctionalitiesInLocalStorage();
    }
  }

  updateTasksInLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateFunctionalitiesInLocalStorage(): void {
      localStorage.setItem('functionalities', JSON.stringify(this.functionalities));
  }


  private generateId(): number {
    return Math.max(...this.tasks.map(t => t.id)) + 1;
  }

  private generateFunctionalityId(): number {
    return Math.max(...this.functionalities.map(f => f.id)) + 1;
  }

  addTaskToColumn(columnId: number, title: string, functionalityName: string, description: string): void {
    let functionalityId = this.getOrAddFunctionality(functionalityName);
    
    const newTask = new TaskModel(this.generateId(), title, columnId, functionalityId, description);
    this.tasks.push(newTask);
    this.updateTasksInLocalStorage();
  }
  
  getOrAddFunctionality(functionalityName: string): number {
    const functionality = this.functionalities.find(f => f.description === functionalityName);
    
    if (functionality) {
      return functionality.id;
    }
    
    const newId = this.generateFunctionalityId();
    this.functionalities.push(new FunctionalityModel(newId, functionalityName));
    this.updateFunctionalitiesInLocalStorage();
    return newId;
  }

  cleanupFunctionalitiesWithoutTasks(): void {
  const functionalitiesToDelete = [];

  for (let functionality of this.functionalities) {
    const hasTask = this.tasks.some(task => task.functionalityId === functionality.id);
    if (!hasTask) {
      functionalitiesToDelete.push(functionality.id);
    }
  }

  for (let functionalityId of functionalitiesToDelete) {
    this.deleteFunctionality(functionalityId);
  }
}

}