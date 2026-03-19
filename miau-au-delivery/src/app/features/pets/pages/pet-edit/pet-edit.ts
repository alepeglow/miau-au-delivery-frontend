import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  petId!: string;

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
    this.petId = id;

    const pet = this.petsStore.getById(id);
    if (!pet) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }

    this.pet = pet;
    this.photoPreview = pet.photoUrl || null;

    // ✅ monta o form
    this.form = this.fb.group({
      photoUrl: [pet.photoUrl || ''],
      name: [pet.name || '', [Validators.required, Validators.minLength(2)]],
      breed: [pet.breed || '', [Validators.required]],
      ageYears: [pet.ageYears ?? null, [Validators.required]],
      size: [pet.additionalInfo?.size ?? null, [Validators.required]],

      // ✅ listas (FormArray)
      notes: this.fb.array(this.toControls(pet.notes)),
      allergies: this.fb.array(this.toControls(pet.health?.allergies)),
      medications: this.fb.array(this.toControls(pet.health?.medications)),
      restrictions: this.fb.array(this.toControls(pet.health?.restrictions)),

      vetName: [pet.health?.vetName || ''],
    });

    // ✅ garante pelo menos 1 campo visível em cada lista (UX)
    this.ensureAtLeastOne(this.notesArray);
    this.ensureAtLeastOne(this.allergiesArray);
    this.ensureAtLeastOne(this.medicationsArray);
    this.ensureAtLeastOne(this.restrictionsArray);
  }

  // ===== helpers FormArray =====

  private toControls(values?: string[] | string | null) {
  // aceita array, string ou null (compat com dados antigos)
  const arr = Array.isArray(values)
    ? values
    : typeof values === 'string' && values.trim().length
      ? [values.trim()]
      : [];

  return arr.filter(Boolean).map((v) => this.fb.control(v));
}

  private ensureAtLeastOne(arr: FormArray) {
    if (arr.length === 0) arr.push(this.fb.control(''));
  }

  get notesArray(): FormArray {
    return this.form.get('notes') as FormArray;
  }
  get allergiesArray(): FormArray {
    return this.form.get('allergies') as FormArray;
  }
  get medicationsArray(): FormArray {
    return this.form.get('medications') as FormArray;
  }
  get restrictionsArray(): FormArray {
    return this.form.get('restrictions') as FormArray;
  }

  addNote() { this.notesArray.push(this.fb.control('')); }
  removeNote(i: number) {
    this.notesArray.removeAt(i);
    this.ensureAtLeastOne(this.notesArray);
  }

  addAllergy() { this.allergiesArray.push(this.fb.control('')); }
  removeAllergy(i: number) {
    this.allergiesArray.removeAt(i);
    this.ensureAtLeastOne(this.allergiesArray);
  }

  addMedication() { this.medicationsArray.push(this.fb.control('')); }
  removeMedication(i: number) {
    this.medicationsArray.removeAt(i);
    this.ensureAtLeastOne(this.medicationsArray);
  }

  addRestriction() { this.restrictionsArray.push(this.fb.control('')); }
  removeRestriction(i: number) {
    this.restrictionsArray.removeAt(i);
    this.ensureAtLeastOne(this.restrictionsArray);
  }

  // ===== foto =====
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

  // ===== salvar =====
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Confira os campos obrigatórios.', 'OK', { duration: 2500 });
      return;
    }

    const raw = this.form.getRawValue();

    const cleanList = (arr: any[]) =>
      (arr ?? []).map((x) => String(x ?? '').trim()).filter((x) => x.length > 0);

    const updated = this.petsStore.update(this.petId, {
      photoUrl: raw.photoUrl || '',
      name: raw.name,
      breed: raw.breed,
      ageYears: Number(raw.ageYears),
      notes: cleanList(raw.notes),

      additionalInfo: {
        ...(this.pet?.additionalInfo ?? {}),
        size: raw.size,
      },

      health: {
        ...(this.pet?.health ?? {}),
        vetName: raw.vetName || '',
        allergies: cleanList(raw.allergies),
        medications: cleanList(raw.medications),
        restrictions: cleanList(raw.restrictions),
      },
    });

    if (!updated) {
      this.snack.open('Não foi possível salvar (pet não encontrado).', 'OK', { duration: 2500 });
      return;
    }

    this.snack.open('Alterações salvas!', 'OK', { duration: 2000 });
    this.router.navigateByUrl(`/pets/${this.petId}`);
  }

  cancel() {
    this.router.navigateByUrl(`/pets/${this.petId}`);
  }

  // getters úteis
  get name() { return this.form.controls.name; }
}