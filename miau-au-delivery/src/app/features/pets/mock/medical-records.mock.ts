import { MedicalRecord } from '../models/medical-record.model';

export const MEDICAL_RECORDS_MOCK: MedicalRecord[] = [
  {
    id: 'mr_001',
    petId: 'pet_001',
    type: 'CONSULTA',
    title: 'Consulta de Rotina',
    dateTime: '2026-01-15T14:30:00.000Z',
    professionalName: 'Dr. Carlos Silva',
    professionalRole: 'Veterinário Geral',
    status: 'CONCLUIDA',
    notes:
      'Checkup geral realizado. Pet apresenta excelente estado de saúde. Peso ideal para a raça e idade. Vacinação em dia. Recomendado manter dieta atual e exercícios regulares.',
    meta: ['Peso: 28kg', 'Temperatura: 38.2°C', 'Próxima consulta: 15/07/2026'],
  },
  {
    id: 'mr_002',
    petId: 'pet_001',
    type: 'EXAME',
    title: 'Exames Laboratoriais',
    dateTime: '2026-01-08T09:00:00.000Z',
    professionalName: 'Dra. Ana Santos',
    professionalRole: 'Patologia Clínica',
    status: 'RESULTADOS_OK',
    notes:
      'Hemograma completo, bioquímica sanguínea e urinálise realizados. Todos os parâmetros dentro da normalidade.',
    meta: ['Hemácias: Normal', 'Leucócitos: Normal', 'Plaquetas: Normal'],
  },
  {
    id: 'mr_003',
    petId: 'pet_001',
    type: 'VACINA',
    title: 'Vacinação Anual',
    dateTime: '2026-02-20T16:00:00.000Z',
    professionalName: 'Dr. Pedro Oliveira',
    professionalRole: 'Imunização',
    status: 'APLICADO',
    notes: 'Vacinas aplicadas conforme protocolo. Próxima vacinação anual recomendada para 02/2027.',
    items: ['V10 (Múltipla)', 'Antirrábica', 'Giárdia'],
    meta: ['Próxima vacinação: 20/02/2027'],
  },
  {
    id: 'mr_004',
    petId: 'pet_001',
    type: 'IMAGEM',
    title: 'Raio-X Abdomen',
    dateTime: '2026-03-15T11:30:00.000Z',
    professionalName: 'Dr. Roberto Lima',
    professionalRole: 'Diagnóstico por Imagem',
    status: 'NORMAL',
    notes:
      'Exame solicitado para investigação de desconforto abdominal. Estruturas anatômicas preservadas, sem sinais de corpo estranho ou alterações significativas. Recomendado acompanhamento clínico.',
  },
  {
    id: 'mr_005',
    petId: 'pet_001',
    type: 'CIRURGIA',
    title: 'Castração',
    dateTime: '2026-03-18T08:00:00.000Z',
    professionalName: 'Dra. Marina Costa',
    professionalRole: 'Cirurgia Geral',
    status: 'RECUPERADO',
    notes:
      'Procedimento cirúrgico realizado com sucesso. Procedimento sem intercorrências. Recuperação pós-operatória dentro do esperado. Pontos removidos após 10 dias.',
    meta: ['Duração: 45min', 'Anestesia: Geral', 'Pós-operatório: 10 dias'],
  },

  // Exemplo para outro pet (se quiser testar filtros/lista com mais de um pet)
  {
    id: 'mr_006',
    petId: 'pet_002',
    type: 'CONSULTA',
    title: 'Consulta Dermatológica',
    dateTime: '2026-02-05T10:00:00.000Z',
    professionalName: 'Dr. João Silva',
    professionalRole: 'Dermatologia',
    status: 'CONCLUIDA',
    notes: 'Avaliação de coceira e alergia alimentar. Orientado ajuste na dieta e acompanhamento.',
  },
];