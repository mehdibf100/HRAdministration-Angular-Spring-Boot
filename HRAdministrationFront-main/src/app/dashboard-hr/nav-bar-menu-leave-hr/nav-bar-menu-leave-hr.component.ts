import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar-menu-leave-hr',
  templateUrl: './nav-bar-menu-leave-hr.component.html',
  styleUrl: './nav-bar-menu-leave-hr.component.scss'
})
export class NavBarMenuLeaveHrComponent {
  constructor(private  authService: AuthService,private router: Router,private location: Location) {
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
}
