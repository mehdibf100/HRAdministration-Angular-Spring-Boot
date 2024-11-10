import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHrDashboardComponent } from './body-hr-dashboard.component';

describe('BodyHrDashboardComponent', () => {
  let component: BodyHrDashboardComponent;
  let fixture: ComponentFixture<BodyHrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyHrDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyHrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
