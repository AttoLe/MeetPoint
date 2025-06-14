import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SectionHeaderComponent } from '../shared/section-header.component';

interface Participant {
  id: number;
  username: string;
  color: string;
}

@Component({
  selector: 'app-session-participants-section.component',
  imports: [MatIconModule, SectionHeaderComponent],
  template: ` <div style="height: 100%; width: 100%">
    <app-section-header
      title="Participants"
      (onClick)="openSessionParticipantPage()"
    />
    <div class="carousele">
      @for (participant of Participants; track participant){
      <div class="person-container" (onClick)="openProfile()">
        <div
          class="circle"
          style="background-color: {{ participant.color }}"
        ></div>
        <label>{{ participant.username }}</label>
      </div>
      }
    </div>
  </div>`,
  styles: `

  .carousele{
    height: 50%;
    display: flex;
    gap: 2rem;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: left;
    margin: auto
  }

  .person-container{
     transition: transform 0.5s ease;
     height: 100%;
  }

  .circle{
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .person-container:hover{
    transform: scale(1.05);
  }

  :host{
      display: block;
      width: 100%;
      height: 200px;
  }`,
})
export class SessionParticipantsSectionComponent {
  Participants: Participant[] = [
    { id: 0, username: 'test1', color: 'yellow' },
    { id: 1, username: 'test2', color: 'red' },
    { id: 2, username: 'test3', color: 'green' },
    { id: 3, username: 'test4', color: 'blue' },
    { id: 4, username: 'test5', color: 'brown' },
  ];

  openProfile(): void {
    //open person profile popup
  }

  openSessionParticipantPage(): void {
    //router
  }
}
