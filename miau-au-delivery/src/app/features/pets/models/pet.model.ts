export type Species = 'CAO' | 'GATO' | 'OUTRO';
export type Sex = 'M' | 'F';

export interface PetHealth {
  allergies?: string;
  medications?: string;
  restrictions?: string;
  vetName?: string;
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

  lastVaccineDate?: string | null; // ISO string (facilita API depois)
  notes?: string;

  health?: PetHealth;

  createdAt: string; // ISO
  updatedAt: string; // ISO
}
export interface PetAdditionalInfo {
  neutered?: boolean;      // castrado
  coat?: string;           // pelagem
  temperament?: string;    // temperamento
  size?: string;           // porte
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

  lastVaccineDate?: string | null;
  notes?: string;

  health?: PetHealth;

  additionalInfo?: PetAdditionalInfo;  // 👈 adiciona isso

  createdAt: string;
  updatedAt: string;
}
