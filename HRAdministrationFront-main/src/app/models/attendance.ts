import { User } from "./user";

export interface Attendance {
        attendance_id: number;
        date: string;
        start_time: string;
        end_time: string; 
        user: User;       
}