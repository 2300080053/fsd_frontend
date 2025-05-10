import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../data/mockData';
import { Search } from 'lucide-react';

const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
  // Get unique specialties for filter
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  
  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Our Doctors</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced and dedicated healthcare professionals.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 mb-3">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{doctor.bio}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Link 
                      to={`/doctors/${doctor.id}`}
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      View Profile
                    </Link>
                    <Link 
                      to={`/appointment?doctorId=${doctor.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;