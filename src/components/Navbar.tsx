import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">MediCare Hospital</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Home
            </Link>
            <Link to="/doctors" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Doctors
            </Link>
            <Link to="/services" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Services
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <div className="relative ml-3 flex items-center">
                <Link 
                  to={`/dashboard/${currentUser?.role}`} 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                >
                  <User size={18} className="mr-1" />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/doctors" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Doctors
            </Link>
            <Link 
              to="/services" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={`/dashboard/${currentUser?.role}`} 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-700 hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;