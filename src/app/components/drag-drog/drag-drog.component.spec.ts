import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDrogComponent } from './drag-drog.component';

describe('DragDrogComponent', () => {
  let component: DragDrogComponent;
  let fixture: ComponentFixture<DragDrogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDrogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDrogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
