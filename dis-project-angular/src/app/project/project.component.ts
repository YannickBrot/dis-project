import { Component, OnInit } from '@angular/core';
import { Bucket } from '../model/bucket';
import { Task } from '../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  buckets: Bucket[] = [
    {
      id: 'bucket1',
      name: 'To Do',
      projectId: 'project1',
      tasks: [
        {
          id: 'task1',
          name: 'Design the UI',
          description: 'Create the initial UI design',
          bucketId: 'bucket1'
        },
        {
          id: 'task2',
          name: 'Set up the database',
          description: 'Install and configure the database',
          bucketId: 'bucket1'
        }
      ]
    },
    {
      id: 'bucket2',
      name: 'Doing',
      projectId: 'project1',
      tasks: [
        {
          id: 'task3',
          name: 'Write API endpoints',
          description: 'Develop the necessary API endpoints',
          bucketId: 'bucket2'
        },
        {
          id: 'task4',
          name: 'Implement authentication',
          description: 'Add user authentication and authorization',
          bucketId: 'bucket2'
        }
      ]
    },
    {
      id: 'bucket3',
      name: 'Done',
      projectId: 'project1',
      tasks: [
        {
          id: 'task5',
          name: 'Test the application',
          description: 'Perform unit and integration tests',
          bucketId: 'bucket3'
        },
        {
          id: 'task6',
          name: 'Deploy to production',
          description: 'Deploy the application to the production environment',
          bucketId: 'bucket3'
        }
      ]
    }
  ];

  newTask: Task = {
    id: undefined,
    name: '',
    description: '',
    bucketId: ''
  };

  constructor() { }

  ngOnInit(): void { }

  addTask(bucketId: string): void {
    if (this.newTask.name && this.newTask.description) {
      const newTask: Task = { ...this.newTask, id: this.generateId(), bucketId };
      const bucket = this.buckets.find(b => b.id === bucketId);
      if (bucket) {
        bucket.tasks.push(newTask);
        // Reset new task fields
        this.newTask.name = '';
        this.newTask.description = '';
      }
    }
  }

  generateId(): string {
    return 'task' + Math.random().toString(36).substr(2, 9);
  }

  drop(event: CdkDragDrop<Task[]>, bucketId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].bucketId = bucketId;
    }
  }
}
