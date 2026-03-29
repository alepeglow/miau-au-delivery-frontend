import { ServiceRecord } from '../models/service-record.model';

export const SERVICE_RECORDS_MOCK: ServiceRecord[] = [
  // ===== THOR (pet_001) =====
  {
    id: 'sr_001',
    petId: 'pet_001',
    dateTime: '2026-01-15T14:30:00.000Z',
    type: 'CONSULTA',
    service: 'Consulta de Rotina',
    clinic: 'Clínica Miau & Au',
    professional: 'Dr. Carlos Silva',
    status: 'CONCLUIDO',
  },
  {
    id: 'sr_002',
    petId: 'pet_001',
    dateTime: '2026-02-10T10:00:00.000Z',
    type: 'EXAME',
    service: 'Exame de Sangue',
    clinic: 'Lab PetExame',
    professional: 'Dra. Ana Costa',
    status: 'CONCLUIDO',
  },
  {
    id: 'sr_003',
    petId: 'pet_001',
    dateTime: '2026-02-25T14:00:00.000Z',
    type: 'BANHO',
    service: 'Banho e Tosa',
    clinic: 'PetCare Center',
    professional: 'Maria Santos',
    status: 'CONCLUIDO',
  },
  {
    id: 'sr_004',
    petId: 'pet_001',
    dateTime: '2026-03-18T16:00:00.000Z',
    type: 'VACINA',
    service: 'Vacinação (Gripe Canina)',
    clinic: 'Clínica Miau & Au',
    professional: 'Dr. Pedro Oliveira',
    status: 'CONCLUIDO',
  },

  // ===== BOLINHA (pet_002) =====
  {
    id: 'sr_101',
    petId: 'pet_002',
    dateTime: '2026-01-12T10:00:00.000Z',
    type: 'CONSULTA',
    service: 'Consulta Veterinária',
    clinic: 'Clínica VetLife',
    professional: 'Dra. Ana Costa',
    status: 'CONCLUIDO',
  },
  {
    id: 'sr_102',
    petId: 'pet_002',
    dateTime: '2026-02-02T09:00:00.000Z',
    type: 'BANHO',
    service: 'Banho Completo',
    clinic: 'Spa dos Pets',
    professional: 'Julia Mendes',
    status: 'CONCLUIDO',
  },

  // ===== SIAMÊS (pet_003) =====
 {
  id: 'sr_201',
  petId: 'pet_003', // ✅ Mel
  dateTime: '2026-02-20T11:00:00.000Z',
  type: 'EXAME',
  service: 'Exame de Fezes',
  clinic: 'Lab PetExame',
  professional: 'Dr. Roberto Lima',
  status: 'CONCLUIDO',
},
];