import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperDialog } from './cropper-dialog.component';

describe('CropperDialog', () => {
  let component: CropperDialog;
  let fixture: ComponentFixture<CropperDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropperDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
