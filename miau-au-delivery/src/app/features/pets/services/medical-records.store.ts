import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MEDICAL_RECORDS_MOCK } from '../mock/medical-records.mock';
import { MedicalRecord } from '../models/medical-record.model';

function genId(prefix = 'mr') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const STORAGE_KEY = 'miauau_medical_records';

@Injectable({ providedIn: 'root' })
export class MedicalRecordsStore {
  private readonly _items$ = new BehaviorSubject<MedicalRecord[]>(this.loadInitial());
  items$ = this._items$.asObservable();

  private loadInitial(): MedicalRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as MedicalRecord[];
    } catch {}
    return [...MEDICAL_RECORDS_MOCK];
  }

  private persist(items: MedicalRecord[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }

  getSnapshot(): MedicalRecord[] {
    return this._items$.getValue();
  }

  getByPetId(petId: string): MedicalRecord[] {
    return this.getSnapshot()
      .filter(r => r.petId === petId)
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()); // mais recentes primeiro
  }

  add(input: Omit<MedicalRecord, 'id'>): MedicalRecord {
    const record: MedicalRecord = { ...input, id: genId() };
    const next = [record, ...this.getSnapshot()];
    this._items$.next(next);
    this.persist(next);
    return record;
  }

  update(id: string, patch: Partial<MedicalRecord>): MedicalRecord | null {
    const items = this.getSnapshot();
    const idx = items.findIndex(r => r.id === id);
    if (idx < 0) return null;

    const updated: MedicalRecord = { ...items[idx], ...patch };
    const next = [...items];
    next[idx] = updated;

    this._items$.next(next);
    this.persist(next);
    return updated;
  }
}