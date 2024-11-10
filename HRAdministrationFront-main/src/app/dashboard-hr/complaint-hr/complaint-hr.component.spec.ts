import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintHrComponent } from './complaint-hr.component';

describe('ComplaintHrComponent', () => {
  let component: ComplaintHrComponent;
  let fixture: ComponentFixture<ComplaintHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
