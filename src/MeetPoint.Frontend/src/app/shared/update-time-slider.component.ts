import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'update-time-slider',
  imports: [MatSliderModule, FormsModule],
  template: `
    <div class="main-container">
      <div style="width: 100%">
        <label id="time-slider-label" style="margin: 16px">
          Personal update frequency
        </label>
      </div>
      <mat-slider
        aria-labelledby="time-slider-label"
        style="width: 80%; margin: auto"
        class="slider"
        min="0"
        [max]="timeLabels.length - 1"
        step="1"
        tickInterval="1"
        showTickMarks
        discrete
        [displayWith]="selectedLabel"
        ><input
          matSliderThumb
          [value]="selectedIndex"
          (valueChange)="this.selectedIndex.set($event)"
        />
      </mat-slider>
    </div>
  `,
  styles: `

    .main-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: var(--mat-sys-surface-variant);
      border-top-left-radius: var(--mat-sys-corner-extra-small); border-top-right-radius: var(--mat-sys-corner-extra-small); padding-top: 10px
    }


    .slider {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `,
})
export class UpdateTimeSliderComponent {
  public timeLabels = [
    '1 s',
    '5 s',
    '10 s',
    '30 s',
    '1 m',
    '5 m',
    '15 m',
    '30 m',
    '1 h',
    '6 h',
    '24 h',
  ];

  public defaultIndex = input(1);
  public selectedIndex = model(this.defaultIndex());

  public readonly OnChange = output<string>();

  selectedLabel(value: number) {
    console.log(this.timeLabels[value]);
    this.OnChange.emit(this.timeLabels[value]);
    return this.timeLabels[value];
  }
}
