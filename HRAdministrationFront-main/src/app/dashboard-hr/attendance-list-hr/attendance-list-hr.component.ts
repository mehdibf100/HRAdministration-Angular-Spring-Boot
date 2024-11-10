import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance'; 
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-attendance-list-hr',
  templateUrl: './attendance-list-hr.component.html',
  styleUrls: ['./attendance-list-hr.component.scss']
})
export class AttendanceListHrComponent implements OnInit {
  attendanceList$: Observable<Attendance[]> = new Observable<Attendance[]>();
  filterForm: FormGroup;
  users: { id: number; fullName: string }[] = [];

  constructor(
    private attendancesService: AttendancesService,
    private userService: UsersService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      userId: [''],
      month: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadAttendances();
  }

  loadAttendances(): void {
    this.attendanceList$ = this.filterForm.valueChanges.pipe(
      switchMap(filters => {
        const { userId, month } = filters;
        if (userId && month) {
          return this.attendancesService.getAttendancesPerMonth(userId, this.getStartDate(month), this.getEndDate(month)).pipe(
            catchError(error => {
              console.error('Error fetching attendances per month:', error);
              return new Observable<Attendance[]>(); // Return an empty observable in case of error
            })
          );
        } else if (userId) {
          return this.attendancesService.getAttendanceByUserId(userId).pipe(
            catchError(error => {
              console.error('Error fetching attendance by user ID:', error);
              return new Observable<Attendance[]>(); // Return an empty observable in case of error
            })
          );
        } else if (month) {
          return this.attendancesService.getAttendancesByMonthForConnectedUser(this.getStartDate(month), this.getEndDate(month)).pipe(
            catchError(error => {
              console.error('Error fetching attendances by month for connected user:', error);
              return new Observable<Attendance[]>(); // Return an empty observable in case of error
            })
          );
        } else {
          return this.attendancesService.getAllAttendances().pipe(
            catchError(error => {
              console.error('Error fetching all attendances:', error);
              return new Observable<Attendance[]>(); // Return an empty observable in case of error
            })
          );
        }
      })
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users
          .filter(user => user.id !== undefined)
          .map(user => ({
            id: user.id!,
            fullName: `${user.firstname} ${user.lastname}`
          }));
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getStartDate(month: string): string {
    const [year, monthNum] = month.split('-');
    return `${year}-${monthNum.padStart(2, '0')}-01`;
  }

  getEndDate(month: string): string {
    const [year, monthNum] = month.split('-');
    const endDate = new Date(Number(year), Number(monthNum), 0);
    return `${year}-${monthNum.padStart(2, '0')}-${endDate.getDate()}`;
  }
}
