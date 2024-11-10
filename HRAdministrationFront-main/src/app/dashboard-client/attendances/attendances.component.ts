import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { ButtonService } from 'src/app/services/shared/service.service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss'
})
export class AttendancesEmployeeComponent implements OnInit,OnDestroy {
  date: any;
  time: any;
  test: any;
  test2 = true;
  attendance: any;
  attendanceToday = {
    end_time: 0,
    start_time: 0,
  };

  constructor(private attendancesService: AttendancesService,private buttonService:ButtonService) {}
  private subscription: Subscription | undefined;

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    localStorage.setItem("toggle","0");
    this.initializePage();
    this.subscription = this.buttonService.buttonClick$.subscribe(() => {
      this.onGlobalButtonClick();
    });
  }

  initializePage() {
    this.testAttendanceToday();
    this.getAttendanceByDate();
    localStorage.setItem('title', 'Attendances');

    const dateTime = new Date();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    this.time = `${hours}:${minutes}`;
    this.date = dateTime.toISOString().split('T')[0];

    const storedTest = localStorage.getItem('test');
    if (storedTest === null || storedTest === '') {
      localStorage.setItem('test', 'false');
    }
    this.test = storedTest;
  }

  PunchIn() {
    this.attendancesService.punchIn().subscribe(
      res => {
        console.log(res);
        localStorage.setItem('test', 'true');
        this.test = 'true';
        this.updateAttendanceData(); // Update data without page reload
      },
      error => {
        console.log(error);
      }
    );
  }

  PunchOut() {
    this.attendancesService.punchOut().subscribe(
      res => {
        console.log(res);
        this.updateAttendanceData(); // Update data without page reload
      },
      error => {
        console.log(error);
      }
    );
  }

  updateAttendanceData() {
    this.testAttendanceToday();
    this.getAttendanceByDate();
  }

  testAttendanceToday() {
    this.attendancesService.testAttendanceToday().subscribe(
      res => {
        if (res === true) {
          localStorage.setItem('test', 'false');
          this.test = 'false';
        }
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAttendanceByDate() {
    this.attendancesService.getAttendanceByDate().subscribe(
      res => {
        this.attendance = res;
        if (res) {
          this.attendanceToday = this.attendance[0];
        }
        console.log(this.attendanceToday);
      },
      error => {
        console.log(error);
      }
    );
  }
  onGlobalButtonClick() {
    // Action à réaliser lorsque le bouton est cliqué
    console.log('Le bouton a été cliqué!');
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("attendance");
    if(toggle==="1"){   // Vérifie s'il y a au moins un élément
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "width: 900px;margin-left:0px;";
     });}
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "width:600px;margin-left: 200px;";
      });}

     }
  }
