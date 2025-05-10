import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doctors, availableTimes } from '../data/mockData';
import { Calendar, Clock, Mail, Phone } from 'lucide-react';

const DoctorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const doctor = doctors.find(doc => doc.id === id);
  
  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/doctors"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }
  
  // Get doctor's available times
  const doctorTimes = availableTimes.filter(time => time.doctorId === doctor.id);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            &larr; Back
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-blue-600 text-lg mb-4">{doctor.specialty}</p>
              
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail size={18} className="text-blue-600 mr-2" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-blue-600 mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Available Schedule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctorTimes.map((time) => (
                    <div key={time.id} className="flex items-center bg-gray-50 p-3 rounded-md">
                      <Calendar size={18} className="text-blue-600 mr-2" />
                      <span className="font-medium mr-2">{time.day}:</span>
                      <Clock size={18} className="text-blue-600 mr-2" />
                      <span>{time.startTime} - {time.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to={`/appointment?doctorId=${doctor.id}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 inline-flex items-center"
                >
                  <Calendar size={18} className="mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;