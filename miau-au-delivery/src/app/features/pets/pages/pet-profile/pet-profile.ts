import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class PetProfileComponent implements OnDestroy {
  pet?: Pet;
  upcoming: Upcoming[] = [];

  private sub = new Subscription();
  private petId!: string;

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
    this.petId = id;

    // ✅ Reativo: sempre que o store muda (ex: editou e salvou), atualiza o perfil
    this.sub.add(
      this.petsStore.pets$.subscribe((pets) => {
        const found = pets.find((p) => p.id === this.petId);

        if (!found) {
          this.router.navigateByUrl('/pets/novo');
          return;
        }

        this.pet = found;
        this.loadUpcoming(found.id);
      })
    );

    // primeira carga (caso o subscribe demore 0ms, mas é ok)
    const snap = this.petsStore.getById(this.petId);
    if (snap) {
      this.pet = snap;
      this.loadUpcoming(snap.id);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private loadUpcoming(petId: string) {
    const apps = this.appointmentsStore.getByPetId(petId);
    const list = apps.length > 0 ? apps : this.appointmentsStore.getPreviewMocks();

    this.upcoming = list.map((a) => ({
      title: a.title,
      dateLabel: this.formatBr(new Date(a.startAt)),
      variant: a.type === 'BATH_GROOMING' ? 'success' : 'primary',
    }));
  }

  back() {
    this.router.navigateByUrl('/pets/novo');
  }

  edit() {
    if (!this.pet?.id) return;
    this.router.navigateByUrl(`/pets/${this.pet.id}/editar`);
  }

  goVaccines() { /* futuro */ }
  goMedicalHistory() { /* futuro */ }
  goServiceHistory() { /* futuro */ }

  private formatBr(d: Date) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} às ${hh}:${min}`;
  }
}
