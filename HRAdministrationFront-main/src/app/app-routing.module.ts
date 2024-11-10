import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardHrComponent } from './dashboard-hr/dashboard-hr.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AdminHRGuard } from './guards/admin-hr.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { BodyEmployeeDashbordComponent } from './dashboard-client/body-employee-dashbord/body-employee-dashbord.component';
import { TasksComponent } from './dashboard-components/tasks/tasks.component';
import { UsersComponent } from './dashboard-components/users/users.component';
import { LeaveRequestsComponent } from './dashboard-components/leaverequests/leaverequests.component';
import { FilesComponent } from './dashboard-components/files/files.component';
import { AttendancesComponent } from './dashboard-components/attendances/attendances.component';
import { AnnouncementComponent } from './dashboard-components/announcements/announcements.component';
import { SalaryhistoryComponent } from './dashboard-components/salaryhistory/salaryhistory.component';
import { HolidaysComponent } from './dashboard-components/holidays/holidays.component';
import { ApplyLeaveComponent } from './dashboard-client/apply-leave/apply-leave.component';
import { LeaveComponent } from './dashboard-client/leave/leave.component';
import { ComplaintsComponent } from './dashboard-client/complaints/complaints.component';
import { SidebarComponent } from './dashboard-client/sidebar/sidebar.component';
import { ComplaintsComponent2 } from './dashboard-components/complaints/complaints.component';
import { UnauthorizedComponent } from './login/unauthorized/unauthorized.component';
import { ProfileEmployeeComponent } from './dashboard-client/profile-employee/profile-employee.component';
import { MesLeaveComponent } from './dashboard-client/mes-leave/mes-leave.component';
import { TaskTrackingComponent } from './dashboard-client/task-tracking/task-tracking.component';
import { AttendancesEmployeeComponent } from './dashboard-client/attendances/attendances.component';
import { ComplaintListComponent } from './dashboard-client/complaint-list/complaint-list.component';
import { AttendanceListComponent } from './dashboard-client/attendance-list/attendance-list.component';
import { EmployeesHrComponent } from './dashboard-hr/employees-hr/employees-hr.component';
import { UpdateEmployeeHrComponent } from './dashboard-hr/employees-hr/update-employee-hr/update-employee-hr.component';
import { AttendancesHrComponent } from './dashboard-hr/attendances-hr/attendances-hr.component';
import { AttendanceListHrComponent } from './dashboard-hr/attendance-list-hr/attendance-list-hr.component';
import { BodyHrDashboardComponent } from './dashboard-hr/body-hr-dashboard/body-hr-dashboard.component';
import { ProfileHrComponent } from './dashboard-hr/profile-hr/profile-hr.component';
import { LeaveListHrComponent } from './dashboard-hr/leave-list-hr/leave-list-hr.component';
import { EmployeesOnLeaveComponent } from './dashboard-hr/employees-on-leave/employees-on-leave.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'admin-dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', loadComponent: () => import('./demo/dashboard/dash-analytics.component') },
      { path: 'projects', component: ProjectsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'users', component: UsersComponent },
      { path: 'leaves', component: LeaveRequestsComponent },
      { path: 'complaints', component: ComplaintsComponent2 },
      { path: 'files', component: FilesComponent },
      { path: 'attendances', component: AttendancesComponent },
      { path: 'announcements', component: AnnouncementComponent },
      { path: 'salaryhistory', component: SalaryhistoryComponent },
      {path:'holidays', component: HolidaysComponent}
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'admin-hr-dashboard', component: DashboardHrComponent, canActivate: [AuthGuard, AdminHRGuard],
    children: [
      { path: 'profile', component: ProfileHrComponent },
      { path: 'home', component: BodyHrDashboardComponent },
      { path: 'applyLeave', component: ApplyLeaveComponent },
      { path: 'leave', component: LeaveListHrComponent },
      { path: 'employees-on-leave', component: EmployeesOnLeaveComponent },
      { path: 'Complaints', component: ComplaintsComponent },
      { path: 'attendances-hr', component:AttendancesHrComponent },
      { path: 'task', component:TaskTrackingComponent },
      {path: 'complaint-list', component:ComplaintListComponent},
      {path:'attendance-list-hr',component:AttendanceListHrComponent},
      {path:'employees',component:EmployeesHrComponent},
      { path: 'update-employee/:id', component: UpdateEmployeeHrComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]

   },
  { path: 'employee-dashboard', component: DashboardClientComponent, canActivate: [AuthGuard, EmployeeGuard],
    children: [
      { path: 'profile', component: ProfileEmployeeComponent },
      { path: 'home', component: BodyEmployeeDashbordComponent },
      { path: 'applyLeave', component: ApplyLeaveComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'mes-leave', component: MesLeaveComponent },
      { path: 'Complaints', component: ComplaintsComponent },
      { path: 'attendances', component:AttendancesEmployeeComponent },
      { path: 'task', component:TaskTrackingComponent },
      {path: 'complaint-list', component:ComplaintListComponent},
      {path:'attendance-list',component:AttendanceListComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'side', component: SidebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
