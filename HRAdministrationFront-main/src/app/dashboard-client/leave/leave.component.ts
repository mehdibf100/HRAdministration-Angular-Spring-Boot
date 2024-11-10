import { Component, OnInit } from '@angular/core';
import { LeaveRequestsService } from '../../services/leaverequests/leaverequests.service';
import { ButtonService } from 'src/app/services/shared/service.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  leaveDetails: { [reason: string]: { maxDays: number; currentDays: number } } = {};
  val= 5;
  private subscription: Subscription | undefined;
  currentUser: User | null = null;

  constructor(private leaveService: LeaveRequestsService, private buttonService : ButtonService,private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadLeaveDetails(user.id!); 
      },
      error: (error) => {
        console.error('Failed to get the current user:', error);
      }
    });
  }
  loadLeaveDetails(userId: number): void {
    const leaveReasons = [
      'ANNUAL',
      'MEDICAL',
      'HOSPITALIZATION',
      'COMPASSIONATE',
      'MARRIAGE',
      'MATERNITY',
      'REPLACEMENT'
    ];

    leaveReasons.forEach(reason => {
      this.leaveService.getLeaveDetails(userId, reason).subscribe(data => {
        this.leaveDetails[reason] = {
          maxDays: data.maxDays,
          currentDays: data.currentDays
        };
      });
    });
  }  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onGlobalButtonClick() {
    console.log('Le bouton a été cliqué');
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("leave");
    if(toggle==="1"){ 
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "width:900px;";
     });}
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "width: 700px;";
      });}

     }

}
