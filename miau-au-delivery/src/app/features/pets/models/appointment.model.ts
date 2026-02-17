export type AppointmentType = 'BATH_GROOMING' | 'VET';
export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'DONE' | 'CANCELED';

export interface Appointment {
  id: string;
  petId: string;

  type: AppointmentType;
  title: string;

  startAt: string; // ISO
  status: AppointmentStatus;

  createdAt: string;
  updatedAt: string;
}
