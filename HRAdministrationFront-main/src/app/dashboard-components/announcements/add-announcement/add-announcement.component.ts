import { Component, EventEmitter, Output } from '@angular/core';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';
import { Announcement } from 'src/app/models/announcement';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent {
  @Output() closeAddAnnouncement = new EventEmitter<void>();

  announcement: Announcement = {
    id: 0,
    title: '',
    description: '',
    date: '',
    displayPictureFilename: ''
  };

  selectedFile: File | null = null;

  constructor(private announcementsService: AnnouncementsService , private datePipe:DatePipe) {}

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
      formData.append('date', this.announcement.date);
      formData.append('file', this.selectedFile);
  
      this.announcementsService.uploadAnnouncement(formData).subscribe(() => {
        this.closeAddAnnouncement.emit();
      });
    }
  }
    onCancel(): void {
    this.closeAddAnnouncement.emit();
  }
}
