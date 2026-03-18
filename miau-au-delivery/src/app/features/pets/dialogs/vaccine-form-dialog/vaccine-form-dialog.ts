import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { VaccineRecord, VaccineStatus } from '../../models/vaccine.model';

type PetSpecies = 'CAO' | 'GATO' | 'OUTRO';
type CatalogSpecies = 'CAO' | 'GATO' | 'AMBOS';

type CatalogItem = { name: string; description: string; species: CatalogSpecies };

export type VaccineFormDialogData = {
  mode: 'create' | 'edit';
  petId: string;
  species?: PetSpecies;      // ✅ recebe espécie do pet
  vaccine?: VaccineRecord;   // quando edit
};

export type VaccineFormDialogResult = {
  action: 'create' | 'update';
  id?: string;
  payload: {
    petId: string;
    name: string;
    description: string;
    appliedAt: string;
    nextDoseAt?: string;
    vetName?: string;
    status: VaccineStatus;
  };
};

@Component({
  selector: 'app-vaccine-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './vaccine-form-dialog.html',
  styleUrl: './vaccine-form-dialog.scss',
})
export class VaccineFormDialogComponent {
  // catálogo completo (CÃO + GATO + AMBOS)
  private catalogAll: CatalogItem[] = [
    // 🐶 Cão
    { name: 'Vacina V10', description: 'Proteção contra 10 doenças', species: 'CAO' },
    { name: 'Gripe Canina', description: 'Proteção respiratória', species: 'CAO' },
    { name: 'Giárdia', description: 'Proteção contra giardíase', species: 'CAO' },

    // 🐱 Gato
    { name: 'V4 Felina', description: 'Proteção contra doenças respiratórias e panleucopenia', species: 'GATO' },
    { name: 'FeLV', description: 'Proteção contra leucemia felina', species: 'GATO' },

    // 🐶🐱 Ambos
    { name: 'Antirrábica', description: 'Proteção contra raiva', species: 'AMBOS' },
  ];

  // catálogo filtrado para o pet atual
  catalog: { name: string; description: string }[] = [];

  statusOptions: { value: VaccineStatus; label: string }[] = [
    { value: 'EM_DIA', label: 'Em dia' },
    { value: 'PROXIMA_DOSE', label: 'Próxima dose' },
    { value: 'ATRASADA', label: 'Atrasada' },
  ];

  form: any;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<VaccineFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VaccineFormDialogData
  ) {
    // ✅ filtra catálogo por espécie (CAO/GATO) + AMBOS
    const sp = data.species === 'GATO' ? 'GATO' : 'CAO'; // se vier OUTRO/undefined, trata como CAO
    this.catalog = this.catalogAll
      .filter((c) => c.species === 'AMBOS' || c.species === sp)
      .map(({ name, description }) => ({ name, description }));

    // ✅ cria o form primeiro
    this.form = this.fb.group({
      catalogName: ['', Validators.required],
      description: [''],
      appliedAt: [null as Date | null, Validators.required],
      nextDoseAt: [null as Date | null],
      vetName: [''],
      status: ['EM_DIA' as VaccineStatus, Validators.required],
    });

    // modo editar: preencher
    if (data.mode === 'edit' && data.vaccine) {
      const v = data.vaccine;

      this.form.patchValue({
        catalogName: v.name,
        description: v.description,
        appliedAt: v.appliedAt ? new Date(v.appliedAt) : null,
        nextDoseAt: v.nextDoseAt ? new Date(v.nextDoseAt) : null,
        vetName: v.vetName || '',
        status: v.status,
      });
    }

    // sempre que muda o nome do catálogo, preenche descrição
    this.form.controls.catalogName.valueChanges.subscribe((name: string) => {
      const item = this.catalog.find((c) => c.name === name);
      if (item) {
        this.form.patchValue({ description: item.description }, { emitEvent: false });
      }
    });

    // no create: seleciona o primeiro do catálogo filtrado
    if (data.mode === 'create') {
      const first = this.catalog[0];
      if (first) {
        this.form.patchValue({ catalogName: first.name, description: first.description });
      }
    }
  }

  cancel() {
    this.ref.close();
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const result: VaccineFormDialogResult = {
      action: this.data.mode === 'create' ? 'create' : 'update',
      id: this.data.vaccine?.id,
      payload: {
        petId: this.data.petId,
        name: raw.catalogName!,
        description: raw.description || '',
        appliedAt: new Date(raw.appliedAt!).toISOString(),
        nextDoseAt: raw.nextDoseAt ? new Date(raw.nextDoseAt).toISOString() : undefined,
        vetName: raw.vetName || '',
        status: raw.status!,
      },
    };

    this.ref.close(result);
  }
}