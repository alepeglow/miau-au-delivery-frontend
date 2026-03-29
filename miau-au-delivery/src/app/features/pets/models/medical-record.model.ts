export type MedicalRecordType = 'CONSULTA' | 'EXAME' | 'VACINA' | 'IMAGEM' | 'CIRURGIA';

export type MedicalRecordStatus = 'CONCLUIDA' | 'RESULTADOS_OK' | 'APLICADO' | 'NORMAL' | 'RECUPERADO';

export interface MedicalRecord {
  id: string;
  petId: string;

  type: MedicalRecordType;
  title: string;
  dateTime: string; // ISO

  professionalName?: string;
  professionalRole?: string;

  status: MedicalRecordStatus;

  notes?: string;      // Observações / Laudo / Resultados
  meta?: string[];     // chips pequenos (ex: "Peso: 28kg", "Temperatura: 38.2°C")
  items?: string[];    // lista (ex: vacinas aplicadas)
}