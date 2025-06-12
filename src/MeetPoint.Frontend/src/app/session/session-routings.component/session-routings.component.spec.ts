import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRoutingsComponent } from './session-routings.component';

describe('SessionRoutingsComponent', () => {
  let component: SessionRoutingsComponent;
  let fixture: ComponentFixture<SessionRoutingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRoutingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRoutingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
