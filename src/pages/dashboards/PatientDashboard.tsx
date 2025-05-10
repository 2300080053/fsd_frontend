import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { appointments, doctors } from '../../data/mockData';
import { Calendar, Clock, FileText, User, Edit, AlertCircle } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  
  if (!currentUser || currentUser.role !== 'patient') {
    return <div>Unauthorized access</div>;
  }
  
  // Get patient's appointments
  const patientAppointments = appointments.filter(appointment => appointment.patientId === currentUser.id);
  
  // Get upcoming appointments
  const today = new Date().toISOString().split('T')[0];
  const upcomingAppointments = patientAppointments.filter(appointment => 
    (appointment.date >= today && appointment.status !== 'cancelled')
  );
  
  // Get past appointments
  const pastAppointments = patientAppointments.filter(appointment => 
    (appointment.date < today || appointment.status === 'completed')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Patient Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                <p className="text-3xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Past Appointments</h2>
                <p className="text-3xl font-bold text-gray-900">{pastAppointments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <User size={24} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">My Doctors</h2>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(patientAppointments.map(app => app.doctorId)).size}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/appointment"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <Calendar size={16} className="mr-2" />
              Book New Appointment
            </Link>
            <Link 
              to="/doctors"
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center"
            >
              <User size={16} className="mr-2" />
              View Doctors
            </Link>
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center">
              <FileText size={16} className="mr-2" />
              Medical Records
            </button>
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center">
              <Edit size={16} className="mr-2" />
              Update Profile
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'appointments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Appointments
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'doctors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Doctors
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Profile
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'appointments' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">My Appointments</h2>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map(appointment => {
                        const doctor = doctors.find(doc => doc.id === appointment.doctorId);
                        
                        return (
                          <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                              <div className="mb-4 md:mb-0">
                                <div className="flex items-center mb-2">
                                  <User size={18} className="text-blue-600 mr-2" />
                                  <span className="font-medium text-gray-900">{doctor?.name}</span>
                                  <span className="ml-2 text-sm text-gray-500">({doctor?.specialty})</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Calendar size={16} className="mr-1" />
                                  <span className="mr-3">{appointment.date}</span>
                                  <Clock size={16} className="mr-1" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-3 ${
                                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                                
                                <div className="flex space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    Details
                                  </button>
                                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-start">
                                <FileText size={16} className="text-gray-500 mr-2 mt-0.5" />
                                <p className="text-sm text-gray-600">{appointment.reason}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
                      <Link 
                        to="/appointment"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Book an Appointment
                      </Link>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Past Appointments</h3>
                  {pastAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {pastAppointments.map(appointment => {
                        const doctor = doctors.find(doc => doc.id === appointment.doctorId);
                        
                        return (
                          <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                              <div>
                                <div className="flex items-center mb-2">
                                  <User size={18} className="text-blue-600 mr-2" />
                                  <span className="font-medium text-gray-900">{doctor?.name}</span>
                                  <span className="ml-2 text-sm text-gray-500">({doctor?.specialty})</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Calendar size={16} className="mr-1" />
                                  <span className="mr-3">{appointment.date}</span>
                                  <Clock size={16} className="mr-1" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-3 md:mt-0">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-3 ${
                                  appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                                
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500">You don't have any past appointments.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'doctors' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">My Doctors</h2>
              </div>
              
              <div className="p-6">
                {(() => {
                  // Get unique doctor IDs from appointments
                  const doctorIds = [...new Set(patientAppointments.map(app => app.doctorId))];
                  const patientDoctors = doctors.filter(doctor => doctorIds.includes(doctor.id));
                  
                  return patientDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {patientDoctors.map(doctor => (
                        <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                          <img 
                            src={doctor.imageUrl} 
                            alt={doctor.name} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">{doctor.name}</h3>
                            <p className="text-blue-600 text-sm mb-3">{doctor.specialty}</p>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doctor.bio}</p>
                            
                            <div className="flex justify-between items-center">
                              <Link 
                                to={`/doctors/${doctor.id}`}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Profile
                              </Link>
                              <Link 
                                to={`/appointment?doctorId=${doctor.id}`}
                                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700"
                              >
                                Book Appointment
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500 mb-4">You haven't seen any doctors yet.</p>
                      <Link 
                        to="/doctors"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Find a Doctor
                      </Link>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">My Profile</h2>
              </div>
              
              <div className="p-6">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle size={24} className="text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          This is a demo profile. In a real application, you would be able to edit your information.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and medical information.</p>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Full name</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Email address</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{(currentUser as any).phone}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{(currentUser as any).dateOfBirth}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Medical history</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {(currentUser as any).medicalHistory || 'No medical history recorded.'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;