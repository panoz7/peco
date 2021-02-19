import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestEditComponent } from './nest-edit.component';

describe('NestEditComponent', () => {
  let component: NestEditComponent;
  let fixture: ComponentFixture<NestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
