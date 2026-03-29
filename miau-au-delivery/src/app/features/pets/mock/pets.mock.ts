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

    // ✅ agora é lista
    notes: ['Dócil e brincalhão.'],

    // ✅ agora são listas
    health: {
      allergies: ['Alergia a ração com frango'],
      medications: ['Medicação diária para artrite'],
      restrictions: [],
      vetName: 'Clínica Miau & Au',
    },

    additionalInfo: {
      neutered: true,
      coat: 'Longa e dourada',
      temperament: 'Dócil e brincalhão',
      size: 'Grande',
      ownerName: 'Ana Paula Santos',
    },

    // ✅ caminho consistente (ajuste se você usa outra pasta)
    photoUrl: 'assets/thor.png',

    createdAt: '2026-02-18T00:00:00.000Z',
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

    // ✅ agora é lista
    notes: ['Muito brincalhão.'],

    // ✅ agora são listas
    health: {
      allergies: ['Frango'],
      medications: ['Antiparasitário'],
      restrictions: ['Evitar correr muito'],
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

    createdAt: '2026-02-18T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },

  {
  id: 'pet_003',
  name: 'Mel',
  species: 'GATO',
  breed: 'Siamês',
  ageYears: 2,
  weightKg: 4.2,
  sex: 'F',
  lastVaccineDate: new Date().toISOString(),
  notes: ['Carinhosa e curiosa.'],
  health: {
    allergies: [],
    medications: [],
    restrictions: [],
    vetName: 'Clínica Miau & Au',
  },
  additionalInfo: {
    neutered: true,
    coat: 'Creme com pontos escuros',
    temperament: 'Carinhosa e curiosa',
    size: 'Pequeno',
    ownerName: 'Carmem',
  },
  photoUrl: 'assets/mel.png', // <-- CONFERE o nome do arquivo na pasta assets
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
},
];