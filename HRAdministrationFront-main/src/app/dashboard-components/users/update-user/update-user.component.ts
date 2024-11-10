import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { Roles, User } from 'src/app/models/user';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  @Input() userId: number | undefined;
  @Output() closeUpdateUser = new EventEmitter<void>();

  firstname: string | undefined;
  lastname: string | undefined;
  datejoined: string | undefined;
  job: string | undefined;
  baseSalary: number | undefined;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          this.firstname = user.firstname;
          this.lastname = user.lastname;
          this.datejoined = user.datejoined; 
          this.job = user.job;
          this.baseSalary = user.baseSalary;
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
    }
  }

  onCancel(): void {
    this.closeUpdateUser.emit();
  }

  onSubmit(): void {
    if (this.userId !== undefined && this.firstname && this.lastname && this.datejoined && this.job && this.baseSalary !== undefined) {
      const updatedUser: User = {
        id: this.userId,
        firstname: this.firstname,
        lastname: this.lastname,
        datejoined: this.datejoined,
        job: this.job,
        baseSalary: this.baseSalary,
        email: '',
        password: '',
        role: Roles.ROLE_EMPLOYEE,
        tasks: []
      };
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (user) => {
          console.log('User updated:', user);
          this.closeUpdateUser.emit();
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      console.error('All fields are required');
    }
  }
}
