import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Project} from "../model/project";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  constructor() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newProject: Project = {
        id: undefined,
        name: form.value.name,
        description: form.value.description,
        createdAt: new Date(form.value.createdAt),
        deadline: new Date(form.value.deadline),
        hourEstimate: form.value.hourEstimate,
        price: form.value.price,
      };
      console.log('New Project:', newProject);
      // Implement further logic to handle the created project (e.g., save to a service or backend)
    }
  }
}
