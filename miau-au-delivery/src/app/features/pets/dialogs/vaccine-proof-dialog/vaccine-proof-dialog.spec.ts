import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineProofDialog } from './vaccine-proof-dialog';

describe('VaccineProofDialog', () => {
  let component: VaccineProofDialog;
  let fixture: ComponentFixture<VaccineProofDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineProofDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineProofDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
