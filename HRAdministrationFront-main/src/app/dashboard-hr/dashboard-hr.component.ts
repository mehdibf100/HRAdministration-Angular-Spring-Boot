import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ButtonService } from '../services/shared/service.service';
@Component({
  selector: 'app-dashboard-hr',
  templateUrl: './dashboard-hr.component.html',
  styleUrl: './dashboard-hr.component.scss'
})
export class DashboardHrComponent implements OnInit {
  constructor(private  authService: AuthService,private router: Router,private location: Location,private buttonService:ButtonService) {
  }
  user: any;
  activeButton: string = '';
  title:any;
  private subscription: Subscription | undefined;

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    localStorage.setItem("toggle","0");
    this.title=localStorage.getItem('title');
    this.authService.GetuserLogin().subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      err => {
        console.error(err);
      }
    );
    this.subscription = this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });
  }
  setActive(button: string): void {
    this.activeButton = button;
  }

  goBack(): void {
    this.location.back();
  }
  logout() {
    sessionStorage.removeItem('token')
   this.router.navigate(['/login']);
  }
  onGlobalButtonClick() {
    // Action à réaliser lorsque le bouton est cliqué
    //console.log('Le bouton a été cliqué!');
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("navContent");
    if(toggle==="1"){   // Vérifie s'il y a au moins un élément
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "margin-left:130px;";
     });}
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:290px;";
      });}

     }
  }

