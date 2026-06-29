import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              onComplete={handleAnalysisComplete} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard data={analysisData} onBack={() => navigate('/')} />
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
