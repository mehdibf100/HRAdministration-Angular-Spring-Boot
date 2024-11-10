import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Complaint } from '../../models/complaint';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent2 implements OnInit {
  complaints: Complaint[] = [];
  showAddComplaint = false;
  showUpdateComplaint = false;
  complaintIdToUpdate?: number;

  constructor(private complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintsService.getComplaints().subscribe((data: Complaint[]) => {
      this.complaints = data;
    });
  }

  toggleAddComplaint(): void {
    this.showAddComplaint = !this.showAddComplaint;
    this.showUpdateComplaint = false; 
  }

  toggleUpdateComplaint(complaintId: number): void {
    this.complaintIdToUpdate = complaintId;
    this.showUpdateComplaint = true;
    this.showAddComplaint = false;
  }

  onAddComplaintClose(): void {
    this.showAddComplaint = false;
    this.loadComplaints();
  }

  onUpdateComplaintClose(): void {
    this.showUpdateComplaint = false;
    this.complaintIdToUpdate = undefined;
    this.loadComplaints();
  }

  deleteComplaint(complaintId: number): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintsService.deleteComplaint(complaintId).subscribe(() => {
        this.loadComplaints();
      });
    }
  }

  onCancel(): void {
    this.showAddComplaint = false;
    this.showUpdateComplaint = false;
  }
}
