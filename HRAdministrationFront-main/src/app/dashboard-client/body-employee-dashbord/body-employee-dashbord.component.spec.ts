import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyEmployeeDashbordComponent } from './body-employee-dashbord.component';

describe('BodyEmployeeDashbordComponent', () => {
  let component: BodyEmployeeDashbordComponent;
  let fixture: ComponentFixture<BodyEmployeeDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyEmployeeDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyEmployeeDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
