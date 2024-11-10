import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.scss']
})
export class UpdateAnnouncementComponent implements OnInit {
  @Input() announcementId!: number;
  @Output() closeUpdateAnnouncement = new EventEmitter<void>();

  announcement: Announcement = {
    id: 0,
    title: '',
    description: '',
    date: '',
    displayPictureFilename: ''
  };

  selectedFile: File | null = null;

  constructor(private announcementsService: AnnouncementsService) {}

  ngOnInit(): void {
    if (this.announcementId) {
      this.loadAnnouncement();
    }
  }

  loadAnnouncement(): void {
    this.announcementsService.getAnnouncementById(this.announcementId)
      .subscribe((announcement) => {
        this.announcement = announcement;
      }, (error) => {
        console.error('Error loading announcement', error);
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.announcement.title);
      formData.append('description', this.announcement.description);
      formData.append('file', this.selectedFile);
      formData.append('date', this.announcement.date);
      this.announcementsService.updateAnnouncement(this.announcement.id, formData)
        .subscribe(() => {
          this.closeUpdateAnnouncement.emit();
        });
    } else {
      this.announcementsService.updateAnnouncement(this.announcement.id, this.announcement)
        .subscribe(() => {
          this.closeUpdateAnnouncement.emit();
        });
    }
  }

  onCancel(): void {
    this.closeUpdateAnnouncement.emit();
  }
}
