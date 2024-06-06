import { Component, OnInit } from '@angular/core';
import {Project} from "../model/project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    {
      id: 'project1',
      name: 'New Website Development',
      description: 'Develop a new company website',
      createdAt: new Date('2023-01-01'),
      deadline: new Date('2023-06-01'),
      hourEstimate: 500,
      price: 10000
    },
    {
      id: 'project2',
      name: 'Mobile App',
      description: 'Develop a mobile application for both iOS and Android',
      createdAt: new Date('2023-02-01'),
      deadline: new Date('2023-08-01'),
      hourEstimate: 800,
      price: 20000
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
