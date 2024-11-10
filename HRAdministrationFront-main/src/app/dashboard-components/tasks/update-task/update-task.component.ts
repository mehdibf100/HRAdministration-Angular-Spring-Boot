import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Roles, User } from 'src/app/models/user';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { UsersService } from 'src/app/services/users/users.service';
import { TaskService } from 'src/app/services/tasks/tasks.service';
import { ProjectService } from 'src/app/services/projects/projects.service';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  @Input() taskId: number | undefined;
  @Output() closeUpdateTask = new EventEmitter<void>();

  activityName: string | undefined;
  selectedProject: number | undefined;
  selectedUser: number | undefined;
  date: string | undefined;
  timeSpent: number | undefined;

  projects: Project[] = [];
  users: User[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UsersService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.taskId !== undefined) {
      this.taskService.getTaskById(this.taskId).subscribe(
        (task) => {
          this.activityName = task.activityName;
          this.selectedProject = task.project?.id;
          this.selectedUser = task.user?.id;
          this.date = task.date;
        },
        (error) => {
          console.error('Error fetching task', error);
        }
      );
    }

    this.projectService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );

    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  onCancel(): void {
    this.closeUpdateTask.emit();
  }

  onSubmit(): void {
    if (this.timeSpent !== undefined && this.taskId !== undefined && this.activityName && this.selectedProject !== undefined && this.selectedUser !== undefined && this.date) {
      const updatedTask: Task = {
        id: this.taskId,
        activityName: this.activityName,
        project: {
          id: this.selectedProject,
          name: '',
          tasks: []
        },
        user: {
          id: this.selectedUser,
          email: '',
          password: '',
          role: Roles.ROLE_ADMIN,
          tasks: []
        },
        date: this.date,
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: ''
      };

      this.taskService.updateTask(this.taskId, updatedTask).subscribe(
        (task) => {
          console.log('Task updated:', task);
          this.closeUpdateTask.emit();
        },
        (error) => {
          console.error('Error updating task', error);
        }
      );
    } else {
      console.error('All fields are required');
    }
  }
}
