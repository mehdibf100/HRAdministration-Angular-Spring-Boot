import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttendancesService } from 'src/app/services/attendances/attendances.service';
import { ButtonService } from 'src/app/services/shared/service.service';

@Component({
  selector: 'app-attendances-hr',
  templateUrl: './attendances-hr.component.html',
  styleUrl: './attendances-hr.component.scss'
})
export class AttendancesHrComponent implements OnInit {
  date: any;
  time: any;
  test: any;
  test2 = true;
  attendance: any;
  attendanceToday = {
    end_time: 0,
    start_time: 0,
  };
  private subscription: Subscription | undefined;

  constructor(private attendancesService: AttendancesService , private buttonService : ButtonService) {}

  ngOnInit(): void {
    this.initializePage();
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
        this.updateAttendanceData();
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
        this.updateAttendanceData();
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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onGlobalButtonClick() {
    console.log('Le bouton a été cliqué!');
    let toggle= localStorage.getItem("toggle");
    const elements = document.getElementsByClassName("attendance");
    if(toggle==="1"){
     Array.from(elements).forEach((element) => {
       (element as HTMLElement).style.cssText = "width:700px;";
     });}
     else{
      Array.from(elements).forEach((element) => {
        (element as HTMLElement).style.cssText = "width: 900px;";
      });}

     }

}

