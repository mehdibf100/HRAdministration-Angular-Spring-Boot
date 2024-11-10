import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ButtonService } from 'src/app/services/shared/service.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar-attendance-hr',
  templateUrl: './nav-bar-attendance-hr.component.html',
  styleUrl: './nav-bar-attendance-hr.component.scss'
})
export class NavBarAttendanceHrComponent {
  constructor(private  authService: AuthService,private router: Router,private location: Location , private buttonService : ButtonService) {
  }
  ngOnInit(): void {
    localStorage.setItem('Toggle','1');
    this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });
  }
  activeButton: string = '';
  private subscription: Subscription | undefined;

  setActive(button: string): void {
    this.activeButton = button;
  }
  goBack(): void {
    this.location.back();
  }
  logout() {
    sessionStorage.clear();
   this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onGlobalButtonClick() {
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("box");
    const elements2 = document.getElementsByClassName("logout");

    if(toggle==="1"){
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "margin-left: 0px;";
     });
    }
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:200px;";
      });
    }

     }
}


