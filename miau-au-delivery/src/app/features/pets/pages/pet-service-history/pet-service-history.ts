import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { PetsStore } from '../../services/pets.store';
import { Pet } from '../../models/pet.model';
import { ServiceHistoryStore } from '../../services/service-history.store';
import { ServiceRecord } from '../../models/service-record.model';

type PetChip = { id: string; name: string; photoUrl?: string };

@Component({
  selector: 'app-pet-service-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './pet-service-history.html',
  styleUrl: './pet-service-history.scss',
})
export class PetServiceHistoryComponent implements OnDestroy {
  petId!: string;
  pet?: Pet;

  chips: PetChip[] = [];
  selectedChipId: string = '';
  showAllPets = false;

  search = '';

  rows: ServiceRecord[] = [];
  filtered: ServiceRecord[] = [];

  displayedColumns = ['date', 'pet', 'service', 'clinic', 'professional', 'status', 'actions'];

  kpis = { BANHO: 0, TOSA: 0, CONSULTA: 0, EXAME: 0 };

  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petsStore: PetsStore,
    private serviceStore: ServiceHistoryStore,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }
    this.petId = id;
    this.selectedChipId = id;
    this.showAllPets = false;

    this.sub.add(
      this.petsStore.pets$.subscribe((pets) => {
        const p = pets.find((x) => x.id === this.petId);
        if (!p) return;

        this.pet = p;

        this.chips = pets.slice(0, 3).map((x) => ({
          id: x.id,
          name: x.name,
          photoUrl: x.photoUrl,
        }));

        if (!this.chips.some((c) => c.id === this.petId)) {
          this.chips.unshift({ id: p.id, name: p.name, photoUrl: p.photoUrl });
        }
      }),
    );

    this.sub.add(this.serviceStore.items$.subscribe(() => this.reload()));
    this.reload();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  reload() {
    this.rows = this.showAllPets
      ? this.serviceStore
          .getSnapshot()
          .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
      : this.serviceStore.getByPetId(this.selectedChipId || this.petId);

    this.applySearch();
    this.calcKpis();
  }

  selectAllPets() {
    this.showAllPets = true;
    this.reload();
  }

  selectPetChip(petId: string) {
    this.showAllPets = false;
    this.selectedChipId = petId;
    this.router.navigateByUrl(`/pets/${petId}/historico-servicos`);
  }

  applySearch() {
    const q = (this.search || '').trim().toLowerCase();
    this.filtered = !q
      ? this.rows
      : this.rows.filter((r) =>
          `${r.service} ${r.clinic} ${r.professional}`.toLowerCase().includes(q),
        );
  }

  calcKpis() {
    const base = this.rows;
    this.kpis = {
      BANHO: base.filter((x) => x.type === 'BANHO').length,
      TOSA: base.filter((x) => x.type === 'TOSA').length,
      CONSULTA: base.filter((x) => x.type === 'CONSULTA').length,
      EXAME: base.filter((x) => x.type === 'EXAME').length,
    };
  }

  statusLabel(s: ServiceRecord['status']) {
    return s === 'CONCLUIDO' ? 'Concluído' : 'Pendente';
  }
  serviceIcon(type: ServiceRecord['type']) {
  if (type === 'BANHO') return 'shower';
  if (type === 'TOSA') return 'content_cut';
  if (type === 'CONSULTA') return 'medical_services';
  if (type === 'EXAME') return 'science';
  return 'vaccines'; // VACINA
}

  viewDetails(row: ServiceRecord) {
    alert(`Em breve: detalhes de "${row.service}" (mock)`);
  }

  backToProfile() {
    this.router.navigateByUrl(`/pets/${this.petId}`);
  }

  formatDate(dtIso: string) {
    const d = new Date(dtIso);
    const dd = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
    const hh = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(d);
    return { dd, hh };
  }

  petNameById(id: string) {
    return this.petsStore.getById(id)?.name || 'Pet';
  }

  petPhotoById(id: string) {
    return this.petsStore.getById(id)?.photoUrl || '';
  }
}
