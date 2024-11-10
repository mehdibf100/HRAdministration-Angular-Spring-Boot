import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';
import { DatePipe } from '@angular/common';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.scss'
})
export class ComplaintListComponent {
  complaints: any[] = [];

  constructor(
    private complaintService: ComplaintsService,
    private userService: UsersService,
    private datePipe: DatePipe

  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (currentUser: User) => {
        if (currentUser && currentUser.id) {
          const userId = currentUser.id;
          this.complaintService.getComplaintsByUserId(userId).subscribe(
            (res) => {
              console.log('Fetched leave requests:', res);
              this.complaints = res.reverse();
            },
            (err) => {
              console.error('Error fetching leave requests:', err);
            }
          );
        } else {
          console.error('User ID not found.');
        }
      },
      (err) => {
        console.error('Error fetching current user:', err);
      }
    );
  }
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MM/dd/yyyy') || '';
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'RESOLVED':
        return 'status-resolved';
      case 'IN_PROGRESS':
        return 'status-in_progress';
      case 'NOT_RESOLVED':
        return 'status-not_resolved';
      default:
        return '';
    }
  }

}
