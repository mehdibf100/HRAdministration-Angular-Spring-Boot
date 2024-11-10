import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Announcement } from '../../models/announcement'; 
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';
import { UsersService } from 'src/app/services/users/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonService } from 'src/app/services/shared/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body-hr-dashboard',
  templateUrl: './body-hr-dashboard.component.html',
  styleUrl: './body-hr-dashboard.component.scss'
})
export class BodyHrDashboardComponent implements OnInit {
  user: any;
  announcements: Announcement[] = []; 
  profileImage: string | ArrayBuffer | null = null;
  expandedAnnouncements: boolean[] = [];
  imageUrls: { [key: number]: any } = {}; 
  private subscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private announcementsService: AnnouncementsService,
    private userService: UsersService,
    private sanitizer: DomSanitizer,
    private buttonService : ButtonService,

  ) {}

  ngOnInit(): void {
    localStorage.setItem('Toggle','1');
    this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });

    this.authService.GetuserLogin().subscribe(
      data => {
        console.log(data);
        this.user = data;
        this.loadProfileImage();
      },
      err => {
        console.error(err);
      }
    );

    this.loadAnnouncements();
    
  }

  loadAnnouncements(): void {
    this.announcementsService.getAllAnnouncements().subscribe((announcements: Announcement[]) => {
      this.announcements = announcements;
      this.sortAnnouncementsByDate();
      this.announcements.forEach(announcement => {
        this.loadImage(announcement.displayPictureFilename, announcement.id);
      });
    });
  }

  sortAnnouncementsByDate(): void {
    this.announcements.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }


  loadImage(filename: string, announcementId: number): void {
    this.announcementsService.getImage(filename).subscribe(imageBlob => {
      const objectURL = URL.createObjectURL(imageBlob);
      this.imageUrls[announcementId] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  toggleDetails(index: number): void {
    this.expandedAnnouncements[index] = !this.expandedAnnouncements[index]; 
  }

  loadProfileImage(): void {
    const filename = this.user?.displayPictureFilename;
    if (filename) {
      this.userService.getImage(filename).subscribe(
        (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.profileImage = e.target.result;
          };
          reader.readAsDataURL(blob);
        },
        err => {
          console.error('Error loading profile image:', err);
        }
      );
    } else {
      console.log('No profile image filename available');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onGlobalButtonClick() {
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("body");
    const elements2 = document.getElementsByClassName("profile");

    if(toggle==="0"){
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "margin-left: 150px;";
     });
     Array.from(elements2).forEach((element) => {
      (element as HTMLElement).style.cssText = "margin-left: 0px;";
    });}
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:0px;";
      });
      Array.from(elements2).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:0px;";
      });}

     }



}
