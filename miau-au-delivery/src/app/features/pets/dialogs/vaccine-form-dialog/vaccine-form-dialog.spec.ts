import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineFormDialog } from './vaccine-form-dialog';

describe('VaccineFormDialog', () => {
  let component: VaccineFormDialog;
  let fixture: ComponentFixture<VaccineFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
