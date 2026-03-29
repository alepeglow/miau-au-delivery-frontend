import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { PetsStore } from '../../services/pets.store';
import { MedicalRecordsStore } from '../../services/medical-records.store';
import { Pet } from '../../models/pet.model';
import { MedicalRecord, MedicalRecordType } from '../../models/medical-record.model';

type TypeFilter = 'TODOS' | MedicalRecordType;

@Component({
  selector: 'app-pet-medical-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './pet-medical-history.html',
  styleUrl: './pet-medical-history.scss',
})
export class PetMedicalHistoryComponent implements OnDestroy {
  pet?: Pet;
  petId!: string;

  records: MedicalRecord[] = [];
  filtered: MedicalRecord[] = [];

  typeFilter: TypeFilter = 'TODOS';
  visibleCount = 5;

  typeOptions: { value: TypeFilter; label: string }[] = [
    { value: 'TODOS', label: 'Todos os tipos' },
    { value: 'CONSULTA', label: 'Consultas' },
    { value: 'EXAME', label: 'Exames' },
    { value: 'VACINA', label: 'Vacinas' },
    { value: 'IMAGEM', label: 'Imagem (Raio-X)' },
    { value: 'CIRURGIA', label: 'Cirurgias' },
  ];

  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petsStore: PetsStore,
    private medicalStore: MedicalRecordsStore
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }
    this.petId = id;

    // pet reativo (se editar, atualiza aqui)
    this.sub.add(
      this.petsStore.pets$.subscribe(pets => {
        const p = pets.find(x => x.id === this.petId);
        if (!p) {
          this.router.navigateByUrl('/pets/novo');
          return;
        }
        this.pet = p;
      })
    );

    // registros reativos
    this.sub.add(
      this.medicalStore.items$.subscribe(() => {
        this.records = this.medicalStore.getByPetId(this.petId);
        this.applyFilter();
      })
    );

    // carga inicial
    this.records = this.medicalStore.getByPetId(this.petId);
    this.applyFilter();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  backToProfile() {
    this.router.navigateByUrl(`/pets/${this.petId}`);
  }

  newConsultation() {
    // por enquanto mock: cria um registro simples
    const now = new Date();
    this.medicalStore.add({
      petId: this.petId,
      type: 'CONSULTA',
      title: 'Nova Consulta',
      dateTime: now.toISOString(),
      professionalName: '—',
      professionalRole: 'Veterinário',
      status: 'CONCLUIDA',
      notes: 'Registro criado (mock). Em breve: formulário/modal.',
      meta: [],
      items: [],
    });
  }

  applyFilter() {
    const base =
      this.typeFilter === 'TODOS'
        ? this.records
        : this.records.filter(r => r.type === this.typeFilter);

    this.filtered = base;
  }

  onFilterClick() {
    this.visibleCount = 5;
    this.applyFilter();
  }

  loadMore() {
    this.visibleCount += 5;
  }

  get visibleRecords() {
    return this.filtered.slice(0, this.visibleCount);
  }

  // helpers UI
 typeIcon(t: MedicalRecordType) {
  if (t === 'CONSULTA') return 'medical_services'; // ✅ em vez de stethoscope
  if (t === 'EXAME') return 'science';
  if (t === 'VACINA') return 'vaccines';
  if (t === 'IMAGEM') return 'image';
  return 'healing'; // ✅ cirurgia (ou medical_services)
}

  statusLabel(s: MedicalRecord['status']) {
    if (s === 'CONCLUIDA') return 'Concluída';
    if (s === 'RESULTADOS_OK') return 'Resultados OK';
    if (s === 'APLICADO') return 'Aplicado';
    if (s === 'NORMAL') return 'Normal';
    return 'Recuperado';
  }

  statusClass(s: MedicalRecord['status']) {
    if (s === 'CONCLUIDA') return 'ok';
    if (s === 'RESULTADOS_OK') return 'ok';
    if (s === 'APLICADO') return 'ok';
    if (s === 'NORMAL') return 'ok';
    return 'ok';
  }

  formatPt(dtIso: string) {
    const d = new Date(dtIso);
    const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
    const time = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(d);
    return `${date} • ${time}`;
  }

  // infos do card lateral
  lastConsultLabel() {
    const last = this.records.find(r => r.type === 'CONSULTA');
    if (!last) return '-';
    const d = new Date(last.dateTime);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
  }
}
