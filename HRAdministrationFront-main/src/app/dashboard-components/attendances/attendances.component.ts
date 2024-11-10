import { Component } from '@angular/core';
import { UpdateAttendanceComponent } from "./update-attendance/update-attendance.component";
import { User } from 'src/app/models/user';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { Attendance } from 'src/app/models/attendance';
import { UsersService } from 'src/app/services/users/users.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [UpdateAttendanceComponent,CommonModule],
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.scss']
})
export class AttendancesComponent {
  showAddAttendance = false;
  showUpdateAttendance = false; 
  attendanceIdToUpdate: number | undefined;
  attendances: Attendance[] = [];
  users: User[] = [];

  constructor(
    private attendanceService: AttendancesService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadAttendances();
    this.loadUsers();
  }

  loadAttendances(): void {
    this.attendanceService.getAllAttendances().subscribe(
      (data) => {
        this.attendances = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching attendances', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteAttendance(id?: number): void {
    if (id !== undefined) {
      this.attendanceService.deleteAttendance(id).subscribe(
        () => {
          this.loadAttendances();
        },
        (error) => {
          console.error('Error deleting attendance', error);
        }
      );
    } else {
      console.error('Attendance ID is undefined');
    }
  }

  toggleAddAttendance(): void {
    this.showAddAttendance = !this.showAddAttendance;
    if (this.showAddAttendance) {
      this.showUpdateAttendance = false; 
      this.attendanceIdToUpdate = undefined;
    }
  }

  onAddAttendanceClose(): void {
    this.showAddAttendance = false;
    this.loadAttendances();
  }

  toggleUpdateAttendance(id?: number): void { 
    this.attendanceIdToUpdate = id;
    this.showUpdateAttendance = !this.showUpdateAttendance;
    if (this.showUpdateAttendance) { 
      this.showAddAttendance = false;
    }
  }

  onUpdateAttendanceClose(): void { 
    this.showUpdateAttendance = false; 
    this.attendanceIdToUpdate = undefined;
    this.loadAttendances();
  }
}
