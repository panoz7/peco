import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestDetailsComponent } from './nest-details.component';

describe('NestDetailsComponent', () => {
  let component: NestDetailsComponent;
  let fixture: ComponentFixture<NestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
