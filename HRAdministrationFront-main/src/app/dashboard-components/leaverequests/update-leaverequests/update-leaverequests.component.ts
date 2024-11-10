import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LeaveRequest , LeaveReason , LeaveRequestStatus } from 'src/app/models/leaverequest';
import { Roles } from 'src/app/models/user';
import { LeaveRequestsService } from 'src/app/services/leaverequests/leaverequests.service';
@Component({
  selector: 'app-update-leaverequest',
  templateUrl: './update-leaverequests.component.html',
  styleUrls: ['./update-leaverequests.component.scss']
})
export class UpdateLeaveRequestComponent implements OnInit {
  @Input() leaveRequestId: number | undefined;
  @Output() closeUpdateLeaveRequest = new EventEmitter<void>();

  startDate: string | undefined;
  endDate: string | undefined;
  reason?: LeaveReason;

  constructor(private leaveRequestService: LeaveRequestsService) {}

  ngOnInit(): void {
    if (this.leaveRequestId !== undefined) {
      this.leaveRequestService.findLeaveRequestById(this.leaveRequestId).subscribe(
        (leaveRequest) => {
          this.startDate = leaveRequest.startDate;
          this.endDate = leaveRequest.endDate;
          this.reason = leaveRequest.reason;
        },
        (error) => {
          console.error('Error fetching leave request', error);
        }
      );
    }
  }

  onCancel(): void {
    this.closeUpdateLeaveRequest.emit();
  }

  onSubmit(): void {
    if (this.leaveRequestId !== undefined && this.startDate && this.endDate && this.reason) {
      const updatedLeaveRequest: LeaveRequest = {
        requestId: this.leaveRequestId,
        startDate: this.startDate,
        endDate: this.endDate,
        reason: this.reason,
        user: {
          email: '',
          password: '',
          role: Roles.ROLE_EMPLOYEE,
          tasks: []
        },
        status: LeaveRequestStatus.PENDING
      };

      this.leaveRequestService.updateLeaveRequest(this.leaveRequestId, updatedLeaveRequest).subscribe(
        (leaveRequest) => {
          console.log('Leave request updated:', leaveRequest);
          this.closeUpdateLeaveRequest.emit();
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
