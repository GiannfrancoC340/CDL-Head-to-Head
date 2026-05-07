import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="container navbar-inner">
            <span className="navbar-logo">CDL <span>H2H</span></span>
          </div>
        </nav>
        <main className="page">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/match/:matchId" element={<MatchPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;