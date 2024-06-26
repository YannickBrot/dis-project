import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Bucket } from '../model/bucket';
import { Task } from '../model/task';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  buckets: Bucket[] = [];
  newTask: Task = {
    id: 0,
    name: '',
    description: '',
    bucketId: 0
  };
  projectId: number | undefined;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.projectId = Number(params.get('id'));
        return this.projectService.getBucketsForProject(this.projectId);
      })
    ).subscribe(
      (buckets) => {
        this.buckets = buckets;
      },
      (error) => console.error('Error fetching buckets', error)
    );
  }

  addTask(bucketId: number): void {
    if (this.newTask.name && this.newTask.description) {
      const newTask: Task = { ...this.newTask, id: this.generateId(), bucketId };
      this.projectService.createTask(newTask).subscribe(
        (task) => {
          const bucket = this.buckets.find(b => b.id === bucketId);
          if (bucket) {
            bucket.tasks.push(task);
            this.newTask.name = '';
            this.newTask.description = '';
          }
        },
        (error) => console.error('Error creating task', error)
      );
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  deleteTask(taskId: number | undefined, bucketId: number | undefined): void {
    if (taskId === undefined || bucketId === undefined) {
      console.error('Invalid task or bucket ID');
      return;
    }

    this.projectService.deleteTask(taskId).subscribe(
      () => {
        const bucket = this.buckets.find(b => b.id === bucketId);
        if (bucket) {
          bucket.tasks = bucket.tasks.filter(task => task.id !== taskId);
        }
      },
      (error) => console.error('Error deleting task', error)
    );
  }

  moveTaskUp(bucketId: number, taskId: number): void {
    const bucket = this.buckets.find(b => b.id === bucketId);
    if (bucket) {
      const index = bucket.tasks.findIndex(t => t.id === taskId);
      if (index > 0) {
        [bucket.tasks[index], bucket.tasks[index - 1]] = [bucket.tasks[index - 1], bucket.tasks[index]];
      }
    }
  }

  moveTaskDown(bucketId: number, taskId: number): void {
    const bucket = this.buckets.find(b => b.id === bucketId);
    if (bucket) {
      const index = bucket.tasks.findIndex(t => t.id === taskId);
      if (index < bucket.tasks.length - 1) {
        [bucket.tasks[index], bucket.tasks[index + 1]] = [bucket.tasks[index + 1], bucket.tasks[index]];
      }
    }
  }

  moveTaskToBucket(taskId: number, sourceBucketId: number, targetBucketId: number): void {
    const sourceBucket = this.buckets.find(b => b.id === sourceBucketId);
    const targetBucket = this.buckets.find(b => b.id === targetBucketId);
    if (sourceBucket && targetBucket) {
      const taskIndex = sourceBucket.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        const [task] = sourceBucket.tasks.splice(taskIndex, 1);
        task.bucketId = targetBucketId;
        targetBucket.tasks.push(task);
        this.projectService.updateTask(task).subscribe(
          (updatedTask) => console.log('Task updated successfully', updatedTask),
          (error) => console.error('Error updating task', error)
        );
      }
    }
  }
}
