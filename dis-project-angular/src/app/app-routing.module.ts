import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectComponent} from "./project/project.component";
import {ProjectsComponent} from "./projects/projects.component";
import {CreateProjectComponent} from "./create-project/create-project.component";

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'projects/:id', component: ProjectComponent},
  { path: 'create-project', component: CreateProjectComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
