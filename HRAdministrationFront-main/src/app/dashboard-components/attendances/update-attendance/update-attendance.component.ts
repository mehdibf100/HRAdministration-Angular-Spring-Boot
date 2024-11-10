import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { Roles } from 'src/app/models/user';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-attendance',
  standalone: true,
  imports: [FormsModule , CommonModule], 
  templateUrl: './update-attendance.component.html',
  styleUrls: ['./update-attendance.component.scss'] 
})
export class UpdateAttendanceComponent {
  @Input() attendanceId: number | undefined;
  @Output() closeUpdateAttendance = new EventEmitter<void>();

  date: string | undefined;
  start_time: string | undefined;
  end_time: string | undefined;

  constructor(private attendanceService: AttendancesService) {}

  ngOnInit(): void {
    if (this.attendanceId !== undefined) {
      this.attendanceService.getAttendanceById(this.attendanceId).subscribe(
        (attendance) => {
          this.date = attendance.date;
          this.start_time = attendance.start_time;
          this.end_time = attendance.end_time;
        },
        (error) => {
          console.error('Error fetching attendance', error);
        }
      );
    }
  }

  onCancel(): void {
    this.closeUpdateAttendance.emit();
  }

  onSubmit(): void {
    if (this.attendanceId !== undefined && this.date && this.start_time && this.end_time) {
      const updatedAttendance: Attendance = {
        attendance_id: this.attendanceId,
        date: this.date,
        start_time: this.start_time,
        end_time: this.end_time,
        user: {
          email: '', 
          password: '', 
          role: Roles.ROLE_EMPLOYEE,
          tasks: []
        },
      };

      this.attendanceService.updateAttendance(this.attendanceId, updatedAttendance).subscribe(
        (attendance) => {
          console.log('Attendance updated:', attendance);
          this.closeUpdateAttendance.emit();
        },
        (error) => {
          console.error('Error updating leave request', error);
        }
      );
    } else {
      console.error('All fields are required');
    }
  }
}
