export enum Roles {
    ROLE_EMPLOYEE = 'ROLE_EMPLOYEE',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_ADMINHR = 'ROLE_ADMINHR'
  }
  
export interface User {
  id?: number;
  email: string;
  password: string;
  role: Roles;
  baseSalary?: number; 
  firstname?: string; 
  lastname?: string; 
  displayPictureFilename?: string;
  job?: string; 
  datejoined?: string; 
  resetToken?: string; 
  tasks: string[];
}
