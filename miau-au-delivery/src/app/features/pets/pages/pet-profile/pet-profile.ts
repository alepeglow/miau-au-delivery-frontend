import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentsStore } from '../../../appointments/services/appointments.store';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PetsStore } from '../../services/pets.store';
import { Pet } from '../../models/pet.model';

type Upcoming = { title: string; dateLabel: string; variant: 'success' | 'primary' };

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './pet-profile.html',
  styleUrl: './pet-profile.scss',
})
export class PetProfileComponent {
  pet?: Pet;

  upcoming: Upcoming[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petsStore: PetsStore,
    private appointmentsStore: AppointmentsStore
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }

    this.pet = this.petsStore.getById(id);
    if (!this.pet) {
      this.router.navigateByUrl('/pets/novo');
      return;
    }

    // ✅ Próximos agendamentos vindos do mock por petId
    const apps = this.appointmentsStore.getByPetId(this.pet.id);

    // ✅ fallback: se não tiver agendamentos pro pet novo, mostra exemplos (mock)
    const list = apps.length > 0 ? apps : this.appointmentsStore.getPreviewMocks();

    this.upcoming = list.map((a) => ({
      title: a.title,
      dateLabel: this.formatBr(new Date(a.startAt)),
      variant: a.type === 'BATH_GROOMING' ? 'success' : 'primary',
    }));
  }

  back() {
    // no futuro: /pets (listagem). Por enquanto volta pro cadastro.
    this.router.navigateByUrl('/pets/novo');
  }

  edit() {
    // no futuro: /pets/:id/editar
    this.router.navigateByUrl('/pets/novo');
  }

  goVaccines() { /* futuro */ }
  goMedicalHistory() { /* futuro */ }
  goServiceHistory() { /* futuro */ }

  // ===== helper (datas BR) =====
  private formatBr(d: Date) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} às ${hh}:${min}`;
  }
}
