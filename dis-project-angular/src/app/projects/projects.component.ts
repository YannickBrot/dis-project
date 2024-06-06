import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }
}
