import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout'; // Twoja główna strona
import RegisterPage from './components/pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;