import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet } from '../models/pet.model';
import { PETS_MOCK } from '../mock/pets.mock';

function genId(prefix = 'pet') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const STORAGE_KEY = 'miauau_pets';

@Injectable({ providedIn: 'root' })
export class PetsStore {
  private readonly _pets$ = new BehaviorSubject<Pet[]>(this.loadInitial());
  pets$ = this._pets$.asObservable();

  private loadInitial(): Pet[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Pet[];
    } catch {}
    return [...PETS_MOCK];
  }

  private persist(items: Pet[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }

  getSnapshot(): Pet[] {
    return this._pets$.getValue();
  }

  list(): Pet[] {
    return this.getSnapshot();
  }

  getById(id: string): Pet | undefined {
    return this.getSnapshot().find((p) => p.id === id);
  }

  add(petInput: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>): Pet {
    const now = new Date().toISOString();

    const newPet: Pet = {
      ...petInput,
      id: genId(),
      createdAt: now,
      updatedAt: now,
    };

    const next = [newPet, ...this.getSnapshot()];
    this._pets$.next(next);
    this.persist(next);

    return newPet;
  }

  update(id: string, patch: Partial<Pet>): Pet | null {
    const now = new Date().toISOString();
    const pets = this.getSnapshot();
    const idx = pets.findIndex((p) => p.id === id);
    if (idx < 0) return null;

    const current = pets[idx];

    const updated: Pet = {
      ...current,
      ...patch,
      // ✅ mantém dados existentes (não apaga sub-objetos)
      health: { ...(current.health ?? {}), ...(patch.health ?? {}) },
      additionalInfo: { ...(current.additionalInfo ?? {}), ...(patch.additionalInfo ?? {}) },
      updatedAt: now,
    };

    const next = [...pets];
    next[idx] = updated;

    this._pets$.next(next);
    this.persist(next);

    return updated;
  }
}