import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">MediCare Hospital</h3>
            <p className="text-gray-300 mb-4">
              Providing quality healthcare services with compassion and excellence since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/doctors" className="text-gray-300 hover:text-white">Our Doctors</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-white">Patient Portal</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Emergency Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Cardiology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Neurology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Pediatrics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Orthopedics</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Healthcare Blvd, Medical City, MC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>info@medicarehospital.com</span>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>
                  Monday - Friday: 8:00 AM - 8:00 PM<br />
                  Saturday: 9:00 AM - 5:00 PM<br />
                  Sunday: Emergency Only
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} MediCare Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;