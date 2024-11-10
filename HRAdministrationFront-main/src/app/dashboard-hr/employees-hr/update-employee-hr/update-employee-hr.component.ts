import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-employee-hr',
  templateUrl: './update-employee-hr.component.html',
  styleUrls: ['./update-employee-hr.component.scss']
})
export class UpdateEmployeeHrComponent implements OnInit {
  @Input() employeeId!: number; 
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router ,
    private route:ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      job: ['', Validators.required],
      baseSalary: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.loadEmployee();
    } else {
      console.error('No employee ID provided');
    }
  }

  loadEmployee(): void {
    this.usersService.getEmployeeById(this.employeeId).subscribe(
      (employee: User) => {
        console.log('Loaded Employee:', employee);
        this.employeeForm.patchValue({
          firstname: employee.firstname,
          lastname: employee.lastname,
          job: employee.job,
          baseSalary : employee.baseSalary
        });
      },
      (error) => {
        console.error('Error loading employee:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeId);
      this.usersService.updateUser(this.employeeId, this.employeeForm.value).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['admin-hr-dashboard']);
  }
}
