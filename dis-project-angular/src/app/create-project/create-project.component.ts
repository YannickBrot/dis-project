import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../model/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  constructor(private projectService: ProjectService) {}

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

      this.projectService.createProject(newProject).subscribe(
        (project) => {
          console.log('Project created successfully', project);
          form.reset();
        },
        (error) => {
          console.error('Error creating project', error);
        }
      );
    }
  }
}
