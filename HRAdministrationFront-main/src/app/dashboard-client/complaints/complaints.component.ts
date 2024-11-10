import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Complaint , ComplaintStatus } from 'src/app/models/complaint';
import { Roles } from 'src/app/models/user';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent {
  complaint: Complaint = {
    id: 0,
    title: '',
    description: '',
    status: ComplaintStatus.NOT_RESOLVED, 
    createdDate: new Date().toISOString(), 
    updatedDate: new Date().toISOString(), 
    filedBy: {
      id: 0,
      email: '',
      password: '',
      role: Roles.ROLE_EMPLOYEE,
      tasks: []
    }, 
  };

  constructor(private complaintsService: ComplaintsService, private router: Router) {}

  sent() {
    this.complaintsService.createComplaint(this.complaint).subscribe(
      (res) => {
        console.log('Complaint created successfully:', res);
        this.router.navigate(['/complaint-list']);
      },
      (err) => {
        console.error('Error creating complaint:', err);
      }
    );
  }
}
