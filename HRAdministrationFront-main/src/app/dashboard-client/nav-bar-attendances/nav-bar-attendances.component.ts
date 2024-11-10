import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ButtonService } from 'src/app/services/shared/service.service';

@Component({
  selector: 'app-nav-bar-attendances',
  templateUrl: './nav-bar-attendances.component.html',
  styleUrl: './nav-bar-attendances.component.scss'
})
export class NavBarAttendancesComponent implements OnInit {
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


