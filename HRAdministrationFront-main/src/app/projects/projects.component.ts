import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/projects/projects.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  showAddProject = false;
  showUpdateProject = false;
  projectIdToUpdate: number | undefined;
  projects: Project[] = [];

  constructor(private projectsService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe(
      (data) => {
        console.log('Projects fetched:', data);
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  deleteProject(id?: number): void {
    if (id !== undefined) {
      this.projectsService.deleteProject(id).subscribe(
        () => {
          console.log('Project deleted:', id);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project', error);
        }
      );
    } else {
      console.error('Project ID is undefined');
    }
  }

  toggleAddProject(): void {
    this.showAddProject = !this.showAddProject;
    if (this.showAddProject) {
      this.showUpdateProject = false;
      this.projectIdToUpdate = undefined;
    }
  }

  onAddProjectClose(): void {
    this.showAddProject = false;
    this.loadProjects();
  }

  toggleUpdateProject(id?: number): void {
    this.projectIdToUpdate = id;
    this.showUpdateProject = !this.showUpdateProject;
    if (this.showUpdateProject) {
      this.showAddProject = false;
    }
  }

  onUpdateProjectClose(): void {
    this.showUpdateProject = false;
    this.projectIdToUpdate = undefined;
    this.loadProjects();
  }
}


