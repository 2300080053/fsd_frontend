export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  bio: string;
  imageUrl: string;
  availableTimes: AvailableTime[];
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory?: string;
  dateOfBirth: string;
  phone: string;
}

export interface AvailableTime {
  id: string;
  doctorId: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
}