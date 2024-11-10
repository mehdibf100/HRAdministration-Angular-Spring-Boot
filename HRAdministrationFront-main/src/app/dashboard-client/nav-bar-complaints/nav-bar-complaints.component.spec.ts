import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComplaintsComponent } from './nav-bar-complaints.component';

describe('NavBarComplaintsComponent', () => {
  let component: NavBarComplaintsComponent;
  let fixture: ComponentFixture<NavBarComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComplaintsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
