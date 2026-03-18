import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetVaccines } from './pet-vaccines';

describe('PetVaccines', () => {
  let component: PetVaccines;
  let fixture: ComponentFixture<PetVaccines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetVaccines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetVaccines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
