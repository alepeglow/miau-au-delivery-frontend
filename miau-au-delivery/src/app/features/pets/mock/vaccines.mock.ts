import { VaccineRecord } from '../models/vaccine.model';

function addYears(base: Date, years: number) {
  const d = new Date(base);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

const now = new Date();

export const VACCINES_MOCK: VaccineRecord[] = [
  {
    id: 'vac_001',
    petId: 'pet_001',
    name: 'Vacina V10',
    description: 'Proteção contra 10 doenças',
    appliedAt: new Date('2026-03-15T00:00:00.000Z').toISOString(),
    nextDoseAt: addYears(new Date('2026-03-15T00:00:00.000Z'), 1).toISOString(),
    vetName: 'Dra. Ana Silva',
    status: 'EM_DIA',
  },
  {
    id: 'vac_002',
    petId: 'pet_001',
    name: 'Antirrábica',
    description: 'Proteção contra raiva',
    appliedAt: new Date('2026-01-10T00:00:00.000Z').toISOString(),
    nextDoseAt: addYears(new Date('2026-01-10T00:00:00.000Z'), 1).toISOString(),
    vetName: 'Dr. Carlos Mendes',
    status: 'PROXIMA_DOSE',
  },
  {
    id: 'vac_003',
    petId: 'pet_001',
    name: 'Gripe Canina',
    description: 'Proteção respiratória',
    appliedAt: new Date('2026-02-22T00:00:00.000Z').toISOString(),
    nextDoseAt: addYears(new Date('2026-02-22T00:00:00.000Z'), 1).toISOString(),
    vetName: 'Dra. Ana Silva',
    status: 'EM_DIA',
  },
];