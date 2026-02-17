import { Appointment } from '../../pets/models/appointment.model';



function addDays(base: Date, days: number, hour: number, minute: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const now = new Date();
const isoNow = now.toISOString();

export const APPOINTMENTS_MOCK: Appointment[] = [
  // Pet Thor (pet_001)
  {
    id: 'apt_001',
    petId: 'pet_001',
    type: 'BATH_GROOMING',
    title: 'Banho e Tosa',
    startAt: addDays(now, 7, 14, 0).toISOString(),
    status: 'CONFIRMED',
    createdAt: isoNow,
    updatedAt: isoNow,
  },
  {
    id: 'apt_002',
    petId: 'pet_001',
    type: 'VET',
    title: 'Consulta Veterinária',
    startAt: addDays(now, 14, 10, 30).toISOString(),
    status: 'SCHEDULED',
    createdAt: isoNow,
    updatedAt: isoNow,
  },

  // Pet Bolinha (pet_002)
  {
    id: 'apt_003',
    petId: 'pet_002',
    type: 'BATH_GROOMING',
    title: 'Banho',
    startAt: addDays(now, 5, 16, 0).toISOString(),
    status: 'SCHEDULED',
    createdAt: isoNow,
    updatedAt: isoNow,
  },
];
