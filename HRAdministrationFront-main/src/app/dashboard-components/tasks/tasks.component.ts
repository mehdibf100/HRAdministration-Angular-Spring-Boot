import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { Roles, User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { TaskService } from 'src/app/services/tasks/tasks.service';
import { ProjectService } from 'src/app/services/projects/projects.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  showAddTask = false;
  showUpdateTask = false;
  taskIdToUpdate: number | undefined;
  tasks: Task[] = [];
  projects: Project[] = [];
  users: User[] = [];
  newTask: Task = {
    activityName: '', date: '', project: {
      id: 0,
      name: '',
      tasks: []
    }, user: {
      id: 0,
      email: '',
      password: '',
      role: Roles.ROLE_EMPLOYEE,
      baseSalary: 0,
      firstname: '',
      lastname: '',
      job: '',
      tasks: []
    },
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  };

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
    this.loadUsers();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        console.log('Tasks fetched:', data);
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
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
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  deleteTask(id?: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.taskService.deleteTask(id).subscribe(
            () => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The task has been deleted successfully.',
                confirmButtonText: 'OK'
              });
              this.loadTasks();
            },
            (error) => {
              console.error('Error deleting task', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error deleting the task.',
                confirmButtonText: 'OK'
              });
            }
          );
        }
      });
    } else {
      console.error('Task ID is undefined');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Task ID is undefined. Cannot delete the task.',
        confirmButtonText: 'OK'
      });
    }
  }
  

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    if (this.showAddTask) {
      this.showUpdateTask = false;
      this.taskIdToUpdate = undefined;
      this.newTask = { activityName: '', date: '',monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
    project: {
        name: '',
        tasks: []
      }, user: {
        firstname: '',
        lastname: '',
        role: Roles.ROLE_EMPLOYEE,
        email: '',
        password: '',
        tasks: []
      } };
    }
  }


  onAddTaskClose(): void {
    this.showAddTask = false;
    this.loadTasks();
  }

  toggleUpdateTask(id?: number): void {
    this.taskIdToUpdate = id;
    this.showUpdateTask = !this.showUpdateTask;
    if (this.showUpdateTask) {
      this.showAddTask = false;
      this.loadTaskForUpdate(id);
    }
  }

  loadTaskForUpdate(id?: number): void {
    if (id !== undefined) {
      this.taskService.getTaskById(id).subscribe(
        (data) => {
          this.newTask = data;
        },
        (error) => {
          console.error('Error fetching task', error);
        }
      );
    }
  }

  onUpdateTaskClose(): void {
    this.showUpdateTask = false;
    this.taskIdToUpdate = undefined;
    this.loadTasks();
  }

  onSubmit(): void {
    if (this.taskIdToUpdate !== undefined) {
      this.taskService.updateTask(this.taskIdToUpdate, this.newTask).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Task Updated',
            text: 'The task has been updated successfully.',
            confirmButtonText: 'OK'
          });
          this.onUpdateTaskClose();
        },
        (error) => {
          console.error('Error updating task', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error updating the task.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      this.taskService.createTask(this.newTask).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Task Created',
            text: 'The task has been added successfully.',
            confirmButtonText: 'OK'
          });
          this.onAddTaskClose();
        },
        (error) => {
          console.error('Error adding task', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error adding the task.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
  
  

  onCancel(): void {
    this.showAddTask = false;
    this.showUpdateTask = false;
  }
}
