import { Pet } from '../models/pet.model';

export const PETS_MOCK: Pet[] = [
  {
    id: 'pet_001',
    name: 'Thor',
    species: 'CAO',
    breed: 'Golden Retriever',
    ageYears: 3,
    weightKg: 32,
    sex: 'M',
    lastVaccineDate: new Date().toISOString(),
    notes: 'Dócil e brincalhão.',
    health: {
      allergies: 'Alergia a ração com frango',
      medications: 'Medicação diária para artrite',
      restrictions: '',
      vetName: 'Clínica Miau & Au',
    },
    additionalInfo: {
      neutered: true,
      coat: 'Longa e dourada',
      temperament: 'Dócil e brincalhão',
      size: 'Grande',
      ownerName: 'Ana Paula Santos',
    },
    photoUrl: 'assets/thor.png', // depois a gente mocka com uma imagem local/asset
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },

  {
    id: 'pet_002',
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
    additionalInfo: {
      neutered: false,
      coat: 'Curta',
      temperament: 'Agitado e carinhoso',
      size: 'Pequeno',
      ownerName: 'Carmem',
    },
    photoUrl: 'assets/bolinha.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
