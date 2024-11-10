import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeaveRequest } from 'src/app/models/leaverequest';
import { User } from 'src/app/models/user';
import { LeaveRequestsService } from 'src/app/services/leaverequests/leaverequests.service';
import { ButtonService } from 'src/app/services/shared/service.service';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-leave-list-hr',
  templateUrl: './leave-list-hr.component.html',
  styleUrls: ['./leave-list-hr.component.scss']
})
export class LeaveListHrComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  selectedUserId?: number;
  users: User[] = [];
  filteredLeaveRequests: LeaveRequest[] = [];
  private subscription: Subscription | undefined;
  constructor(private leaveRequestsService: LeaveRequestsService , private userService:UsersService,private buttonService: ButtonService,) {}

  ngOnInit(): void {
    this.fetchLeaveRequests();
    this.loadUsers();
    this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });
  }

  fetchLeaveRequests(): void {
    this.leaveRequestsService.getAllLeaveRequests().subscribe({
      next: (data) => {
        this.leaveRequests = data;
      },
      error: (err) => {
        console.error('Failed to fetch leave requests:', err);
      }
    });
  }

  approveLeaveRequest(requestId: number | undefined): void {
    if (requestId !== undefined) {
      this.leaveRequestsService.approveLeaveRequest(requestId).subscribe({
        next: (updatedRequest) => {
          this.updateRequestInList(updatedRequest);
        },
        error: (err) => {
          console.error('Failed to approve leave request:', err);
        }
      });
    } else {
      console.error('Invalid requestId: Cannot approve request');
    }
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }
  filterRequestsByUser(): void {
    if (this.selectedUserId) {
      this.filteredLeaveRequests = this.leaveRequests.filter(request => request.user.id === this.selectedUserId);
    } else {
      this.filteredLeaveRequests = this.leaveRequests;
    }
  }
  denyLeaveRequest(requestId: number | undefined): void {
    if (requestId !== undefined) {
      this.leaveRequestsService.denyLeaveRequest(requestId).subscribe({
        next: (updatedRequest) => {
          this.updateRequestInList(updatedRequest);
        },
        error: (err) => {
          console.error('Failed to deny leave request:', err);
        }
      });
    } else {
      console.error('Invalid requestId: Cannot deny request');
    }
  }



  updateRequestInList(updatedRequest: LeaveRequest): void {
    const index = this.leaveRequests.findIndex(req => req.requestId === updatedRequest.requestId);
    if (index !== -1) {
      this.leaveRequests[index] = updatedRequest;
      this.filterRequestsByUser();
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }  onGlobalButtonClick() {
    console.log('Le bouton a été cliqué nav');
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("attendance-table");
    if(toggle==="1"){
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "margin-left:150px;width:80%";
     });

    }
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:300px;width:60%;";
      });
    }

     }


}
