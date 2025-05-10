import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorsList from './pages/DoctorsList';
import DoctorDetail from './pages/DoctorDetail';
import Appointment from './pages/Appointment';

// Dashboard Pages
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  element: React.ReactElement, 
  allowedRoles?: string[] 
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }
  
  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />
              <Route path="/appointment" element={<Appointment />} />
              
              {/* Dashboard Routes */}
              <Route 
                path="/dashboard/admin" 
                element={
                  <ProtectedRoute 
                    element={<AdminDashboard />} 
                    allowedRoles={['admin']} 
                  />
                } 
              />
              <Route 
                path="/dashboard/doctor" 
                element={
                  <ProtectedRoute 
                    element={<DoctorDashboard />} 
                    allowedRoles={['doctor']} 
                  />
                } 
              />
              <Route 
                path="/dashboard/patient" 
                element={
                  <ProtectedRoute 
                    element={<PatientDashboard />} 
                    allowedRoles={['patient']} 
                  />
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;