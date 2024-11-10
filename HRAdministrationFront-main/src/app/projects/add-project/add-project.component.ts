import { Component, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services/projects/projects.service'; 
import { Project } from '../../models/project';  

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  projectName: string = '';
  
  @Output() closeAddProject = new EventEmitter<void>();

  constructor(private projectService: ProjectService) { }

  onCancel(): void {
    this.closeAddProject.emit();
  }

  onSubmit(): void {
    if (this.projectName) {
      const newProject: Project = {
        id: 0, name: this.projectName,
        tasks: []
      }; 
      this.projectService.createProject(newProject).subscribe(
        (project) => {
          console.log('Project created:', project);
          this.closeAddProject.emit(); 
        },
        (error) => {
          console.error('Error creating project', error);
        }
      );
    } else {
      console.error('Project name is required');
    }
  }
}
