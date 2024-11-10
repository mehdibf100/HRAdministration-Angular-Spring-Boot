import { User } from "./user";
export enum ComplaintStatus{
    NOT_RESOLVED = 'NOT_RESOLVED',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED'
  
}
export interface Complaint {
    id: number;
    title: string;
    description: string;
    status: ComplaintStatus;
    createdDate: string; 
    updatedDate: string;
    resolutionDate?: string; 
    filedBy: User; 
  }
  