export type VaccineStatus = 'EM_DIA' | 'PROXIMA_DOSE' | 'ATRASADA';

export interface VaccineRecord {
  id: string;
  petId: string;

  name: string;       // Ex: Vacina V10
  description: string; // Ex: Proteção contra 10 doenças

  appliedAt: string;   // ISO
  nextDoseAt?: string; // ISO

  vetName?: string;

  status: VaccineStatus;

  proofUrl?: string; // mock: arquivo/anexo (base64 ou assets)
}