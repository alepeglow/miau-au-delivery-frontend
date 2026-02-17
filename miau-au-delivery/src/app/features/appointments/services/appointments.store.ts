import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../../pets/models/appointment.model';

import { APPOINTMENTS_MOCK } from '../mocks/appointments.mock';


@Injectable({ providedIn: 'root' })
export class AppointmentsStore {
  private readonly _items$ = new BehaviorSubject<Appointment[]>([...APPOINTMENTS_MOCK]);
  items$ = this._items$.asObservable();

  getByPetId(petId: string): Appointment[] {
    return this._items$.getValue()
      .filter(a => a.petId === petId)
      .sort((a, b) => a.startAt.localeCompare(b.startAt));
  }

  getPreviewMocks() {
  // devolve 2 itens só pra “demonstração”
  return this._items$.getValue().slice(0, 2);
}

}
