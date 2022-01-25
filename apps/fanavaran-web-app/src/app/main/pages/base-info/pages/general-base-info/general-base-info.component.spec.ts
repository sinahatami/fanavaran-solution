import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBaseInfoComponent } from './general-base-info.component';

describe('GeneralBaseInfoComponent', () => {
  let component: GeneralBaseInfoComponent;
  let fixture: ComponentFixture<GeneralBaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralBaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
