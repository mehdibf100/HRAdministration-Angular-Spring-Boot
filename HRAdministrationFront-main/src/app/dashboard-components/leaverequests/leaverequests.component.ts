import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { LeaveRequest } from 'src/app/models/leaverequest';
import { LeaveRequestsService } from 'src/app/services/leaverequests/leaverequests.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leaverequests.component.html',
  styleUrls: ['./leaverequests.component.scss']
})
export class LeaveRequestsComponent implements OnInit {
  showAddLeaveRequest = false;
  showUpdateLeaveRequest = false;
  leaveRequestIdToUpdate: number | undefined;
  leaveRequests: LeaveRequest[] = [];
  users: User[] = [];

  constructor(
    private leaveRequestService: LeaveRequestsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
    this.loadUsers();
  }

  loadLeaveRequests(): void {
    this.leaveRequestService.getAllLeaveRequests().subscribe(
      (data) => {
        this.leaveRequests = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching leave requests', error);
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

  deleteLeaveRequest(id?: number): void {
    if (id !== undefined) {
      this.leaveRequestService.deleteLeaveRequest(id).subscribe(
        () => {
          this.loadLeaveRequests();
        },
        (error) => {
          console.error('Error deleting leave request', error);
        }
      );
    } else {
      console.error('Leave request ID is undefined');
    }
  }

  acceptLeaveRequest(id?: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to approve this leave request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.leaveRequestService.approveLeaveRequest(id).subscribe(
            () => {
              Swal.fire({
                title: 'Approved!',
                text: 'The leave request has been approved.',
                icon: 'success',
                confirmButtonColor: '#3085d6'
              });
              this.loadLeaveRequests();
            },
            (error) => {
              Swal.fire({
                title: 'Error!',
                text: 'There was an issue approving the leave request.',
                icon: 'error',
                confirmButtonColor: '#3085d6'
              });
              console.error('Error accepting leave request', error);
            }
          );
        }
      });
    } else {
      console.error('Leave request ID is undefined');
    }
  }
  
  denyLeaveRequest(id?: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to deny this leave request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deny it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.leaveRequestService.denyLeaveRequest(id).subscribe(
            () => {
              Swal.fire({
                title: 'Denied!',
                text: 'The leave request has been denied.',
                icon: 'success',
                confirmButtonColor: '#3085d6'
              });
              this.loadLeaveRequests();
            },
            (error) => {
              Swal.fire({
                title: 'Error!',
                text: 'There was an issue denying the leave request.',
                icon: 'error',
                confirmButtonColor: '#3085d6'
              });
              console.error('Error denying leave request', error);
            }
          );
        }
      });
    } else {
      console.error('Leave request ID is undefined');
    }
  }
  

  toggleAddLeaveRequest(): void {
    this.showAddLeaveRequest = !this.showAddLeaveRequest;
    if (this.showAddLeaveRequest) {
      this.showUpdateLeaveRequest = false;
      this.leaveRequestIdToUpdate = undefined;
    }
  }

  onAddLeaveRequestClose(): void {
    this.showAddLeaveRequest = false;
    this.loadLeaveRequests();
  }

  toggleUpdateLeaveRequest(id?: number): void {
    this.leaveRequestIdToUpdate = id;
    this.showUpdateLeaveRequest = !this.showUpdateLeaveRequest;
    if (this.showUpdateLeaveRequest) {
      this.showAddLeaveRequest = false;
      this.loadLeaveRequestForUpdate(id);
    }
  }

  loadLeaveRequestForUpdate(id?: number): void {
    if (id !== undefined) {
      this.leaveRequestService.findLeaveRequestById(id).subscribe(
        (data) => {
        },
        (error) => {
          console.error('Error fetching leave request', error);
        }
      );
    }
  }

  onUpdateLeaveRequestClose(): void {
    this.showUpdateLeaveRequest = false;
    this.leaveRequestIdToUpdate = undefined;
    this.loadLeaveRequests();
  }
}
