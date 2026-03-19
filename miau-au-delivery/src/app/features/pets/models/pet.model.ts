export type Species = 'CAO' | 'GATO' | 'OUTRO';
export type Sex = 'M' | 'F';

export interface PetHealth {
  allergies?: string[];      // ✅ lista
  medications?: string[];    // ✅ lista
  restrictions?: string[];   // ✅ lista
  vetName?: string;
}

export interface PetAdditionalInfo {
  neutered?: boolean;      // castrado
  coat?: string;           // pelagem
  temperament?: string;    // temperamento
  size?: string;           // porte (Pequeno | Médio | Grande)
  ownerName?: string;      // tutor responsável
}

export interface Pet {
  id: string;

  photoUrl?: string;

  name: string;
  species: Species;
  breed?: string;

  ageYears?: number | null;
  weightKg?: number | null;
  sex: Sex;

  lastVaccineDate?: string | null; // ISO string

  // ✅ observações gerais (várias)
  notes?: string[];

  health?: PetHealth;

  additionalInfo?: PetAdditionalInfo;

  createdAt: string; // ISO
  updatedAt: string; // ISO
}