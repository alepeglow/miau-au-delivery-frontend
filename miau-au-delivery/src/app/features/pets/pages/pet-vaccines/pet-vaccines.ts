import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VaccineProofDialogComponent, VaccineProofDialogResult } from '../../dialogs/vaccine-proof-dialog/vaccine-proof-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VaccineDoseDialogComponent, VaccineDoseDialogResult } from '../../dialogs/vaccine-dose-dialog/vaccine-dose-dialog';
import { PetsStore } from '../../services/pets.store';
import { VaccinesStore } from '../../services/vaccines.store';
import { Pet } from '../../models/pet.model';
import { VaccineRecord } from '../../models/vaccine.model';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VaccineFormDialogComponent, VaccineFormDialogResult } from '../../dialogs/vaccine-form-dialog/vaccine-form-dialog';

@Component({
  selector: 'app-pet-vaccines',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './pet-vaccines.html',
  styleUrl: './pet-vaccines.scss',
})
export class PetVaccinesComponent implements OnDestroy {
  pet?: Pet;
  vaccines: VaccineRecord[] = [];

  private sub = new Subscription();
  private petId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petsStore: PetsStore,
    private vaccinesStore: VaccinesStore,
    private dialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }
    this.petId = id;

    // mantém pet atualizado
    this.sub.add(
      this.petsStore.pets$.subscribe((pets) => {
        const p = pets.find((x) => x.id === this.petId);
        if (!p) {
          this.router.navigateByUrl('/pets/novo');
          return;
        }
        this.pet = p;
      })
    );

    // lista vacinas do pet
    this.loadVaccines();

    // reativo: sempre que o store mudar, recarrega
    this.sub.add(this.vaccinesStore.items$.subscribe(() => this.loadVaccines()));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private loadVaccines() {
    this.vaccines = this.vaccinesStore.getByPetId(this.petId);
  }

  backToPets() {
    // no futuro: /pets (listagem). por enquanto volta pro perfil
    this.router.navigateByUrl(`/pets/${this.petId}`);
  }

  viewPetProfile() {
    this.router.navigateByUrl(`/pets/${this.petId}`);
  }

  addNewVaccine() {
    const ref = this.dialog.open(VaccineFormDialogComponent, {
      width: '720px',
      maxWidth: '92vw',
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'miau-dialog',
      data: { mode: 'create', petId: this.petId, species: this.pet?.species },
    });

    ref.afterClosed().subscribe((res: VaccineFormDialogResult | undefined) => {
      if (!res) return;
      this.vaccinesStore.add(res.payload as any);
    });
  }

  editVaccine(v: VaccineRecord) {
    const ref = this.dialog.open(VaccineFormDialogComponent, {
      width: '720px',
      maxWidth: '92vw',
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'miau-dialog',
      data: { mode: 'edit', petId: this.petId, species: this.pet?.species, vaccine: v },
    });

    ref.afterClosed().subscribe((res: VaccineFormDialogResult | undefined) => {
      if (!res || !res.id) return;
      this.vaccinesStore.update(res.id, res.payload as any);
    });
  }

  addDose(v: VaccineRecord) {
  const ref = this.dialog.open(VaccineDoseDialogComponent, {
    width: '720px',
    maxWidth: '92vw',
    autoFocus: false,
    restoreFocus: false,
    panelClass: 'miau-dialog',
    data: {
      vaccineName: v.name,
      appliedAt: v.appliedAt,
      nextDoseAt: v.nextDoseAt,
    },
  });

  ref.afterClosed().subscribe((res: VaccineDoseDialogResult | undefined) => {
    if (!res) return;

    this.vaccinesStore.update(v.id, {
      appliedAt: res.appliedAt,
      nextDoseAt: res.nextDoseAt,
      status: res.status,
    });
  });
}

  attachProof(v: VaccineRecord) {
  const ref = this.dialog.open(VaccineProofDialogComponent, {
    width: '720px',
    maxWidth: '92vw',
    autoFocus: false,
    restoreFocus: false,
    panelClass: 'miau-dialog',
    data: { vaccineName: v.name },
  });

  ref.afterClosed().subscribe((res: VaccineProofDialogResult | undefined) => {
    if (!res) return;
    this.vaccinesStore.update(v.id, { proofUrl: res.proofUrl });
    this.loadVaccines(); // força refresh imediato da lista na tela
  });
}

  statusLabel(status: VaccineRecord['status']) {
    if (status === 'EM_DIA') return 'Em dia';
    if (status === 'PROXIMA_DOSE') return 'Próxima dose em breve';
    return 'Atrasada';
  }

  statusClass(status: VaccineRecord['status']) {
    if (status === 'EM_DIA') return 'ok';
    if (status === 'PROXIMA_DOSE') return 'warn';
    return 'danger';
  }
}