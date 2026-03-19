import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { VaccineStatus } from '../../models/vaccine.model';

export type VaccineDoseDialogData = {
  vaccineName: string;
  appliedAt?: string;   // ISO
  nextDoseAt?: string;  // ISO
};

export type VaccineDoseDialogResult = {
  appliedAt: string;        // ISO
  nextDoseAt?: string;      // ISO | undefined
  status: VaccineStatus;    // automático
};

@Component({
  selector: 'app-vaccine-dose-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './vaccine-dose-dialog.html',
  styleUrl: './vaccine-dose-dialog.scss',
})
export class VaccineDoseDialogComponent {
  form: any;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<VaccineDoseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VaccineDoseDialogData
  ) {
    this.form = this.fb.group({
      appliedAt: [data.appliedAt ? new Date(data.appliedAt) : null, Validators.required],
      nextDoseAt: [data.nextDoseAt ? new Date(data.nextDoseAt) : null],
    });
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
    const appliedDate: Date = raw.appliedAt!;
    const nextDate: Date | null = raw.nextDoseAt;

    const appliedAt = new Date(appliedDate).toISOString();
    const nextDoseAt = nextDate ? new Date(nextDate).toISOString() : undefined;

    const status = this.computeStatus(nextDate);

    const result: VaccineDoseDialogResult = { appliedAt, nextDoseAt, status };
    this.ref.close(result);
  }

  // ✅ status automático baseado na próxima dose
  private computeStatus(next: Date | null): VaccineStatus {
  if (!next) return 'EM_DIA';

  const now = new Date();

  // zera horas pra comparar por dia
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(next.getFullYear(), next.getMonth(), next.getDate());

  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'ATRASADA';
  if (diffDays <= 30) return 'PROXIMA_DOSE'; // “em breve” = até 30 dias
  return 'EM_DIA';
}
}