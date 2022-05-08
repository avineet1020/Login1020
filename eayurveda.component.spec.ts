import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EayurvedaComponent } from './eayurveda.component';

describe('EayurvedaComponent', () => {
  let component: EayurvedaComponent;
  let fixture: ComponentFixture<EayurvedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EayurvedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EayurvedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
