import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HolidaysService } from 'src/app/services/holidays/holidays.service';
import { Holiday } from 'src/app/models/holiday';
@Component({
  selector: 'app-update-holiday',
  templateUrl: './update-holiday.component.html',
  styleUrls: ['./update-holiday.component.scss']
})
export class UpdateHolidayComponent implements OnInit {
  @Input() holidayId: number | undefined;
  @Output() closeUpdateHoliday = new EventEmitter<void>();

  holidayName: string = '';
  holidayDate: string = '';

  constructor(private holidaysService: HolidaysService) { }

  ngOnInit(): void {
    if (this.holidayId !== undefined) {
      this.holidaysService.getHolidayById(this.holidayId).subscribe(
        (holiday) => {
          this.holidayName = holiday.name;
          this.holidayDate = holiday.date;
        },
        (error) => {
          console.error('Error fetching holiday', error);
        }
      );
    }
  }

  onCancel(): void {
    this.closeUpdateHoliday.emit();
  }

  onSubmit(): void {
    if (this.holidayId !== undefined && this.holidayName && this.holidayDate) {
      const updatedHoliday: Holiday = { id: this.holidayId, name: this.holidayName, date: this.holidayDate };
      this.holidaysService.updateHoliday(this.holidayId, updatedHoliday).subscribe(
        (holiday) => {
          console.log('Holiday updated:', holiday);
          this.closeUpdateHoliday.emit();
        },
        (error) => {
          console.error('Error updating holiday', error);
        }
      );
    } else {
      console.error('Holiday ID is undefined or fields are required');
    }
  }
}
