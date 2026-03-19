import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type VaccineProofDialogData = {
  vaccineName: string;
};

export type VaccineProofDialogResult = {
  proofUrl: string; // base64
  fileName?: string;
};

@Component({
  selector: 'app-vaccine-proof-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './vaccine-proof-dialog.html',
  styleUrl: './vaccine-proof-dialog.scss',
})
export class VaccineProofDialogComponent {
  preview: string | null = null;
  fileName: string | null = null;

  constructor(
    private ref: MatDialogRef<VaccineProofDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VaccineProofDialogData
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileName = file.name;

    // ✅ imagem ou pdf
    const allowed =
      file.type.startsWith('image/') || file.type === 'application/pdf';

    if (!allowed) {
      alert('Selecione uma imagem (PNG/JPG) ou PDF.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string; // base64
    };
    reader.readAsDataURL(file);

    input.value = '';
  }

  cancel() {
    this.ref.close();
  }

  save() {
    if (!this.preview) return;

    const result: VaccineProofDialogResult = {
      proofUrl: this.preview,
      fileName: this.fileName || undefined,
    };

    this.ref.close(result);
  }
}