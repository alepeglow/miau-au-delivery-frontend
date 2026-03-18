import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineDoseDialog } from './vaccine-dose-dialog';

describe('VaccineDoseDialog', () => {
  let component: VaccineDoseDialog;
  let fixture: ComponentFixture<VaccineDoseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineDoseDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineDoseDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
