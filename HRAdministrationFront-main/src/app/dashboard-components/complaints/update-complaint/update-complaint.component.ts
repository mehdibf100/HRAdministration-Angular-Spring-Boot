import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Complaint, ComplaintStatus } from 'src/app/models/complaint';
import { Roles } from 'src/app/models/user';

@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.scss']
})
export class UpdateComplaintComponent implements OnChanges {
  @Input() complaintId: number = 0;
  @Output() closeUpdateComplaint = new EventEmitter<void>();

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

  constructor(private complaintsService: ComplaintsService) {}

  ngOnChanges(): void {
    if (this.complaintId) {
      this.loadComplaint();
    }
  }

  loadComplaint(): void {
    this.complaintsService.getComplaintById(this.complaintId).subscribe({
      next: (complaint: Complaint) => {
        this.complaint = complaint;
      },
      error: (err) => {
        console.error('Error loading complaint:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.complaint) {
      this.complaintsService.updateComplaint(this.complaintId, this.complaint).subscribe({
        next: () => {
          this.closeUpdateComplaint.emit();
        },
        error: (err) => {
          console.error('Error updating complaint:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.closeUpdateComplaint.emit();
  }
}

