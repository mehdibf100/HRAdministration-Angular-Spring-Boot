import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ButtonService } from 'src/app/services/shared/service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-bar-menu',
  templateUrl: './nav-bar-menu.component.html',
  styleUrl: './nav-bar-menu.component.scss'
})
export class NavBarMenuComponent implements OnInit {
  constructor(private  authService: AuthService,private router: Router,private location: Location , private buttonService : ButtonService) {
  }
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    localStorage.setItem('Toggle','0');
    this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });


  }
  activeButton: string = '';
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
       (element as HTMLElement).style.cssText = "margin-left: 100px;";
     });
    } 
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:300px;";
      });    
    }
     } 
}
