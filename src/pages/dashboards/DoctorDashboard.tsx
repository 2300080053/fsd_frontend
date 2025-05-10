import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { appointments, patients, availableTimes } from '../../data/mockData';
import { Calendar, Clock, User, CheckCircle, XCircle, FileText } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  
  if (!currentUser || currentUser.role !== 'doctor') {
    return <div>Unauthorized access</div>;
  }
  
  // Get doctor's appointments
  const doctorAppointments = appointments.filter(appointment => appointment.doctorId === currentUser.id);
  
  // Get doctor's schedule
  const doctorSchedule = availableTimes.filter(time => time.doctorId === currentUser.id);
  
  // Get today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = doctorAppointments.filter(appointment => appointment.date === today);
  
  // Get upcoming appointments (excluding today)
  const upcomingAppointments = doctorAppointments.filter(appointment => 
    appointment.date > today && appointment.status !== 'cancelled'
  );
  
  // Get completed appointments
  const completedAppointments = doctorAppointments.filter(appointment => 
    appointment.status === 'completed'
  );
  
  // Handle appointment status change
  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled' | 'completed') => {
    const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);
    if (appointmentIndex !== -1) {
      appointments[appointmentIndex].status = newStatus;
      // Force re-render
      setSelectedAppointment(null);
    }
  };
  
  // Get appointment details
  const getAppointmentDetails = (appointmentId: string) => {
    const appointment = doctorAppointments.find(app => app.id === appointmentId);
    if (!appointment) return null;
    
    const patient = patients.find(pat => pat.id === appointment.patientId);
    
    return { appointment, patient };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
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
                <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
                <p className="text-3xl font-bold text-gray-900">{todayAppointments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <User size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Total Patients</h2>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(doctorAppointments.map(app => app.patientId)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock size={24} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Working Hours</h2>
                <p className="text-xl font-bold text-gray-900">
                  {doctorSchedule.length} days/week
                </p>
              </div>
            </div>
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
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Schedule
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'patients'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Patients
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'appointments' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Manage Appointments</h2>
              </div>
              
              {selectedAppointment ? (
                <div className="p-6">
                  {(() => {
                    const details = getAppointmentDetails(selectedAppointment);
                    if (!details) return <div>Appointment not found</div>;
                    
                    const { appointment, patient } = details;
                    
                    return (
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
                          <button
                            onClick={() => setSelectedAppointment(null)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Back to List
                          </button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Patient Information</h4>
                              <p className="text-lg font-medium text-gray-900">{patient?.name}</p>
                              <p className="text-gray-600">{patient?.email}</p>
                              <p className="text-gray-600">Phone: {patient?.phone}</p>
                              <p className="text-gray-600">DOB: {patient?.dateOfBirth}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Appointment Information</h4>
                              <p className="text-gray-600">Date: {appointment.date}</p>
                              <p className="text-gray-600">Time: {appointment.time}</p>
                              <p className="text-gray-600">
                                Status: 
                                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Reason for Visit</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{appointment.reason}</p>
                          </div>
                        </div>
                        
                        {appointment.status === 'pending' && (
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center"
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center"
                            >
                              <XCircle size={16} className="mr-1" />
                              Cancel
                            </button>
                          </div>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'completed')}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Mark as Completed
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center"
                            >
                              <XCircle size={16} className="mr-1" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Appointments</h3>
                    {todayAppointments.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                        {todayAppointments.map(appointment => {
                          const patient = patients.find(pat => pat.id === appointment.patientId);
                          
                          return (
                            <div key={appointment.id} className="p-4 hover:bg-gray-100">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{patient?.name}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Clock size={16} className="mr-1" />
                                    {appointment.time}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-3 ${
                                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                  <button
                                    onClick={() => setSelectedAppointment(appointment.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500">No appointments scheduled for today.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
                    {upcomingAppointments.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                        {upcomingAppointments.map(appointment => {
                          const patient = patients.find(pat => pat.id === appointment.patientId);
                          
                          return (
                            <div key={appointment.id} className="p-4 hover:bg-gray-100">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{patient?.name}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar size={16} className="mr-1" />
                                    {appointment.date}
                                    <Clock size={16} className="ml-2 mr-1" />
                                    {appointment.time}
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
                                  <button
                                    onClick={() => setSelectedAppointment(appointment.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500">No upcoming appointments scheduled.</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Past Appointments</h3>
                    {completedAppointments.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                        {completedAppointments.map(appointment => {
                          const patient = patients.find(pat => pat.id === appointment.patientId);
                          
                          return (
                            <div key={appointment.id} className="p-4 hover:bg-gray-100">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{patient?.name}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar size={16} className="mr-1" />
                                    {appointment.date}
                                    <Clock size={16} className="ml-2 mr-1" />
                                    {appointment.time}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-3">
                                    Completed
                                  </span>
                                  <button
                                    onClick={() => setSelectedAppointment(appointment.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500">No past appointments.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">My Schedule</h2>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Working Hours</h3>
                  {doctorSchedule.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {doctorSchedule.map(schedule => (
                        <div key={schedule.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-medium text-gray-900 mb-2">{schedule.day}</div>
                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-2" />
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500">No schedule set. Please contact the administrator.</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Request Schedule Change</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-4">
                      To request a change in your working hours, please fill out the form below.
                      An administrator will review your request.
                    </p>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="day" className="block text-sm font-medium text-gray-700">
                          Day of Week
                        </label>
                        <select
                          id="day"
                          name="day"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select a day</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                            Start Time
                          </label>
                          <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                            End Time
                          </label>
                          <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                          Reason for Change
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Please explain why you need to change your schedule"
                        />
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                          Submit Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'patients' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">My Patients</h2>
              </div>
              
              <div className="p-6">
                {(() => {
                  // Get unique patient IDs from appointments
                  const patientIds = [...new Set(doctorAppointments.map(app => app.patientId))];
                  const doctorPatients = patients.filter(patient => patientIds.includes(patient.id));
                  
                  return doctorPatients.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {doctorPatients.map(patient => (
                        <div key={patient.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                          <div className="p-5">
                            <div className="flex items-center mb-4">
                              <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <User size={24} className="text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                                <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Email:</span> {patient.email}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Phone:</span> {patient.phone}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Date of Birth:</span> {patient.dateOfBirth}
                              </p>
                            </div>
                            
                            {patient.medicalHistory && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Medical History</h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                  {patient.medicalHistory}
                                </p>
                              </div>
                            )}
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Appointment History</h4>
                              <div className="space-y-2">
                                {doctorAppointments
                                  .filter(app => app.patientId === patient.id)
                                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                  .slice(0, 3)
                                  .map(app => (
                                    <div key={app.id} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                                      <div className="flex items-center">
                                        <Calendar size={14} className="text-gray-500 mr-1" />
                                        <span>{app.date}</span>
                                        <Clock size={14} className="text-gray-500 ml-2 mr-1" />
                                        <span>{app.time}</span>
                                      </div>
                                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        app.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        app.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                      }`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Full History
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500">You don't have any patients yet.</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;