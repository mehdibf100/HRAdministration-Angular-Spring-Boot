import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  private buttonClickSubject = new Subject<void>();

  buttonClick$ = this.buttonClickSubject.asObservable();
  triggerButtonClick() {
    this.buttonClickSubject.next();
  }
}