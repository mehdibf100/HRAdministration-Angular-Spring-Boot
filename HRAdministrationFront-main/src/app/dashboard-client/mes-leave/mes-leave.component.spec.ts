import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesLeaveComponent } from './mes-leave.component';

describe('MesLeaveComponent', () => {
  let component: MesLeaveComponent;
  let fixture: ComponentFixture<MesLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
