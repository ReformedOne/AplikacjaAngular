import { Component, OnInit } from '@angular/core';
import { FunctionalityModel } from '../model/functionality.model';
import { TaskService } from '../service/task.service';  // <-- Adjust this import path to point to your TaskService
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.css']
})
export class FunctionalityListComponent implements OnInit {
  functionalities: FunctionalityModel[] = [];
  newFunctionalityName: string = '';

  constructor(private taskService: TaskService) { }  // <-- Using TaskService here

  ngOnInit(): void {
    this.functionalities = this.taskService.getAllFunctionalities();  // <-- Get functionalities from TaskService
  }

  addNewFunctionality(): void {
    if (this.newFunctionalityName) {
      const newFunctionality = this.taskService.addFunctionalityWithName(this.newFunctionalityName);
      if (newFunctionality) {
        this.taskService.addDefaultTaskToFunctionality(newFunctionality);
      }
      this.newFunctionalityName = '';  // Clear the input
    }
  }
}
