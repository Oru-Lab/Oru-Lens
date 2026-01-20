
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Preloader } from './components/Preloader';
import Landing from './pages/Landing';
import About from './pages/About';
import Team from './pages/Team';
import Scan from './pages/Scan';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Preloader />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/view/:contractId" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
