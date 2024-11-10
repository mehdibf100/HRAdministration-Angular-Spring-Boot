import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ButtonService } from 'src/app/services/shared/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-hr',
  templateUrl: './profile-hr.component.html',
  styleUrl: './profile-hr.component.scss'
})
export class ProfileHrComponent implements OnInit  {

  user: any;
  profileImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  private subscription: Subscription | undefined;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private buttonService: ButtonService,
  ) {}

  ngOnInit(): void {
    localStorage.setItem('Toggle','1');
    this.loadUserData();
    this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });

  }

  loadUserData(): void {
    this.authService.GetuserLogin().subscribe(
      data => {
        console.log('User data:', data);
        this.user = data;
        sessionStorage.setItem('id', this.user.id);
        this.loadProfileImage();
      },
      err => {
        console.error('Error fetching user data:', err);
      }
    );
  }

  loadProfileImage(): void {
    const filename = this.user?.displayPictureFilename;
    if (filename) {
      this.usersService.getImage(filename).subscribe(
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadProfilePicture();
    }
  }

  uploadProfilePicture(): void {
    if (this.selectedFile && this.user?.id) {
      this.usersService.uploadUserProfilePicture(this.user.id, this.selectedFile).subscribe(
        (updatedUser: any) => {
          console.log('Profile picture uploaded successfully', updatedUser);
          this.user = updatedUser;
          this.profileImage = null;
          this.loadProfileImage();
        },
        (err) => {
          console.error('Error uploading profile picture:', err);
        }
      );
    } else {
      console.error('No file selected or user not found');
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }  onGlobalButtonClick() {
    console.log('Le bouton a été cliqué nav');
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("profile");
    if(toggle==="1"){
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "margin-left: 60px;";
     });

    }
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left:200px;";
      });
    }

     }


}
