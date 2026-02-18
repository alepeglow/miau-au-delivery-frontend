import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PetsStore } from '../../services/pets.store';
import { Pet } from '../../models/pet.model';

type Size = 'Pequeno' | 'Médio' | 'Grande';

@Component({
  selector: 'app-pet-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './pet-edit.html',
  styleUrl: './pet-edit.scss',
})
export class PetEditComponent {
  pet?: Pet;
  photoPreview: string | null = null;

  sizeOptions: Size[] = ['Pequeno', 'Médio', 'Grande'];

  form: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private petsStore: PetsStore
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }

    const pet = this.petsStore.getById(id);
    if (!pet) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }

    this.pet = pet;
    this.photoPreview = pet.photoUrl || null;

    this.form = this.fb.group({
      photoUrl: [pet.photoUrl || ''],
      name: [pet.name || '', [Validators.required, Validators.minLength(2)]],
      breed: [pet.breed || '', [Validators.required]],
      ageYears: [pet.ageYears ?? null, [Validators.required]],
      size: [pet.additionalInfo?.size ?? null, [Validators.required]],
      notes: [pet.notes || ''],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.snack.open('Escolha uma imagem (PNG/JPG).', 'OK', { duration: 2500 });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.photoPreview = base64;
      this.form.patchValue({ photoUrl: base64 });
      this.snack.open('Foto atualizada!', 'OK', { duration: 1800 });
    };
    reader.readAsDataURL(file);

    input.value = '';
  }

  save() {
    if (this.form.invalid || !this.pet?.id) {
      this.form.markAllAsTouched();
      this.snack.open('Confira os campos obrigatórios.', 'OK', { duration: 2500 });
      return;
    }

    const raw = this.form.getRawValue();

    const updated = this.petsStore.update(this.pet.id, {
      photoUrl: raw.photoUrl || '',
      name: raw.name,
      breed: raw.breed,
      ageYears: Number(raw.ageYears),
      notes: raw.notes || '',
      additionalInfo: {
        ...(this.pet.additionalInfo ?? {}),
        size: raw.size,
      },
    });

    if (!updated) {
      this.snack.open('Não foi possível salvar (pet não encontrado).', 'OK', { duration: 2500 });
      return;
    }

    this.snack.open('Alterações salvas!', 'OK', { duration: 2000 });
    this.router.navigateByUrl(`/pets/${this.pet.id}`);
  }

  cancel() {
    if (!this.pet?.id) return;
    this.router.navigateByUrl(`/pets/${this.pet.id}`);
  }

  get name() { return this.form.controls.name; }
}
