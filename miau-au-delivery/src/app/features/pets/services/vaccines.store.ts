import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VaccineRecord } from '../models/vaccine.model';
import { VACCINES_MOCK } from '../mock/vaccines.mock';

function genId(prefix = 'vac') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const STORAGE_KEY = 'miauau_vaccines';

@Injectable({ providedIn: 'root' })
export class VaccinesStore {
  private readonly _items$ = new BehaviorSubject<VaccineRecord[]>(this.loadInitial());
  items$ = this._items$.asObservable();

  private loadInitial(): VaccineRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as VaccineRecord[];
    } catch {}
    return [...VACCINES_MOCK];
  }

  private persist(items: VaccineRecord[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }

  getSnapshot() {
    return this._items$.getValue();
  }

  getByPetId(petId: string) {
    return this.getSnapshot()
      .filter(v => v.petId === petId)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  add(record: Omit<VaccineRecord, 'id'>) {
    const newItem: VaccineRecord = { ...record, id: genId() };
    const next = [newItem, ...this.getSnapshot()];

    this._items$.next(next);
    this.persist(next);

    return newItem;
  }

  update(id: string, patch: Partial<VaccineRecord>) {
  const items = this.getSnapshot();
  const idx = items.findIndex(v => v.id === id);
  if (idx < 0) return null;

  const updated: VaccineRecord = { ...items[idx], ...patch };
  const next = [...items];
  next[idx] = updated;

  this._items$.next(next);     // ✅ obrigatório
  this.persist(next);          // ✅ persistir

  return updated;
}

  // opcional: útil se você quiser remover registros no futuro
  remove(id: string) {
    const next = this.getSnapshot().filter(v => v.id !== id);
    this._items$.next(next);
    this.persist(next);
  }
}