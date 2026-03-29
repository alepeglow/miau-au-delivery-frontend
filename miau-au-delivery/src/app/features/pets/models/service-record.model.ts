export type ServiceType = 'BANHO' | 'TOSA' | 'CONSULTA' | 'EXAME' | 'VACINA';
export type ServiceStatus = 'CONCLUIDO' | 'PENDENTE';

export interface ServiceRecord {
  id: string;
  petId: string;

  dateTime: string; // ISO
  type: ServiceType;
  service: string;

  clinic: string;
  professional: string;

  status: ServiceStatus;
}