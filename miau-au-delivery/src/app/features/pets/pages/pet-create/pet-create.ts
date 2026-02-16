import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetsStore } from '../../services/pets.store';
import { Pet } from '../../models/pet.model';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

type Species = 'CAO' | 'GATO' | 'OUTRO';
type Sex = 'M' | 'F';

@Component({
  selector: 'app-pet-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './pet-create.html',
  styleUrl: './pet-create.scss',
})
export class PetCreateComponent {
  speciesOptions = [
    { value: 'CAO' as Species, label: 'Cão' },
    { value: 'GATO' as Species, label: 'Gato' },
    { value: 'OUTRO' as Species, label: 'Outro' },
  ];

  form;

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private petsStore: PetsStore
  ) {
    this.form = this.fb.group({
      photoUrl: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      species: [null as Species | null, [Validators.required]],
      breed: [''],
      ageYears: [null as number | null],
      weightKg: [null as number | null],
      sex: ['M' as Sex, [Validators.required]],
      lastVaccineDate: [null as Date | null],
      notes: [''],

      health: this.fb.group({
        allergies: [''],
        medications: [''],
        restrictions: [''],
        vetName: [''],
      }),
    });
  }

  setSex(value: Sex) {
    this.form.patchValue({ sex: value });
  }

  onPhotoMock() {
    this.form.patchValue({ photoUrl: 'mock://pet-photo' });
    this.snack.open('Foto do pet adicionada com sucesso!', 'OK', { duration: 2000 });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Confira os campos obrigatórios.', 'OK', { duration: 2500 });
      return;
    }

    const raw = this.form.getRawValue();

const created = this.petsStore.add({
  photoUrl: raw.photoUrl || '',
  name: raw.name!,
  species: raw.species!,
  breed: raw.breed || '',
  ageYears: raw.ageYears ?? null,
  weightKg: raw.weightKg ?? null,
  sex: raw.sex!,
  lastVaccineDate: raw.lastVaccineDate ? new Date(raw.lastVaccineDate).toISOString() : null,
  notes: raw.notes || '',
  health: {
    allergies: raw.health.allergies || undefined,
    medications: raw.health.medications || undefined,
    restrictions: raw.health.restrictions || undefined,
    vetName: raw.health.vetName || undefined,
  },
});

this.snack.open('Pet salvo com sucesso! (mock)', 'OK', { duration: 2200 });

// próximo passo: perfil do pet
this.router.navigateByUrl(`/pets/${created.id}`);

  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  get name() { return this.form.controls.name; }
  get species() { return this.form.controls.species; }
}
