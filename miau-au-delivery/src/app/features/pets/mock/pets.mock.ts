import { Pet } from '../models/pet.model';

export const PETS_MOCK: Pet[] = [
  {
    id: 'pet_001',
    name: 'Bolinha',
    species: 'CAO',
    breed: 'Poodle',
    ageYears: 3,
    weightKg: 8.5,
    sex: 'M',
    lastVaccineDate: new Date().toISOString(),
    notes: 'Muito brincalhão.',
    health: {
      allergies: 'Frango',
      medications: 'Antiparasitário',
      restrictions: 'Evitar correr muito',
      vetName: 'Dr. João Silva',
    },
    photoUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
