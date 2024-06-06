import {Task} from "./task";

export interface Bucket {
  id: number;
  name: string;
  projectId: string;
  tasks: Task[];
}
