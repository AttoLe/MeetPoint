import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavTopComponent } from './main-nav-top.component';

describe('MainNavTopComponent', () => {
  let component: MainNavTopComponent;
  let fixture: ComponentFixture<MainNavTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
