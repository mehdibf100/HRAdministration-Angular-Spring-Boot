import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApexAxisChartSeries, ApexTitleSubtitle, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ProjectService } from 'src/app/services/projects/projects.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { HolidaysService } from 'src/app/services/holidays/holidays.service';
import { LeaveRequestsService } from 'src/app/services/leaverequests/leaverequests.service';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions
} from 'ng-apexcharts';

@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export default class DashAnalyticsComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild('customerChart') customerChart!: ChartComponent;

  totalUsers: number = 0;
  totalProjects: number = 0;
  totalAttendances: number = 0;
  totalEmployeesOnLeave: number = 0;
  upcomingHolidays: { name: string, date: Date }[] = [];
  complaintsStatusData: { resolved: number, notResolved: number, pending: number } = { resolved: 0, notResolved: 0, pending: 0 };
  leaveStatusData: { approved: number, pending: number, rejected: number } = { approved: 0, pending: 0, rejected: 0 };

  leaveRequestsChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    responsive: ApexResponsive[];
    plotOptions: ApexPlotOptions;
    title: ApexTitleSubtitle;
  } = {
    series: [
      {
        name: 'Leave Requests',
        data: []
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Approved', 'Pending', 'Rejected']
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: 'Leave Requests Overview',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false
      }
    }
  };

  cards = [
    {
      background: 'bg-c-blue',
      title: 'Total Users',
      icon: 'icon-user',
      number: this.totalUsers,
      text: 'Total number of users in the system',
      no: ''
    },
    {
      background: 'bg-c-green',
      title: 'Total Projects',
      icon: 'icon-briefcase',
      number: this.totalProjects,
      text: 'Total number of projects',
      no: ''
    },
    {
      background: 'bg-c-yellow',
      title: 'Total Attendances',
      icon: 'icon-calendar',
      number: this.totalAttendances,
      text: 'Total number of attendance records',
      no: ''
    },
    {
      background: 'bg-c-red',
      title: 'Employees On Leave',
      icon: 'icon-calendar',
      number: this.totalEmployeesOnLeave,
      text: 'Number of Employees on Leave',
      no: ''
    }
  ];

  complaintsChartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
    plotOptions?: ApexPlotOptions;
    title: ApexTitleSubtitle;
  } = {
    series: [],
    chart: {
      type: 'pie'
    },
    labels: ['Resolved', 'Not Resolved', 'Pending'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: 'Complaints Status',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333'
      }
    }
  };

  constructor(
    private userService: UsersService,
    private projectService: ProjectService,
    private attendanceService: AttendancesService,
    private holidayService: HolidaysService,
    private complaintsService: ComplaintsService,
    private leaveService: LeaveRequestsService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadUpcomingHolidays();
    this.loadComplaintsData();
    this.loadLeaveRequestData();
  }

  loadDashboardData() {
    this.userService.getTotalUsers().subscribe((data: number) => {
      this.totalUsers = data;
      this.updateCards();
    });

    this.projectService.getTotalProjects().subscribe((data: number) => {
      this.totalProjects = data;
      this.updateCards();
    });

    this.attendanceService.getTotalAttendances().subscribe((data: number) => {
      this.totalAttendances = data;
      this.updateCards();
    });
    this.leaveService.getTotalEmployeesOnLeave().subscribe((data: number) => {
      this.totalEmployeesOnLeave = data;
      this.updateCards();
    });
  }

  loadUpcomingHolidays() {
    this.holidayService.getUpcomingHolidays().subscribe((data: any[]) => {
      this.upcomingHolidays = data;
      console.log(data, "Upcoming Holidays Data");
    });
  }

  loadComplaintsData() {
    this.complaintsService.getComplaints().subscribe((complaints) => {
      this.complaintsStatusData.resolved = complaints.filter(c => c.status === 'RESOLVED').length;
      this.complaintsStatusData.notResolved = complaints.filter(c => c.status === 'NOT_RESOLVED').length;
      this.complaintsStatusData.pending = complaints.filter(c => c.status === 'IN_PROGRESS').length;

      this.updateComplaintsChart();
    });
  }

  updateComplaintsChart() {
    this.complaintsChartOptions.series = [
      this.complaintsStatusData.resolved,
      this.complaintsStatusData.notResolved,
      this.complaintsStatusData.pending
    ];
  }

  loadLeaveRequestData() {
    this.leaveService.getAllLeaveRequests().subscribe((leaveRequests) => {
      this.leaveStatusData.approved = leaveRequests.filter(lr => lr.status === 'APPROVED').length;
      this.leaveStatusData.pending = leaveRequests.filter(lr => lr.status === 'PENDING').length;
      this.leaveStatusData.rejected = leaveRequests.filter(lr => lr.status === 'REJECTED').length;

      this.updateLeaveRequestsChart();
    });
  }

  updateLeaveRequestsChart() {
    this.leaveRequestsChartOptions.series = [
      {
        name: 'Leave Requests',
        data: [
          this.leaveStatusData.approved,
          this.leaveStatusData.pending,
          this.leaveStatusData.rejected
        ]
      }
    ];
  }

  updateCards() {
    this.cards = [
      {
        background: 'bg-c-blue',
        title: 'Total Users',
        icon: 'icon-user',
        number: this.totalUsers,
        text: 'Total number of users',
        no: ''
      },
      {
        background: 'bg-c-green',
        title: 'Total Projects',
        icon: 'icon-briefcase',
        number: this.totalProjects,
        text: 'Total number of projects',
        no: ''
      },
      {
        background: 'bg-c-yellow',
        title: 'Total Attendances',
        icon: 'icon-calendar',
        number: this.totalAttendances,
        text: 'Total number of attendances',
        no: ''
      },
      {
        background: 'bg-c-red',
        title: 'Employees On Leave',
        icon: 'icon-user',
        number: this.totalEmployeesOnLeave,
        text: 'Number of employees on leave',
        no: ''
      }
    ];
  }
}
