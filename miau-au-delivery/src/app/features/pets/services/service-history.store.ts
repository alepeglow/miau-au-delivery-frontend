import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SERVICE_RECORDS_MOCK } from '../mock/service-records.mock';
import { ServiceRecord } from '../models/service-record.model';

function genId(prefix = 'sr') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const STORAGE_KEY = 'miauau_service_history';

@Injectable({ providedIn: 'root' })
export class ServiceHistoryStore {
  private readonly _items$ = new BehaviorSubject<ServiceRecord[]>(this.loadInitial());
  items$ = this._items$.asObservable();

  private loadInitial(): ServiceRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as ServiceRecord[];
    } catch {}
    return [...SERVICE_RECORDS_MOCK];
  }

  private persist(items: ServiceRecord[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }

  getSnapshot(): ServiceRecord[] {
    return this._items$.getValue();
  }

  getByPetId(petId: string): ServiceRecord[] {
    return this.getSnapshot()
      .filter(r => r.petId === petId)
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }

  add(input: Omit<ServiceRecord, 'id'>): ServiceRecord {
    const item: ServiceRecord = { ...input, id: genId() };
    const next = [item, ...this.getSnapshot()];
    this._items$.next(next);
    this.persist(next);
    return item;
  }

  update(id: string, patch: Partial<ServiceRecord>): ServiceRecord | null {
    const items = this.getSnapshot();
    const idx = items.findIndex(x => x.id === id);
    if (idx < 0) return null;

    const updated: ServiceRecord = { ...items[idx], ...patch };
    const next = [...items];
    next[idx] = updated;

    this._items$.next(next);
    this.persist(next);
    return updated;
  }
}