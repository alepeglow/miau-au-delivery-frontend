import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetMedicalHistory } from './pet-medical-history';

describe('PetMedicalHistory', () => {
  let component: PetMedicalHistory;
  let fixture: ComponentFixture<PetMedicalHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetMedicalHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetMedicalHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
