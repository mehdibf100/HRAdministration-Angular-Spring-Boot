import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { Roles, User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { TaskService } from 'src/app/services/tasks/tasks.service';
import { ProjectService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() closeAddTask = new EventEmitter<void>();

  activityName: string = '';
  taskDate: string = '';
  selectedProject: number | undefined;
  selectedUser: number | undefined;
  projects: Project[] = [];
  users: User[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        console.log('Projects fetched:', data);
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('Users fetched:', data);
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  onCancel(): void {
    this.closeAddTask.emit();
  }

  onSubmit(): void {
    if (this.selectedProject === undefined || this.selectedUser === undefined) {
      console.error('No project or user selected');
      return;
    }

    const newTask: Task = {
      activityName: this.activityName,
      date: this.taskDate,
      project: {
        id: this.selectedProject,
        name: '',
        tasks: []
      },
      user: {
        id: this.selectedUser,
        email: '',
        password: '',
        role: Roles.ROLE_EMPLOYEE,
        tasks: []
      },
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: ''
    };

    this.taskService.createTask(newTask).subscribe(
      (task) => {
        console.log('Task added:', task);
        this.closeAddTask.emit();
      },
      (error) => {
        console.error('Error adding task', error);
      }
    );
  }
}
