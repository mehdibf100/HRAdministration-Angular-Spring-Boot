import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showAddUser: boolean = false;
  showUpdateUser: boolean = false;
  userIdToUpdate?: number;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }

  toggleAddUser(): void {
    this.showAddUser = !this.showAddUser;
    if (this.showAddUser) {
      this.showUpdateUser = false;
    }
  }

  toggleUpdateUser(userId?: number): void {
    this.userIdToUpdate = userId;
    this.showUpdateUser = true;
    this.showAddUser = false;
  }

  deleteUser(id?: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe(
            () => {
              Swal.fire(
                'Deleted!',
                'The user has been deleted.',
                'success'
              );
              this.loadUsers();
            },
            (error) => {
              console.error('Error deleting user', error);
              Swal.fire(
                'Error!',
                'There was an error deleting the user.',
                'error'
              );
            }
          );
        }
      });
    } else {
      console.error('User ID is undefined');
      Swal.fire(
        'Error!',
        'User ID is undefined.',
        'error'
      );
    }
  }

  onAddUserClose(): void {
    this.showAddUser = false;
    this.loadUsers();
  }

  onUpdateUserClose(): void {
    this.showUpdateUser = false;
    this.loadUsers();
  }
}
