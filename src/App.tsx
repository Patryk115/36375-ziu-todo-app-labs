import { useLocation, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  const location = useLocation();

  return (
    <div className='app-container'>
      <header>
        <h1>🎬 Movie Browser</h1>
        <nav style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
          <Link to="/" className="nav-link">Główna</Link>
          <Link to="/favorites" className="nav-link">Ulubione</Link>
        </nav>
      </header>

      <main>
        {/* Etap B: Page transitions z AnimatePresence i trybem wait */}
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<HomePage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Etap D: Toast Notifications */}
      <ToastContainer />
    </div>
  );
}