import { Admin, Appointment, Doctor, Patient, AvailableTime } from '../types';

// Mock Admin Data
export const admins: Admin[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'admin',
  },
];

// Mock Doctor Data
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@hospital.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Cardiology',
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    imageUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    availableTimes: [],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael@hospital.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Neurology',
    bio: 'Dr. Chen specializes in neurological disorders and has pioneered several treatment methods.',
    imageUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    availableTimes: [],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily@hospital.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Pediatrics',
    bio: 'Dr. Rodriguez has dedicated her career to providing compassionate care for children of all ages.',
    imageUrl: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg',
    availableTimes: [],
  },
];

// Mock Patient Data
export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'patient123',
    role: 'patient',
    dateOfBirth: '1985-05-15',
    phone: '555-123-4567',
    medicalHistory: 'Hypertension, Allergies to penicillin',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    password: 'patient123',
    role: 'patient',
    dateOfBirth: '1990-08-22',
    phone: '555-987-6543',
    medicalHistory: 'Asthma',
  },
];

// Mock Available Times
export const availableTimes: AvailableTime[] = [
  {
    id: '1',
    doctorId: '1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
  },
  {
    id: '2',
    doctorId: '1',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '17:00',
  },
  {
    id: '3',
    doctorId: '1',
    day: 'Friday',
    startTime: '09:00',
    endTime: '13:00',
  },
  {
    id: '4',
    doctorId: '2',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '18:00',
  },
  {
    id: '5',
    doctorId: '2',
    day: 'Thursday',
    startTime: '10:00',
    endTime: '18:00',
  },
  {
    id: '6',
    doctorId: '3',
    day: 'Monday',
    startTime: '08:00',
    endTime: '16:00',
  },
  {
    id: '7',
    doctorId: '3',
    day: 'Tuesday',
    startTime: '08:00',
    endTime: '16:00',
  },
  {
    id: '8',
    doctorId: '3',
    day: 'Thursday',
    startTime: '08:00',
    endTime: '16:00',
  },
];

// Mock Appointments
export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2025-06-15',
    time: '10:00',
    status: 'confirmed',
    reason: 'Annual checkup',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '3',
    date: '2025-06-16',
    time: '14:30',
    status: 'pending',
    reason: 'Fever and cough',
  },
];

// Update doctors with available times
doctors.forEach(doctor => {
  doctor.availableTimes = availableTimes.filter(time => time.doctorId === doctor.id);
});