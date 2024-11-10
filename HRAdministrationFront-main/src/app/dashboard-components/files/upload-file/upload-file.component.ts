import { Component, EventEmitter, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  selectedFile: File | null = null;
  uploadProgress: number | undefined = undefined;

  @Output() closeUploadFile = new EventEmitter<void>();

  constructor(private fileService: FileService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.uploadProgress = 0;
      this.fileService.uploadFile(this.selectedFile).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('File successfully uploaded:', event.body);
            this.uploadProgress = undefined;
            this.selectedFile = null;
            this.onCancel();
          }
        },
        (error) => {
          console.error('Error uploading file', error);
          this.uploadProgress = undefined;
        }
      );
    }
  }

  onCancel(): void {
    this.selectedFile = null;
    this.uploadProgress = undefined;
    this.closeUploadFile.emit();
    
  }
}
