import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListHrComponent } from './complaint-list-hr.component';

describe('ComplaintListHrComponent', () => {
  let component: ComplaintListHrComponent;
  let fixture: ComponentFixture<ComplaintListHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintListHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintListHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
