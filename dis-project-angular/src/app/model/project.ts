export interface Project {
  id: number | undefined;
  name: string;
  description: string;
  createdAt: Date;
  deadline: Date;
  hourEstimate: number;
  price: number;
}
