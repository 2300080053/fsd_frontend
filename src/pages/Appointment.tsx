import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doctors, availableTimes, appointments } from '../data/mockData';
import { Calendar, Clock, User, FileText } from 'lucide-react';

const Appointment: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedDoctorId = searchParams.get('doctorId');
  
  const [formData, setFormData] = useState({
    doctorId: preselectedDoctorId || '',
    date: '',
    time: '',
    reason: '',
  });
  
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=appointment');
    }
  }, [isAuthenticated, navigate]);
  
  // Generate available time slots based on doctor's schedule and selected date
  useEffect(() => {
    if (formData.doctorId && formData.date) {
      const selectedDoctor = doctors.find(doc => doc.id === formData.doctorId);
      if (!selectedDoctor) return;
      
      const dayOfWeek = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' });
      const doctorSchedule = availableTimes.find(
        time => time.doctorId === formData.doctorId && time.day === dayOfWeek
      );
      
      if (doctorSchedule) {
        // Generate time slots in 30-minute increments
        const slots: string[] = [];
        const [startHour, startMinute] = doctorSchedule.startTime.split(':').map(Number);
        const [endHour, endMinute] = doctorSchedule.endTime.split(':').map(Number);
        
        let currentHour = startHour;
        let currentMinute = startMinute;
        
        while (
          currentHour < endHour || 
          (currentHour === endHour && currentMinute < endMinute)
        ) {
          const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
          
          // Check if this slot is already booked
          const isBooked = appointments.some(
            app => app.doctorId === formData.doctorId && 
                  app.date === formData.date && 
                  app.time === timeString
          );
          
          if (!isBooked) {
            slots.push(timeString);
          }
          
          // Increment by 30 minutes
          currentMinute += 30;
          if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute = 0;
          }
        }
        
        setAvailableTimeSlots(slots);
      } else {
        setAvailableTimeSlots([]);
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.doctorId, formData.date]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset time when doctor or date changes
    if (name === 'doctorId' || name === 'date') {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.time || !formData.reason) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!currentUser) {
      setError('You must be logged in to book an appointment');
      return;
    }
    
    // In a real app, this would be an API call
    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: currentUser.id,
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
      status: 'pending' as const,
      reason: formData.reason,
    };
    
    appointments.push(newAppointment);
    setSuccess(true);
    
    // Reset form
    setFormData({
      doctorId: '',
      date: '',
      time: '',
      reason: '',
    });
  };
  
  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get maximum date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }
  
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Appointment Booked!</h2>
            <p className="mt-2 text-center text-gray-600">
              Your appointment request has been submitted successfully. You will receive a confirmation soon.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/dashboard/patient')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600">
            Schedule your appointment with one of our healthcare professionals.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
                    Select Doctor
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <select
                      id="doctorId"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      max={maxDateString}
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {formData.doctorId && formData.date && availableTimeSlots.length === 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      No available slots for this date. Please select another date.
                    </p>
                  )}
                </div>
                
                {availableTimeSlots.length > 0 && (
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      Select Time
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={18} className="text-gray-400" />
                      </div>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select a time</option>
                        {availableTimeSlots.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                    Reason for Visit
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText size={18} className="text-gray-400" />
                    </div>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Please describe your symptoms or reason for the appointment"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 flex items-center"
                    disabled={availableTimeSlots.length === 0 && formData.doctorId !== ''}
                  >
                    <Calendar size={18} className="mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;