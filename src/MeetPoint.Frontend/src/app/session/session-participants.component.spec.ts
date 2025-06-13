import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionParticipantsComponent } from './session-participants.component';

describe('SessionParticipantsComponent', () => {
  let component: SessionParticipantsComponent;
  let fixture: ComponentFixture<SessionParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionParticipantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
