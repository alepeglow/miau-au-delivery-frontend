import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet } from '../models/pet.model';
import { PETS_MOCK } from '../mock/pets.mock';

function genId(prefix = 'pet') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

@Injectable({ providedIn: 'root' })
export class PetsStore {
  private readonly _pets$ = new BehaviorSubject<Pet[]>([...PETS_MOCK]);

  pets$ = this._pets$.asObservable();

  getSnapshot() {
    return this._pets$.getValue();
  }

  add(petInput: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>): Pet {
    const now = new Date().toISOString();

    const newPet: Pet = {
      ...petInput,
      id: genId(),
      createdAt: now,
      updatedAt: now,
    };

    this._pets$.next([newPet, ...this.getSnapshot()]);
    return newPet;
  }

  update(id: string, patch: Partial<Pet>): Pet | null {
    const now = new Date().toISOString();
    const pets = this.getSnapshot();
    const idx = pets.findIndex(p => p.id === id);
    if (idx < 0) return null;

    const updated: Pet = { ...pets[idx], ...patch, updatedAt: now };
    const next = [...pets];
    next[idx] = updated;
    this._pets$.next(next);
    return updated;
  }

  getById(id: string): Pet | undefined {
    return this.getSnapshot().find(p => p.id === id);
  }
}
