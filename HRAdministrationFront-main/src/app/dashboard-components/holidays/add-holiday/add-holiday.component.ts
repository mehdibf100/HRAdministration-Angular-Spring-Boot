import { Component, EventEmitter, Output } from '@angular/core';
import { Holiday } from 'src/app/models/holiday';
import { HolidaysService } from 'src/app/services/holidays/holidays.service';
@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent {
  @Output() closeAddHoliday = new EventEmitter<void>();

  holidayName: string = '';
  holidayDate: string = '';

  constructor(private holidayService: HolidaysService) {}

  onCancel(): void {
    this.closeAddHoliday.emit();
  }

  onSubmit(): void {
    const newHoliday: Holiday = {
      name: this.holidayName,
      date: this.holidayDate
    };

    this.holidayService.createHoliday(newHoliday).subscribe(
      (holiday) => {
        console.log('Holiday added:', holiday);
        this.closeAddHoliday.emit();
      },
      (error) => {
        console.error('Error adding holiday', error);
      }
    );
  }
}
