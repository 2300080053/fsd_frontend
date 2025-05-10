import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, UserPlus, Clock, Phone, Award, Heart, Activity, Shield } from 'lucide-react';
import { doctors } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg')",
            mixBlendMode: "overlay"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Health Is Our Top Priority
            </h1>
            <p className="text-xl mb-8">
              MediCare Hospital provides exceptional healthcare services with a focus on patient comfort and advanced medical treatments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/appointment" 
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 flex items-center"
              >
                <Calendar size={20} className="mr-2" />
                Book Appointment
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900 flex items-center"
              >
                <UserPlus size={20} className="mr-2" />
                Register as Patient
              </Link>
            </div>
          </div>
        </div>
        
        {/* Quick Info Cards */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800 flex">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Clock size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                <p className="text-sm">Mon-Fri: 8am-8pm</p>
                <p className="text-sm">Sat: 9am-5pm</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800 flex">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Phone size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Emergency Contact</h3>
                <p className="text-sm">+1 (555) 911-1234</p>
                <p className="text-sm">Available 24/7</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800 flex">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Award size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Certified Doctors</h3>
                <p className="text-sm">Board-certified specialists</p>
                <p className="text-sm">Expert medical care</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-24 mt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">About MediCare Hospital</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Providing exceptional healthcare services with a focus on patient comfort and advanced medical treatments since 2005.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg" 
                alt="Hospital Building" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                At MediCare Hospital, our mission is to provide compassionate, high-quality healthcare services that improve the health and wellbeing of the communities we serve. We are committed to excellence in medical care, patient experience, and continuous innovation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Heart size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Compassionate Care</h4>
                    <p className="text-gray-600">We treat each patient with dignity, respect, and empathy.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Activity size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Medical Excellence</h4>
                    <p className="text-gray-600">Our team of specialists provides the highest standard of medical care.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Patient Safety</h4>
                    <p className="text-gray-600">Safety is our top priority in all aspects of patient care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of medical services to meet all your healthcare needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Care",
                description: "24/7 emergency services for immediate medical attention.",
                icon: <Activity size={40} className="text-blue-600" />
              },
              {
                title: "Cardiology",
                description: "Comprehensive heart care from prevention to advanced treatments.",
                icon: <Heart size={40} className="text-blue-600" />
              },
              {
                title: "Neurology",
                description: "Specialized care for conditions affecting the brain and nervous system.",
                icon: <Activity size={40} className="text-blue-600" />
              },
              {
                title: "Pediatrics",
                description: "Compassionate healthcare for infants, children, and adolescents.",
                icon: <Shield size={40} className="text-blue-600" />
              },
              {
                title: "Orthopedics",
                description: "Expert care for bones, joints, ligaments, tendons, and muscles.",
                icon: <Activity size={40} className="text-blue-600" />
              },
              {
                title: "Diagnostics",
                description: "Advanced imaging and laboratory services for accurate diagnosis.",
                icon: <Activity size={40} className="text-blue-600" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Doctors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Doctors</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet our team of experienced and dedicated healthcare professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
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
                  <Link 
                    to={`/doctors/${doctor.id}`}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/doctors"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Schedule Your Appointment?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team of healthcare professionals is ready to provide you with the best medical care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/appointment" 
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
            >
              Book Appointment
            </Link>
            <Link 
              to="/contact" 
              className="bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;