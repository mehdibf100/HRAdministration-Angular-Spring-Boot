import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  attendanceChartData: ChartData<'line'> = {
    labels: [], // Months
    datasets: [
      {
        data: [], // Number of attendances
        label: 'Attendance Count',
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      }
    ]
  };
  attendanceChartType: ChartType = 'line'; // Specify type explicitly
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Attendances: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  attendances: Attendance[] = [];
  filteredAttendances: Attendance[] = [];
  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];
  selectedMonth: string = '';

  constructor(private attendanceService: AttendancesService) {}

  ngOnInit(): void {
    this.loadAttendances();
  }

  loadAttendances(): void {
    this.attendanceService.getAttendanceForConnectedUser().subscribe((data: Attendance[]) => {
      this.attendances = data;
      this.filteredAttendances = data;
      this.updateChartData();
    });
  }

  onMonthChange(): void {
    if (this.selectedMonth) {
      this.filteredAttendances = this.attendances.filter(att =>
        new Date(att.date).getMonth() + 1 === parseInt(this.selectedMonth)
      );
    } else {
      this.filteredAttendances = this.attendances;
    }
    this.updateChartData();
  }

  updateChartData(): void {
    const attendanceCountPerMonth: { [key: string]: number } = {};
    this.filteredAttendances.forEach(att => {
      const month = new Date(att.date).getMonth() + 1; 
      const monthKey = month < 10 ? `0${month}` : `${month}`; 
      attendanceCountPerMonth[monthKey] = (attendanceCountPerMonth[monthKey] || 0) + 1;
    });

    this.attendanceChartData.labels = this.months.map(m => m.name);
    this.attendanceChartData.datasets[0].data = this.months.map(m => attendanceCountPerMonth[m.value] || 0);
  }

  get selectedMonthName(): string {
    const month = this.months.find(m => m.value === this.selectedMonth);
    return month ? month.name : 'All Months';
  }
}
