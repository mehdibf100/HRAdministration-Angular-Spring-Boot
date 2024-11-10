import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProjectService } from '../../services/projects/projects.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  @Input() projectId: number | undefined;
  @Output() closeUpdateProject = new EventEmitter<void>();

  projectName: string = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    if (this.projectId !== undefined) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (project) => {
          this.projectName = project.name;
        },
        (error) => {
          console.error('Error fetching project', error);
        }
      );
    }
  }

  onCancel(): void {
    this.closeUpdateProject.emit();
  }

  onSubmit(): void {
    if (this.projectId !== undefined && this.projectName) {
      const updatedProject: Project = {
        id: this.projectId, name: this.projectName,
        tasks: []
      };
      this.projectService.updateProject(this.projectId, updatedProject).subscribe(
        (project) => {
          console.log('Project updated:', project);
          this.closeUpdateProject.emit();
        },
        (error) => {
          console.error('Error updating project', error);
        }
      );
    } else {
      console.error('Project ID is undefined or Project name is required');
    }
  }
}
