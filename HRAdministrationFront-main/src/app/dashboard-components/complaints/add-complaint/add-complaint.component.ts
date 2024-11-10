import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Complaint, ComplaintStatus } from 'src/app/models/complaint';
import { Roles, User } from 'src/app/models/user';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {
  @Output() closeAddComplaint = new EventEmitter<void>();

  complaint: Complaint = {
    id: 0,
    title: '',
    description: '',
    status: ComplaintStatus.NOT_RESOLVED,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    filedBy: {
      id: 0,
      firstname: '',
      lastname: '',
      email: '',
      job: '',
      baseSalary: 0,
      datejoined: '',
      role: Roles.ROLE_EMPLOYEE,
      password: '',
      tasks: []
    }
  };

  statuses = Object.values(ComplaintStatus);
  users: User[] = [];

  constructor(
    private complaintsService: ComplaintsService, 
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    this.complaintsService.createComplaint(this.complaint).subscribe(() => {
      this.closeAddComplaint.emit();
    });
  }

  onCancel(): void {
    this.closeAddComplaint.emit();
  }
}
