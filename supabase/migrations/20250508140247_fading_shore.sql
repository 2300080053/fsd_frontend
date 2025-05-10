/*
  # Hospital Management System Schema

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - role (text)
      - name (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - doctors
      - id (uuid, references profiles)
      - specialty (text)
      - bio (text)
      - image_url (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - patients
      - id (uuid, references profiles)
      - date_of_birth (date)
      - phone (text)
      - medical_history (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - available_times
      - id (uuid)
      - doctor_id (uuid, references doctors)
      - day_of_week (text)
      - start_time (time)
      - end_time (time)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - appointments
      - id (uuid)
      - patient_id (uuid, references patients)
      - doctor_id (uuid, references doctors)
      - date (date)
      - time (time)
      - status (text)
      - reason (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  role text NOT NULL CHECK (role IN ('admin', 'doctor', 'patient')),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY REFERENCES profiles,
  specialty text NOT NULL,
  bio text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY REFERENCES profiles,
  date_of_birth date NOT NULL,
  phone text NOT NULL,
  medical_history text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create available_times table
CREATE TABLE IF NOT EXISTS available_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors NOT NULL,
  day_of_week text NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients NOT NULL,
  doctor_id uuid REFERENCES doctors NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  reason text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Doctors policies
CREATE POLICY "Doctors are viewable by everyone"
  ON doctors FOR SELECT
  USING (true);

CREATE POLICY "Doctors can update own profile"
  ON doctors FOR UPDATE
  USING (auth.uid() = id);

-- Patients policies
CREATE POLICY "Patients are viewable by admins and assigned doctors"
  ON patients FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.doctor_id = auth.uid()
      AND appointments.patient_id = patients.id
    )
  );

CREATE POLICY "Patients can view and update own profile"
  ON patients FOR ALL
  USING (auth.uid() = id);

-- Available times policies
CREATE POLICY "Available times are viewable by everyone"
  ON available_times FOR SELECT
  USING (true);

CREATE POLICY "Doctors can manage own available times"
  ON available_times FOR ALL
  USING (auth.uid() = doctor_id);

-- Appointments policies
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = patient_id OR
    auth.uid() = doctor_id OR
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Doctors can update own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = doctor_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER available_times_updated_at
  BEFORE UPDATE ON available_times
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();