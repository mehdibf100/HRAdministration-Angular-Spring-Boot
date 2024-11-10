import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { ButtonService } from 'src/app/services/shared/service.service';

@Component({
  selector: 'app-employees-hr',
  templateUrl: './employees-hr.component.html',
  styleUrls: ['./employees-hr.component.scss']
})
export class EmployeesHrComponent implements OnInit, OnDestroy {
  employees: User[] = [];
  private subscription: Subscription = new Subscription();
  showUpdateEmployee = false;
  employeeIdToUpdate?: number;

  constructor(
    private usersService: UsersService,
    private buttonService: ButtonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('Toggle', '1');
    this.loadEmployees();
    this.subscription.add(
      this.buttonService.buttonClick$.subscribe(() => {
        this.onGlobalButtonClick();
      })
    );
  }

  loadEmployees(): void {
    this.usersService.getEmployees().subscribe((data: User[]) => {
      this.employees = data;
      this.employees.forEach(employee => this.loadProfileImage(employee));
    });
  }

  loadProfileImage(employee: User): void {
    const filename = employee.displayPictureFilename;
    if (filename) {
      this.usersService.getImage(filename).subscribe(
        (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            employee.displayPictureFilename = e.target.result;
          };
          reader.readAsDataURL(blob);
        },
        (err) => {
          console.error('Error loading profile image:', err);
          employee.displayPictureFilename = 'https://cognition.ens.fr/sites/cognition.ens.fr/files/styles/300x300/public/default_images/user-gen_0.png?itok=bmm9X_ff';
        }
      );
    } else {
      employee.displayPictureFilename = 'https://cognition.ens.fr/sites/cognition.ens.fr/files/styles/300x300/public/default_images/user-gen_0.png?itok=bmm9X_ff';
    }
  }

  deleteEmployee(id: number): void {
    if (id) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  toggleUpdateEmployee(id?: number): void {
    this.employeeIdToUpdate = id;
    this.showUpdateEmployee = true; // Ensure the update component is shown
  }

  onUpdateEmployeeClose(): void {
    this.showUpdateEmployee = false;
    this.employeeIdToUpdate = undefined;
    this.loadEmployees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onGlobalButtonClick() {
    let toggle = localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("employee-container");
    if (toggle === "1") {
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left: 80px;";
      });
    } else {
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "margin-left: 220px;";
      });
    }
  }
}
