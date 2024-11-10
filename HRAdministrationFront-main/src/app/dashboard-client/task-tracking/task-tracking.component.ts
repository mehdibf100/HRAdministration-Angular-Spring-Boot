import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../services/projects/projects.service';
import { TaskService } from '../../services/tasks/tasks.service';
import { Task } from 'src/app/models/task';
import { Roles } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { HolidaysService } from 'src/app/services/holidays/holidays.service';
import { Holiday } from 'src/app/models/holiday';
import { ButtonService } from 'src/app/services/shared/service.service';
import { Subscription } from 'rxjs';


type weekDays = 'monday' |'tuesday' |'wednesday' |'thursday' |'friday';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './task-tracking.component.html',
  styleUrl: './task-tracking.component.scss'
})
export class TaskTrackingComponent implements OnInit,OnDestroy{
  constructor(private projectService:ProjectService,private taskService:TaskService,private userService:UsersService,private holidayService : HolidaysService,private buttonService:ButtonService){}
  private subscription: Subscription | undefined;
  project:any;
  selectedDate: any;
  userId:any;
  tasks:any;
  date:any;
  holidays: Holiday[] = [];

  ngOnInit(): void {
    localStorage.setItem('title','Time Tracking');
    this.fetchHolidays();
    console.log(this.getDateForDay("wednesday"));
    console.log(this.isHoliday("wednesday"));  
    this.selectedDate=new Date();
    const startOfWeek = this.selectedDate
    startOfWeek.setDate(this.selectedDate.getDate() - this.selectedDate.getDay() + 1);
  
    this.weekDays.monday = this.formatDate(new Date(startOfWeek));
    this.weekDays.tuesday = this.formatDate(this.addDays(startOfWeek, 1));
    this.weekDays.wednesday = this.formatDate(this.addDays(startOfWeek, 2));
    this.weekDays.thursday = this.formatDate(this.addDays(startOfWeek, 3));
    this.weekDays.friday = this.formatDate(this.addDays(startOfWeek, 4));
  
  this.projectService.getProjects().subscribe(
    res=>{
      console.log(res);
      this.project=res;
    },
    error=>{
      console.log(error);
    }
  )
  this.userId=sessionStorage.getItem('id');
  console.log(this.userId);
  this.getTasksWeek();
  this.subscription = this.buttonService.buttonClick$.subscribe(() => {
    this.onGlobalButtonClick();
  });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }}
    onGlobalButtonClick() {
      console.log('Le bouton a été cliqué nav');
      let toggle= localStorage.getItem("toggle");
      const elements = document.getElementsByClassName("timeSheet");
      if(toggle==="1"){
       Array.from(elements).forEach((element) => {
         (element as HTMLElement).style.cssText = "margin-left:20px;width:80%";
       });
      }
       else{
        Array.from(elements).forEach((element) => {
          (element as HTMLElement).style.cssText = "margin-left:250px;width:72%";
        });
      }
  
       }
  Add() {
    const tr1 = document.getElementById('tr1');
    let selectedDate=this.selectedDate.toISOString().split('T')[0];
    let task: Task = {
      date: selectedDate,
      activityName: '',
      monday: '00:00',
      tuesday: '00:00',
      wednesday: '00:00',
      thursday: '00:00',
      friday: '00:00',
      project: {
        id: 0,
        name: '',
        tasks: []
      },
      user: {
        id: 0,
        email: '',
        password: '',
        role: Roles.ROLE_EMPLOYEE,
        tasks: []
      } 
    };

    if (tr1) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 5;
      const select1 = document.createElement('select');
  
      const option1_1 = document.createElement('option');
      option1_1.value = 'option1';
      option1_1.text = 'Select Project';
      select1.appendChild(option1_1);
      for (let i = 0; i < this.project.length; i++){
      const option1_2 = document.createElement('option');
      option1_2.value = this.project[i].id;
      option1_2.text = this.project[i].name;
      select1.appendChild(option1_2);
      select1.style.cssText="width: 90%;padding: 5px;height: 40px; box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;"
  
    }
      td.appendChild(select1);
      tr.appendChild(td);
  
  
      const td0 = document.createElement('td');
      td0.colSpan = 3;
      const input0 = document.createElement('input');
            input0.type = 'text';
            input0.value="";
            input0.placeholder="Task"
            input0.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
            td0.appendChild(input0);
  
      tr.appendChild(td0);
  
            const td1 = document.createElement('td');
            td1.colSpan = 3;
            td1.style.cssText="padding: 10px;"
            const input1 = document.createElement('input');
            input1.type = 'text';
            input1.value="00:00";
  
            input1.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
  
            td1.appendChild(input1);
            const td2 = document.createElement('td');
            td2.colSpan = 3;
            td2.style.cssText="padding: 10px;"
            const input2 = document.createElement('input');
            input2.type = 'text';
            input2.value="00:00";
            input2.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
            td2.appendChild(input2);
  
            const td3 = document.createElement('td');
            td3.colSpan = 3;
            td3.style.cssText="padding: 10px;"
            const input3 = document.createElement('input');
            input3.type = 'text';
            input3.value="00:00";
            input3.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
            td3.appendChild(input3);
  
            const td4 = document.createElement('td');
            td4.colSpan = 3;
            td4.style.cssText="padding: 10px;"
            const input4 = document.createElement('input');
            input4.type = 'text';
            input4.value="00:00";
            input4.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
            td4.appendChild(input4);
  
            const td5 = document.createElement('td');
            td5.colSpan = 3;
            td5.style.cssText="padding: 10px;"
            const input5 = document.createElement('input');
            input5.type = 'text';
            input5.value="00:00";
            input5.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
            td5.appendChild(input5);
  
            const tdT = document.createElement('td');
            tdT.colSpan = 3;
            tdT.style.cssText="padding: 10px;"
            const inputT = document.createElement('input');
            inputT.type = 'text';
            inputT.value="00:00";
            inputT.style.cssText="width: 100%;padding:5px;box-sizing: border-box;text-align: center; border-radius: 10px;border-color: gainsboro;";
            tdT.appendChild(inputT);
  const tdDel=document.createElement('td');
  const iconDel=document.createElement('img');
  iconDel.src="https://icons.veryicon.com/png/o/miscellaneous/simple-linetype-icon/trash-96.png";
  iconDel.style.width="35px";
  iconDel.style.width="25px";
  tdDel.appendChild(iconDel);
  tdDel.style.display="none";
  tr.addEventListener("mouseover", () => {
    tdDel.style.display = "block";
    tdDel.style.marginTop="10px";
  });
  tr.addEventListener("mouseout", () => {
    tdDel.style.display = "none";
  });
  tdDel.addEventListener("click",()=>{
  tr1.removeChild(tr);
  });
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(tdT);
        tr.appendChild(tdDel);
        tr.style.cssText="border: none;border-bottom:1px solid gainsboro;";
        tr1.appendChild(tr);
        document.getElementById("save")?.addEventListener("click",()=>{
          task = {
            date: selectedDate,
            activityName: input0.value,
            monday: input1.value,
            tuesday: input2.value,
            wednesday: input3.value,
            thursday: input4.value,
            friday:input5.value,
            project: {
              id: Number(select1.value),
              name: '',
              tasks: []
            },
            user: {
              id: 4,
              email: '',
              password: '',
              role: Roles.ROLE_EMPLOYEE,
              tasks: []
            }
          };
          this.taskService.createTask(task).subscribe(
            res=>{
              console.log(res);
            },
            error=>{
              console.log(error);
            }
          )
        })
  
    } else {
        console.error("L'élément avec l'ID 'tr1' n'a pas été trouvé.");
    }
  }
  weekDays = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
  };
  
  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      return;
    }
  
    this.selectedDate = new Date(input.value);
  
    const startOfWeek = new Date(this.selectedDate);
    startOfWeek.setDate(this.selectedDate.getDate() - this.selectedDate.getDay() + 1);
  
    this.weekDays.monday = this.formatDate(new Date(startOfWeek));
    this.weekDays.tuesday = this.formatDate(this.addDays(startOfWeek, 1));
    this.weekDays.wednesday = this.formatDate(this.addDays(startOfWeek, 2));
    this.weekDays.thursday = this.formatDate(this.addDays(startOfWeek, 3));
    this.weekDays.friday = this.formatDate(this.addDays(startOfWeek, 4));
    this.getTasksWeek();
  }
  
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }
  
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    };
    return date.toLocaleDateString('en-GB', options);
  }
  Minus(){
    this.selectedDate.setDate(this.selectedDate.getDate() -7);
    const startOfWeek = this.selectedDate
    startOfWeek.setDate(this.selectedDate.getDate() - this.selectedDate.getDay() + 1);
  
    this.weekDays.monday = this.formatDate(new Date(startOfWeek));
    this.weekDays.tuesday = this.formatDate(this.addDays(startOfWeek, 1));
    this.weekDays.wednesday = this.formatDate(this.addDays(startOfWeek, 2));
    this.weekDays.thursday = this.formatDate(this.addDays(startOfWeek, 3));
    this.weekDays.friday = this.formatDate(this.addDays(startOfWeek, 4));
    this.getTasksWeek();
  }
  Plus(){
    this.selectedDate.setDate(this.selectedDate.getDate() +7);
    const startOfWeek = this.selectedDate
    startOfWeek.setDate(this.selectedDate.getDate() - this.selectedDate.getDay() + 1);
  
    this.weekDays.monday = this.formatDate(new Date(startOfWeek));
    this.weekDays.tuesday = this.formatDate(this.addDays(startOfWeek, 1));
    this.weekDays.wednesday = this.formatDate(this.addDays(startOfWeek, 2));
    this.weekDays.thursday = this.formatDate(this.addDays(startOfWeek, 3));
    this.weekDays.friday = this.formatDate(this.addDays(startOfWeek, 4));
    this.getTasksWeek();
  }
  getTasksWeek() {
    const selectedDate = this.selectedDate.toISOString().split('T')[0];
    
    this.userService.getCurrentUser().subscribe(
      user => {
        if (user && user.id) {
          const userId = user.id; 
          this.taskService.GetTasksWeek(selectedDate, userId).subscribe(
            res => {
              this.tasks = res;
              console.log(this.tasks);
            },
            error => {
              console.log(error);
            }
          );
        } else {
          console.error('User not found or user ID is undefined.');
        }
      },
      error => {
        console.error('Error fetching current user:', error);
      }
    );
  }  save(){
    for(let i=0;i<=this.tasks.length;i++){
    this.taskService.createTask(this.tasks[i]).subscribe(
      res=>{
        console.log(res);
      }
    ,
    error=>{
      console.log(error)
    })
  }}
  deleteTask(id:any){
  this.taskService.deleteTask(id).subscribe(
    res=>{
      console.log(res);
      window.location.reload();
    },
    error=>{
      console.log(error);
    }
  )
  }
  
  totalDay="00:00"

  getTotalHours(task: Task): string {
    const totalMinutes = [
      task.monday, task.tuesday, task.wednesday, task.thursday, task.friday
    ].reduce((sum, time) => {
      const [hours, minutes] = time.split(':').map(part => parseInt(part, 10) || 0);
      return sum + hours * 60 + minutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  getTotalDayHours(day: string): string {
    const totalMinutes = this.tasks.reduce((sum: number, task: { [x: string]: any; }) => {
      const time = task[day]; 
      if (time) {
        const [hours, minutes] = time.split(':').map((part: string) => parseInt(part, 10) || 0);
        return sum + hours * 60 + minutes;
      }
      return sum;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  getTotalWeekHours(): string {
    let totalMinutes = 0;

    this.tasks.forEach((task: { [x: string]: any; }) => {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      days.forEach(day => {
        const time = task[day];
        if (time) {
          const [hours, minutes] = time.split(':').map(Number);
          totalMinutes += hours * 60 + minutes;
        }
      });
    });
    const totalHours = Math.floor(totalMinutes / 60);
    const totalRemainingMinutes = totalMinutes % 60;
    return `${String(totalHours).padStart(2, '0')}:${String(totalRemainingMinutes).padStart(2, '0')}`;
  }
  fetchHolidays() {
    this.holidayService.getAllHolidays().subscribe((holidays) => {
      this.holidays = holidays;
    });
  }

  isHoliday(day: weekDays): boolean {
    const dateToCheck = this.getDateForDay(day);
    return this.holidays.some(holiday => holiday.date === dateToCheck);
  }

  getDateForDay(day: weekDays): string {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    const dayMapping: Record<weekDays, number> = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
    };

    const targetDay = dayMapping[day.toLowerCase() as weekDays];
    const dayDifference = targetDay - currentDay;
    const targetDate = new Date(currentDate.getTime() + dayDifference * 24 * 60 * 60 * 1000);

    return targetDate.toISOString().split('T')[0];
  }

  getHolidayName(date: string): string {
    const holiday = this.holidays.find(holiday => holiday.date === date);
    return holiday ? holiday.name : 'Holiday';
  }
  

}


