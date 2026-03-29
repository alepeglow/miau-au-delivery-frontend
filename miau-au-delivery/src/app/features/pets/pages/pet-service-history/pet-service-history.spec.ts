import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetServiceHistoryComponent } from './pet-service-history';

describe('PetServiceHistoryComponent', () => {
  let component: PetServiceHistoryComponent;
  let fixture: ComponentFixture<PetServiceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetServiceHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PetServiceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});