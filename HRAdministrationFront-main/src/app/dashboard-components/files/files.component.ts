import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  showUploadFile = false;
  files: any[] = []; 

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.listFiles().subscribe(
      (data) => {
        console.log('Files fetched:', data);
        this.files = data.map((filename, index) => ({ id: index + 1, filename }));
      },
      (error) => {
        console.error('Error fetching files', error);
      }
    );
  }

  downloadFile(filename: string): void {
    this.fileService.getFile(filename).subscribe(
      (fileData) => {
        const blob = new Blob([fileData], { type: fileData.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        console.log('File downloaded:', filename);
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  }

  deleteFile(filename: string): void {
    this.fileService.deleteFile(filename).subscribe(
      (response) => {
        console.log('File deleted:');
        this.files = this.files.filter(file => file.filename !== filename);
        this.loadFiles();
      },
      (error) => {
        console.error('Error deleting file', error);
      }
    );
  }

  toggleUploadFile(): void {
    this.showUploadFile = !this.showUploadFile;
  }

  onUploadFileClose(): void {
    this.showUploadFile = false;
    this.loadFiles();
  }
}
