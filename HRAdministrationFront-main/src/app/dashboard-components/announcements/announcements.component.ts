import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';
import { Announcement } from 'src/app/models/announcement';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementComponent implements OnInit {
  showAddAnnouncement = false;
  showUpdateAnnouncement = false;
  announcementIdToUpdate: number | undefined;
  announcements: Announcement[] = [];
  imageUrls: { [key: number]: any } = {}; 

  constructor(private announcementsService: AnnouncementsService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementsService.getAllAnnouncements().subscribe((announcements: Announcement[]) => {
      this.announcements = announcements;
      this.announcements.forEach(announcement => {
        this.loadImage(announcement.displayPictureFilename, announcement.id);
      });
    });
  }

  deleteAnnouncement(id?: number): void {
    if (id !== undefined) {
      this.announcementsService.deleteAnnouncement(id).subscribe(
        () => {
          this.loadAnnouncements();
        },
        (error) => {
          console.error('Error deleting announcement', error);
        }
      );
    } else {
      console.error('Announcement ID is undefined');
    }
  }

  loadImage(filename: string, announcementId: number): void {
    this.announcementsService.getImage(filename).subscribe(imageBlob => {
      const objectURL = URL.createObjectURL(imageBlob);
      this.imageUrls[announcementId] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  toggleAddAnnouncement(): void {
    this.showAddAnnouncement = !this.showAddAnnouncement;
    if (this.showAddAnnouncement) {
      this.showUpdateAnnouncement = false;
      this.announcementIdToUpdate = undefined;
    }
  }

  onAddAnnouncementClose(): void {
    this.showAddAnnouncement = false;
    this.loadAnnouncements();
  }

  toggleUpdateAnnouncement(id?: number): void {
    this.announcementIdToUpdate = id;
    this.showUpdateAnnouncement = !this.showUpdateAnnouncement;
    if (this.showUpdateAnnouncement) {
      this.showAddAnnouncement = false;
    }
  }

  onUpdateAnnouncementClose(): void {
    this.showUpdateAnnouncement = false;
    this.announcementIdToUpdate = undefined;
    this.loadAnnouncements();
  }
}
